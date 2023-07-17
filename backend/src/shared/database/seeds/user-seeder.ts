import type { EntityManager } from '@mikro-orm/core';
import { Seeder, faker } from '@mikro-orm/seeder';
import Identity from 'modules/identity/identity.entity';

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const entities = [...Array(10)].map((_, index) => {
      const email = index > 0 ? `user${index}@example.org` : 'user@example.org';
      return new Identity(
        faker.name.firstName(),
        faker.name.lastName(),
        email,
        'password',
      );
    });

    em.persist(entities);
  }
}
