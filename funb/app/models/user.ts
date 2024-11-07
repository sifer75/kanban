import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import Workspace from './workspace.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Mission from './mission.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare provider: string

  @column()
  declare provider_id: string

  @column()
  declare avatar_url: string

  @column()
  declare token: string | undefined

  @hasMany(() => Workspace, { foreignKey: 'user_id' })
  declare workspaces: HasMany<typeof Workspace>

  @hasMany(() => Mission, { foreignKey: 'user_id' })
  declare missions: HasMany<typeof Mission>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
