import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { IdentityController } from './identity.controller';
import { AuthService } from './auth.service';
import Identity from './identity.entity';
import { IdentityService } from './identity.service';

@Module({
  controllers: [IdentityController],
  imports: [MikroOrmModule.forFeature([Identity])],
  providers: [AuthService, IdentityService],
})
export class IdentityModule {}
