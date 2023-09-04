import { Router } from 'express'
import {
  getTutors,
  addTutor,
  deleteTutor,
  changeTutor,
  checkTutor,
  updateGroupId
} from '../controllers/tutor-controller'

import { checkValidateDatas } from '../middlewares/validateDatas'

const router = Router()

router.get('/api/tutors', getTutors)
router.post(
  '/api/tutors',
  checkValidateDatas('name', 2, 20),
  checkValidateDatas('surname', 2, 20),
  checkValidateDatas('password', 8, 20),
  checkValidateDatas('role', 7, 8),
  addTutor
)
router.post(
  '/api/authtutors',
  checkValidateDatas('name', 2, 20),
  checkValidateDatas('surname', 2, 20),
  checkValidateDatas('password', 8, 20),
  checkValidateDatas('role', 7, 8),
  checkTutor
)
router.delete('/api/tutors/:id', deleteTutor)
router.put(
  '/api/tutors/:id',
  checkValidateDatas('name', 2, 20),
  checkValidateDatas('surname', 2, 20),
  checkValidateDatas('password', 8, 20),
  checkValidateDatas('role', 7, 8),
  changeTutor
)

router.put('/api/tutors/updategroup/:id', updateGroupId)

export default router
