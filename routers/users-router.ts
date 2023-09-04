import { Router } from 'express'
import { getUsers, addUsers } from '../controllers/users-controller'

const router = Router()

router.get('/api/users', getUsers)
router.post('/api/users', addUsers)

export default router
