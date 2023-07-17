import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import Identity from './identity.entity';

export class IdentityNotFoundException extends Error {
  constructor() {
    super('Identity not found');
    this.name = this.constructor.name;
  }
}

@Injectable()
export class IdentityService {
  constructor(
    @InjectRepository(Identity)
    private readonly identityRepository: EntityRepository<Identity>,
  ) {}

  async get(id: number): Promise<Identity> {
    const identity = await this.identityRepository.findOne(id);
    if (!identity) throw new IdentityNotFoundException();
    return identity;
  }
}
