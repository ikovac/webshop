import { Entity, Property } from '@mikro-orm/core';
import BaseEntity from 'shared/database/base.entity';

@Entity()
class CatalogItem extends BaseEntity {
  @Property()
  name: string;

  @Property()
  imageUrl: string;

  @Property()
  price: number;

  @Property({ nullable: true })
  description: string;

  constructor(
    name: string,
    price: number,
    imageUrl: string,
    description: string,
  ) {
    super();
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }
}

export default CatalogItem;
