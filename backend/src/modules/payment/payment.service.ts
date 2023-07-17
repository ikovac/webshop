import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class PaymentService {
  constructor(@InjectPinoLogger() private readonly logger: PinoLogger) {}

  @OnEvent('order.created', { async: true })
  async orderCreatedHandler(payload) {
    this.logger.info(`Processing payment for order: ${payload.orderId}`);
  }
}
