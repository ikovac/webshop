import { Migration } from '@mikro-orm/migrations';

const ORDER_TABLE_NAME = 'order';
const ORDER_ITEM_TABLE_NAME = 'order_item';

export class CreateOrderTable extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createOrderTable = knex.schema.createTable(
      ORDER_TABLE_NAME,
      (table) => {
        table.increments('id');
        table.integer('user_id').notNullable();
        table.foreign('user_id').references('user.id').onDelete('SET NULL');
        table
          .timestamp('created_at', { useTz: true })
          .notNullable()
          .defaultTo(knex.fn.now());
        table
          .timestamp('updated_at', { useTz: true })
          .notNullable()
          .defaultTo(knex.fn.now());
      },
    );
    const createOrderItemTable = knex.schema.createTable(
      ORDER_ITEM_TABLE_NAME,
      (table) => {
        table.increments('id');
        table.integer('quantity').notNullable();
        table.integer('unit_price').notNullable();
        table.integer('order_id').notNullable();
        table.foreign('order_id').references('order.id').onDelete('CASCADE');
        table.integer('product_id').notNullable();
        table
          .foreign('product_id')
          .references('catalog_item.id')
          .onDelete('SET NULL');
        table
          .timestamp('created_at', { useTz: true })
          .notNullable()
          .defaultTo(knex.fn.now());
        table
          .timestamp('updated_at', { useTz: true })
          .notNullable()
          .defaultTo(knex.fn.now());
      },
    );
    this.addSql(createOrderTable.toQuery());
    this.addSql(createOrderItemTable.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();

    this.addSql(knex.schema.dropTable(ORDER_TABLE_NAME).toQuery());
    this.addSql(knex.schema.dropTable(ORDER_ITEM_TABLE_NAME).toQuery());
  }
}
