import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import CatalogItem from 'modules/catalog/catalog-item.entity';
import { Factory, Faker } from '@mikro-orm/seeder';

export class CatalogItemFactory extends Factory<CatalogItem> {
  model = CatalogItem;

  definition(faker: Faker): Partial<CatalogItem> {
    return {
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price(2, 20)),
      description: faker.commerce.productDescription(),
      imageUrl: faker.image.food(640, 480, true),
    };
  }
}

export class CatalogItemSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    new CatalogItemFactory(em).make(20);
  }
}
