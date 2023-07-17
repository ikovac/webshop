import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import authConfig from 'config/auth.config';
import Identity from './identity.entity';

export class AuthorizeException extends Error {
  constructor() {
    super('Incorrect email or password');
    this.name = this.constructor.name;
  }
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Identity)
    private readonly identityRepository: EntityRepository<Identity>,
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly configService: ConfigType<typeof authConfig>,
  ) {}

  async authorize(email: Identity['email'], password: string): Promise<string> {
    const identity = await this.identityRepository.findOne({ email });
    if (!identity) throw new AuthorizeException();
    const hasCorrectPassword = await bcrypt.compare(
      password,
      identity.password,
    );
    if (!hasCorrectPassword) throw new AuthorizeException();
    const { issuer, secret } = this.configService.jwt;
    const payload = { sub: identity.id };
    const token = await this.jwtService.signAsync(payload, {
      secret,
      issuer,
      expiresIn: '1 day',
    });
    return token;
  }
}
