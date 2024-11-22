import User from '#models/user'
import UserUser from '#models/user_user'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class UsersController {
  async getUserInfo({ auth, response }: HttpContext) {
    try {
      if (!auth || !auth.user) {
        return response.status(400).json({ error: 'Utilisateur non trouvé' })
      }
      const user = auth.getUserOrFail()
      return response.json(user)
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

      const friends = await db
        .from('user_user')
        .join('users', 'users.id', '=', 'user_user.friend_id')
        .where('user_user.user_id', userId)
        .andWhere('user_user.status', 'accepted')
        .select('users.id', 'users.name', 'users.email', 'users.avatar_url')

      return response.status(200).json(friends)
    } catch (e) {
      return response.status(500).json({ e: 'Erreur lors de la recherche des utilisateur' })
    }
  }

  async requestFriend({ response, request, auth }: HttpContext) {
    try {
      if (!auth || !auth.user || !auth.user.id) {
        return response.status(500).json({ e: 'Utilisateur non trouvé' })
      }
      const userId = auth.user.id
      const { id: friendId } = request.only(['id'])
      const existingTable = await UserUser.query()
        .where('user_id', userId)
        .andWhere('friend_id', friendId)
        .orWhere('user_id', friendId)
        .andWhere('friend_id', userId)
        .first()

      if (existingTable) {
        return response.status(400).json({ message: 'Ami déjà existant' })
      }

      await UserUser.create({
        user_id: userId,
        friend_id: friendId,
        status: 'pending',
      })

      return response.status(201).json({ message: 'Ami ajouté avec succès' })
    } catch (e) {
      return response.status(500).json({ e: "Erreur lors de l'ajout d'un ami" })
    }
  }

  async getAllUsers({ response, auth }: HttpContext) {
    try {
      const userId = auth?.user?.id
      if (!userId) {
        return response.status(401).json({ e: 'Id non trouvé' })
      }
      const users = await User.query().whereNot('id', userId)
      const friends = await UserUser.query().where('user_id', userId).orWhere('friend_id', userId)
      const friendsIds = friends.map((friend) => friend.friend_id)
      const usersFiltered = users.filter((user) => !friendsIds.includes(user.id))
      return response.status(200).json(usersFiltered)
    } catch (e) {
      return response.status(500).json({ e: 'Erreur lors de la récupération des utilisateurs' })
    }
  }

  async addFriend({ response, auth, request }: HttpContext) {
    try {
      const userId = auth?.user?.id
      if (!userId) {
        return response.status(401).json({ e: 'Id non trouvé' })
      }
      const { id } = request.only(['id'])
      if (!id) {
        return response.status(404).json({ error: 'ID ami manquant' })
      }
      const relation = await UserUser.query()
        .where('user_id', userId)
        .andWhere('friend_id', id)
        .first()
      if (!relation) {
        return response.status(400).json({ error: 'Relation non trouvée' })
      }
      relation.status = 'accepted'
      await relation.save()
      return response.status(200).json({ message: 'Ami accepté' })
    } catch (e) {
      return response.status(500).json({ e: "Erreur lors de l'ajout de l'ami" })
    }
  }

  async deleteFriendRequest({ response, auth, request }: HttpContext) {
    try {
      const userId = auth?.user?.id
      if (!userId) {
        return response.status(401).json({ error: 'Id non trouvé' })
      }
      const { id } = request.only(['id'])
      if (!id) {
        return response.status(401).json({ error: 'ID ami manquant' })
      }
      const relation = await UserUser.query()
        .where('user_id', userId)
        .andWhere('friend_id', id)
        .first()
      if (!relation) {
        return response.status(400).json({ error: 'Relation non trouvée' })
      }
      await relation.delete()
      return response.status(200).json({ message: "requete d'ami supprimée" })
    } catch (e) {
      return response.status(500).json({ e: "Erreur lors de l'ajout de l'ami" })
    }
  }

  async getAllRequestFriends({ response, auth }: HttpContext) {
    try {
      const userId = auth?.user?.id
      if (!userId) {
        return response.status(401).json({ error: 'ID non trouvé' })
      }
      const requestedFriends = await UserUser.query()
        .where('user_id', userId)
        .andWhere('status', 'pending')
        .preload('friend', (query) => query.select('id', 'name', 'avatar_url'))
      if (requestedFriends.length === 0) {
        return response.status(400).json({ e: "Demande d'amis non trouvé" })
      }
      const friendsToNotify = requestedFriends.filter((friend) => friend.friend_id !== userId)
      // transmit.broadcast('/tchat/message', )
      return response.json(friendsToNotify)
    } catch (e) {
      return response.status(500).json({ e: "Erreur lors de la récupération des demande d'amis" })
    }
  }

  async deleteFriend({ response, request }: HttpContext) {
    try {
      const { id } = request.only(['id'])
      if (!id) {
        return response.status(404).json({ e: 'Id non trouvé' })
      }
      const friend = await UserUser.query().where('friend_id', id).first()
      if (!friend) {
        return response.status(404).json({ e: 'Aucun ami trouvé' })
      }
      await friend.delete()
      return response.status(200).json({ e: 'ami effacé' })
    } catch (e) {
      return response.status(500).json({ e: "Erreur lors de la suppression de l'ami" })
    }
  }
}
