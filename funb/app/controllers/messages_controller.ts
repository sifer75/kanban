import transmit from '@adonisjs/transmit/services/main'
import type { HttpContext } from '@adonisjs/core/http'
import UserUser from '#models/user_user'
import Message from '#models/message'

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
      const findTchat = await UserUser.query()
        .where('user_id', userId)
        .andWhere('friend_id', friendId)
        .orWhere('user_id', friendId)
        .andWhere('friend_id', userId)
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
      transmit.broadcast(`/tchat/${friendId}`, {
        id: newMessage.id,
        message: message,
        sender: userId,
        receiver: friendId,
      })
      transmit.broadcast(`/tchat/${userId}`, {
        id: newMessage.id,
        message: message,
        sender: userId,
        receiver: friendId,
      })
      return response.status(200).json({ message: 'Message envoyé avec succès' })
    } catch (e) {
      return response.status(500).json({ e: 'Erreur lors du renvoie du message' })
    }
  }
}
