import { LoadStrategy } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import authConfig from 'config/auth.config';
import { IdentityModule } from 'modules/identity/identity.module';
import { LoggerModule } from 'nestjs-pino';
import databaseConfig from './config/database.config';
import { CatalogModule } from './modules/catalog/catalog.module';
import { JwtModule } from '@nestjs/jwt';
import { OrderingModule } from 'modules/ordering/ordering.module';
import { NotificationModule } from 'modules/notification/notification.module';
import { PaymentModule } from './modules/payment/payment.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        redact: ['req.headers.authorization'],
        quietReqLogger: true,
      },
    }),
    ConfigModule.forRoot({
      load: [databaseConfig, authConfig],
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        loadStrategy: LoadStrategy.JOINED,
        ...config.get('database'),
        autoLoadEntities: true,
      }),
    }),
    JwtModule.register({ global: true }),
    EventEmitterModule.forRoot(),
    IdentityModule,
    CatalogModule,
    OrderingModule,
    NotificationModule,
    PaymentModule,
  ],
})
export class AppModule {}
