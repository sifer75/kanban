import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export default class UsersController {
  async getUserInfo({ auth, response }: HttpContext) {
    try {
      if (!auth || !auth.user) {
        return response.status(400).json({ error: 'Utilisateur non trouvé' })
      }
      const user = auth.getUserOrFail()
      return response.json({ user })
    } catch (e) {
      return response
        .status(500)
        .json({ e: "Erreur lors de la récupération des informations de l'utilisateur" })
    }
  }

  async logout({ response, auth }: HttpContext) {
    try {
      auth.use('web').logout()
      return response.status(200).json({ message: 'Utilisateur déconnecté avec succès' })
    } catch (e) {
      return response.status(500).json({ e: "Erreur lors de la déconnection de l'utilisateur" })
    }
  }

  async findAllFriends({ response, auth }: HttpContext) {
    try {
      if (!auth || !auth.user || !auth.user.id) {
        return response.status(404).json({ e: 'Utilisateur non trouvé' })
      }
      const userId = auth.user.id
      if (!userId) {
        return response.status(404).json({ e: 'Utilisateur non trouvé' })
      }

      const friends = await db
        .from('user_user')
        .join('users', 'users.id', '=', 'user_user.friend_id')
        .where('user_user.user_id', userId)
        .select('users.id', 'users.name', 'users.email', 'users.avatar_url')

      return response.status(200).json(friends)
    } catch (e) {
      return response.status(500).json({ e: 'Erreur lors de la recherche des utilisateur' })
    }
  }

  async addFriend({ response, request, auth }: HttpContext) {
    try {
      if (!auth || !auth.user || !auth.user.id) {
        return response.status(500).json({ e: 'Utilisateur non trouvé' })
      }
      const userId = auth.user.id
      const { id: friendId } = request.only(['id'])
      const friend = await User.find(friendId)
      if (!friend) {
        return response.status(404).json({ e: 'ami non trouvé' })
      }
      const existingTable = await db
        .from('user_user')
        .where({ user_id: userId, friend_id: friendId })
        .orWhere({ user_id: friendId, friend_id: userId })
        .first()

      if (existingTable) {
        return response.status(400).json({ message: 'Ami déjà existant' })
      }

      await db.table('user_user').insert({
        user_id: userId,
        friend_id: friendId,
        created_at: DateTime.now().toISO(),
        updated_at: DateTime.now().toISO(),
      })
      return response.status(201).json({ message: 'Ami ajouté avec succès' })
    } catch (e) {
      return response.status(500).json({ e: "Erreur lors de l'ajout d'un ami" })
    }
  }
}
