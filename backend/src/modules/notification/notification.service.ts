import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class NotificationService {
  constructor(@InjectPinoLogger() private readonly logger: PinoLogger) {}

  @OnEvent('order.created', { async: true })
  async orderCreatedHandler(payload) {
    this.logger.info(
      `Sending order created event for order: ${payload.orderId}`,
    );
  }
}
