import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { Meridiem } from '#controllers/missions_controller'

export default class Mission extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare title: string

  @column()
  declare tasks: string[]

  @column()
  declare time_start_hour: string

  @column()
  declare time_start_min: string

  @column()
  declare time_end_hour: string

  @column()
  declare time_end_min: string

  @column()
  declare time_start_meridiem: Meridiem

  @column()
  declare time_end_meridiem: Meridiem

  @column()
  declare date: string

  @belongsTo(() => User, { foreignKey: 'user_id' })
  declare mission: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
