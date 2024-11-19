/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const WorkspacesController = () => import('#controllers/workspaces_controller')
const KanbansController = () => import('#controllers/kanbans_controller')
const TaskController = () => import('#controllers/tasks_controller')
const SocialsController = () => import('#controllers/socials_controller')
const UsersController = () => import('#controllers/users_controller')
const MissionController = () => import('#controllers/missions_controller')

//connection
router.get('/github/redirect', [SocialsController, 'githubRedirect'])
router.get('/auth/github/callback', [SocialsController, 'githubCallback'])
router.get('/google/redirect', [SocialsController, 'googleRedirect'])
router.get('/auth/google/callback', [SocialsController, 'googleCallback'])

router
  .group(() => {
    // user
    router.post('/user/logout', [UsersController, 'logout'])
    router.get('/user/get', [UsersController, 'getUserInfo'])
    router.get('/user/get/all', [UsersController, 'getAllUsers'])
    router.post('/user/friend/create/:id', [UsersController, 'requestFriend'])
    router.get('/user/friend/request/get', [UsersController, 'getAllRequestFriends'])
    router.post('/user/friend/add/:id', [UsersController, 'addFriend'])
    router.delete('/user/friend/delete/:id', [UsersController, 'deleteFriend'])
    router.delete('/user/friend/request/delete/:id', [UsersController, 'deleteFriendRequest'])
    router.get('/user/get/friend/all', [UsersController, 'findAllFriends'])
    //  workspace
    router.post('/workspace/create', [WorkspacesController, 'createWorkspace'])
    router.get('/workspace/get', [WorkspacesController, 'getAllWorkspace'])
    router.get('/workspace/get/:id', [WorkspacesController, 'getSpecificWorkspace'])
    router.post('/workspace/update/:id', [WorkspacesController, 'updateWorkspace'])
    router.delete('/workspace/delete/:id', [WorkspacesController, 'deleteWorkspace'])
    //  kanban
    router.post('/kanban/create', [KanbansController, 'createKanban'])
    router.get('/kanban/get/:id', [KanbansController, 'getAllKanban'])
    router.post('/kanban/update/:id', [KanbansController, 'updateKanban'])
    router.delete('/kanban/delete/:id', [KanbansController, 'deleteKanban'])
    //  task
    router.post('/task/create', [TaskController, 'createTask'])
    router.get('/task/get/:id', [TaskController, 'getAllTask'])
    router.post('/task/update/:id', [TaskController, 'updateTask'])
    router.delete('/task/delete/:id', [TaskController, 'deleteTask'])
    router.post('/task/update/status/:id', [TaskController, 'updateTaskStatus'])
    //  mission
    router.post('/mission/create', [MissionController, 'createMission'])
    router.get('/mission/get', [MissionController, 'getAllMissionsFromDate'])
  })
  .use(middleware.auth({ guards: ['web'] }))
