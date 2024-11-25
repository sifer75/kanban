import Transmit from '@adonisjs/transmit/services/main'
import transmit from '@adonisjs/transmit/services/main'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import Friend from '#models/friend'

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

      const friends = await Friend.query()
        .where('status', 'accepted')
        .andWhere((query) => {
          query.where('user_a_id', userId).orWhere('user_b_id', userId)
        })
        .preload('user_a', (query) => query.select('id', 'name', 'avatar_url'))
        .preload('user_b', (query) => query.select('id', 'name', 'avatar_url'))

      const formattedUsers = friends.map((user) => {
        const userA = user.user_a_id === userId
        const users = userA ? user.user_b : user.user_a

        return {
          id: users.id,
          name: users.name,
          avatar_url: users.avatar_url,
        }
      })
      return response.status(200).json(formattedUsers)
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
      const existingTable = await Friend.query()
        .where('user_a_id', userId)
        .andWhere('user_b_id', friendId)
        .orWhere('user_a_id', friendId)
        .andWhere('user_b_id', userId)
        .first()

      if (existingTable) {
        return response.status(400).json({ message: 'Ami déjà existant' })
      }

      const newRelation = await Friend.create({
        user_a_id: userId,
        user_b_id: friendId,
        status: 'pending',
      })

      console.log(newRelation, 'eee')
      transmit.broadcast(`friend/${friendId}`, {
        id: newRelation.id,
        user_a_id: userId,
        user_b_id: friendId,
      })

      return response.status(201).json({ message: "Requete d'ami ajouté avec succès" })
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
      const users = await User.query()
        .whereNot('id', userId)
        .whereNotIn(
          'id',
          Friend.query()
            .where('user_a_id', userId)
            .orWhere('user_b_id', userId)
            .select('user_a_id')
            .union(
              Friend.query()
                .where('user_a_id', userId)
                .orWhere('user_b_id', userId)
                .select('user_b_id')
            )
        )
      console.log(users, 'dd')
      return response.status(200).json(users)
    } catch (e) {
      console.log(e, 'dd')
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
      const relation = await Friend.query()
        .where('user_b_id', userId)
        .andWhere('user_a_id', id)
        .orWhere('user_a_id', userId)
        .andWhere('user_b_id', id)
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
      const relation = await Friend.query()
        .where('status', 'pending')
        .andWhere((query) => {
          query
            .where('user_a_id', userId)
            .andWhere('user_b_id', id)
            .orWhere('user_b_id', userId)
            .andWhere('user_a_id', id)
        })
        .first()
      if (!relation) {
        return response.status(404).json({ error: 'Relation non trouvée' })
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
      const requestedFriends = await Friend.query()
        .where('user_b_id', userId)
        .andWhere('status', 'pending')
        .preload('user_a', (query) => query.select('id', 'name', 'avatar_url'))
      if (requestedFriends.length === 0) {
        return response.status(400).json({ e: "Demande d'amis non trouvé" })
      }
      const friendToNotify = requestedFriends.map((request) => ({
        id: request.id,
        user_id: request.user_a.id,
        name: request.user_a.name,
        avatar_url: request.user_a.avatar_url,
      }))
      Transmit.broadcast(`/friend/${userId}`, {
        type: 'friend-request',
        data: friendToNotify,
      })
      return response.json(friendToNotify)
    } catch (e) {
      return response.status(500).json({ e: "Erreur lors de la récupération des demande d'amis" })
    }
  }

  async deleteFriend({ response, request, auth }: HttpContext) {
    try {
      const { id } = request.only(['id'])
      if (!id) {
        return response.status(404).json({ e: 'Id non trouvé' })
      }
      const userId = auth.user!.id
      if (!userId) {
        return response.status(404).json({ e: 'utilisateur non trouvé' })
      }

      const friend = await Friend.query()
        .where((query) => {
          query
            .where('user_a_id', userId)
            .andWhere('user_b_id', id)
            .orWhere('user_b_id', userId)
            .andWhere('user_a_id', id)
        })
        .andWhere('status', 'accepted')
        .first()
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
