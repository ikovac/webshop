import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import BaseEntity from 'shared/database/base.entity';
import OrderItem from './order-item.entity';

type OrderItemPayload = Pick<OrderItem, 'productId' | 'quantity' | 'unitPrice'>;

export class OrderEmptyException extends Error {
  constructor() {
    super('Order can not be empty.');
    this.name = this.constructor.name;
  }
}

@Entity()
class Order extends BaseEntity {
  @Property()
  userId: number;

  @OneToMany({
    entity: () => OrderItem,
    mappedBy: (it) => it.order,
    eager: true,
  })
  items = new Collection<OrderItem>(this);

  constructor(userId: number, items: OrderItemPayload[]) {
    super();
    this.userId = userId;
    if (!items.length) throw new OrderEmptyException();
    items.forEach((it) =>
      this.items.add(new OrderItem(it.productId, it.quantity, it.unitPrice)),
    );
  }

  @Property({ persist: false })
  get total() {
    return this.items.getItems().reduce((acc, it) => acc + it.total, 0);
  }
}

export default Order;
