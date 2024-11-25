import transmit from '@adonisjs/transmit/services/main'
import type { HttpContext } from '@adonisjs/core/http'
import Message from '#models/message'
import Friend from '#models/friend'

export default class MessagesController {
  async sendMessage({ response, request, auth }: HttpContext) {
    try {
      const { message, friendId } = request.only(['message', 'friendId'])
      if (!message || !friendId) {
        return response.status(404).json({ e: 'Message non trouvé' })
      }
      const userId = auth.user!.id
      if (!userId) {
        return response.status(404).json({ e: 'Id non trouvé' })
      }
      const findTchat = await Friend.query()
        .where((query) => query.where('user_a_id', userId).andWhere('user_b_id', friendId))
        .orWhere((query) => query.where('user_a_id', friendId).andWhere('user_b_id', userId))
        .andWhere('status', 'accepted')
        .first()
      if (!findTchat) {
        return response.status(404).json({ e: 'Message non trouvé' })
      }
      const newMessage = await Message.create({
        sender_id: auth.user!.id,
        receiver_id: friendId,
        message: message,
      })
      transmit.broadcast(`/tchat/${userId}`, {
        id: newMessage.id,
        message: message,
        senderId: userId,
        receiverId: friendId,
      })
      transmit.broadcast(`/tchat/${friendId}`, {
        id: newMessage.id,
        message: message,
        senderId: userId,
        receiverId: friendId,
      })

      return response.status(200).json(newMessage)
    } catch (e) {
      return response.status(500).json({ e: 'Erreur lors du renvoie du message' })
    }
  }

  async getMessages({ response, auth, params }: HttpContext) {
    try {
      const userId = auth.user!.id
      if (!userId) {
        return response.status(404).json({ e: 'Utilisateur non trouvé' })
      }
      const friendId = params.id
      if (!friendId) {
        return response.status(404).json({ e: 'Utilisateur non trouvé' })
      }
      const userMessages = await Message.query()
        .where((query) => {
          query.where('sender_id', userId).andWhere('receiver_id', friendId)
        })
        .orWhere((query) => {
          query.where('sender_id', friendId).andWhere('receiver_id', userId)
        })
        .preload('sender')
        .orderBy('createdAt', 'asc')
      return response.status(200).json(userMessages)
    } catch (e) {
      return response.status(500).json({ e: 'Erreur lors de la récupération des messages' })
    }
  }
}
