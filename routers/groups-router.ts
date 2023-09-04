import { Router } from 'express'
import { getGroups, addGroup, deleteGroup, changeGroup } from '../controllers/group-controller'

const router = Router()

router.get('/api/groups', getGroups)
router.post('/api/groups', addGroup)
router.delete('/api/groups/:id', deleteGroup)
router.put('/api/groups/:id', changeGroup)

export default router
