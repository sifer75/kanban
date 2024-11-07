import type { HttpContext } from '@adonisjs/core/http'
import Mission from '#models/mission'
export enum Meridiem {
  AM = 'AM',
  PM = 'PM',
}
export default class MissionsController {
  async createMission({ response, request, auth }: HttpContext) {
    try {
      if (!auth || !auth.user || !auth.user.id) {
        return response.status(404).json({ e: 'utilisateur non trouvé' })
      }

      const {
        title,
        tasks,
        date,
        timeStartHour,
        timeStartMin,
        timeEndHour,
        timeEndMin,
        timeStartMeridiem,
        timeEndMeridiem,
      }: {
        title: string
        tasks: string[]
        date: string
        timeStartHour: string
        timeStartMin: string
        timeEndHour: string
        timeEndMin: string
        timeStartMeridiem: Meridiem
        timeEndMeridiem: Meridiem
      } = request.only([
        'title',
        'tasks',
        'timeStartHour',
        'timeStartMin',
        'timeStartMeridiem',
        'timeEndHour',
        'timeEndMin',
        'timeEndMeridiem',
        'date',
      ])

      const mission = new Mission()
      mission.title = title
      mission.tasks = tasks
      mission.date = date
      mission.time_start_hour = timeStartHour
      mission.time_start_min = timeStartMin
      mission.time_end_hour = timeEndHour
      mission.time_end_min = timeEndMin
      mission.time_start_meridiem = timeStartMeridiem
      mission.time_end_meridiem = timeEndMeridiem
      mission.user_id = auth.user.id

      await mission.save()

      return response.status(201).json({
        message: 'Mission créée avec succès',
        mission,
      })
    } catch (e) {
      return response.status(500).json({ e: 'Erreur lors de la création de la mission' })
    }
  }

  async getAllMissionsFromDate({ response, auth, request }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()
      if (!user) {
        return response.status(404).json({ e: 'Utilisateur non trouvé' })
      }
      const date = request.input('date')
      if (!date) {
        return response.status(404).json({ e: 'Date non fournie' })
      }

      const missions = await user.related('missions').query().where('date', date)
      const missionsWithTasksArray = missions.map((mission) => {
        if (typeof mission.tasks === 'string') {
          mission.tasks = (mission.tasks as string)
            .replace(/[{}]/g, '')
            .split(',')
            .map((task: any) => task.trim().replace(/^"|"$/g, ''))
        }
        return mission
      })
      return response.status(200).json(missionsWithTasksArray)
    } catch (e) {
      return response.status(500).json({ e: 'Erreur lors de la récupération des missions' })
    }
  }
}
