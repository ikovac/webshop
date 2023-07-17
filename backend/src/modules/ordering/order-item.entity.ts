import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import BaseEntity from 'shared/database/base.entity';
import Order from './order.entity';

@Entity()
class OrderItem extends BaseEntity {
  @Property()
  productId: number;

  @Property()
  quantity: number;

  @Property()
  unitPrice: number;

  @ManyToOne({
    entity: () => Order,
    serializer: (it) => it.id,
    fieldName: 'order_id',
    serializedName: 'orderId',
  })
  order!: Order;

  constructor(productId: number, quantity: number, unitPrice: number) {
    super();
    this.productId = productId;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }

  @Property({ persist: false })
  get total() {
    return this.quantity * this.unitPrice;
  }
}

export default OrderItem;
