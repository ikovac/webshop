import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthorizeException, AuthService } from './auth.service';
import { AuthGuard } from 'shared/auth.guard';
import { Request } from 'express';
import { IdentityNotFoundException, IdentityService } from './identity.service';

class AuthorizeDto {
  readonly email: string;
  readonly password: string;
}

@Controller('identity')
export class IdentityController {
  constructor(
    private readonly authService: AuthService,
    private readonly identityService: IdentityService,
  ) {}

  @Post('authorize')
  authorize(@Body() { email, password }: AuthorizeDto) {
    return this.authService
      .authorize(email, password)
      .then((token) => ({ data: { token } }))
      .catch((err) => {
        if (err instanceof AuthorizeException) {
          throw new BadRequestException(err.message);
        }
        throw err;
      });
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@Req() req: Request) {
    return this.identityService
      .get(req.userId)
      .then((identity) => ({ data: identity }))
      .catch((err) => {
        if (err instanceof IdentityNotFoundException) {
          throw new BadRequestException(err.message);
        }
        throw err;
      });
  }
}
