import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'messages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('sender_id').references('id').inTable('users').notNullable().onDelete('CASCADE')
      table
        .integer('receiver_id')
        .references('id')
        .inTable('users')
        .notNullable()
        .onDelete('CASCADE')
      table.string('message').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
