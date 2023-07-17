import { Injectable } from '@nestjs/common';
import Order from './order.entity';
import { EntityManager } from '@mikro-orm/core';
import { CreateOrderDTO } from './ordering.dto';
import { CatalogItemIntegrationService } from './catalog-item.integration.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';

export class ProductNotFoundException extends Error {
  constructor(id: number) {
    super(`Product with ID: ${id} not found.`);
    this.name = this.constructor.name;
  }
}

@Injectable()
export class OrderingService {
  constructor(
    private readonly em: EntityManager,
    private readonly catalogItemIntegrationService: CatalogItemIntegrationService,
    private readonly eventEmmiter: EventEmitter2,
    @InjectRepository(Order)
    private readonly orderRepository: EntityRepository<Order>,
  ) {}

  getOrder(orderId: number): Promise<Order> {
    return this.orderRepository.findOne(orderId);
  }

  async createOrder(
    userId: number,
    items: CreateOrderDTO['items'],
  ): Promise<Order['id']> {
    const pOrderItems = items.map(async (it) => {
      const { id, quantity } = it;
      try {
        const product = await this.catalogItemIntegrationService.get(id);
        const { price: unitPrice } = product;
        return { productId: id, quantity, unitPrice };
      } catch (error) {
        if (error.name === 'CatalogItemNotFoundException') {
          throw new ProductNotFoundException(id);
        }
        throw error;
      }
    });
    const orderItems = await Promise.all(pOrderItems);
    const order = new Order(userId, orderItems);
    await this.em.persistAndFlush(order);
    this.eventEmmiter.emit('order.created', { orderId: order.id });
    return order.id;
  }
}
