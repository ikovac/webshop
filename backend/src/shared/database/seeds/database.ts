import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { CatalogItemSeeder } from './catalog-item-seeder';
import { UserSeeder } from './user-seeder';

export class DatabaseSeeder extends Seeder {
  run(em: EntityManager): Promise<void> {
    return this.call(em, [UserSeeder, CatalogItemSeeder]);
  }
}
