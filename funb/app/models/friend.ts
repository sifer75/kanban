import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Friend extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_a_id: number

  @belongsTo(() => User, { foreignKey: 'user_a_id' })
  declare user_a: BelongsTo<typeof User>

  @column()
  declare user_b_id: number

  @belongsTo(() => User, { foreignKey: 'user_b_id' })
  declare user_b: BelongsTo<typeof User>

  @column()
  declare status: 'pending' | 'accepted'
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
