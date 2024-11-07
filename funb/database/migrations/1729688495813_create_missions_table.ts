import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'missions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('title')
      table.string('tasks')
      table.timestamp('date')
      table.string('time_start_hour')
      table.string('time_start_min')
      table.string('time_start_meridiem')
      table.string('time_end_hour')
      table.string('time_end_min')
      table.string('time_end_meridiem')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
