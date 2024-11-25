import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Friend from './friend.js'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare receiver_id: number

  @column()
  declare sender_id: number

  @column()
  declare message: string

  @belongsTo(() => User, { foreignKey: 'sender_id' })
  declare sender: BelongsTo<typeof User>

  @belongsTo(() => Friend, { foreignKey: 'receiver_id' })
  declare receiver: BelongsTo<typeof Friend>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
