import { Router } from 'express'
import {
  getDirectors,
  addDirector,
  deleteDirector,
  changeDirector,
  checkDirector
} from '../controllers/directors-controller'

import { checkValidateDatas } from '../middlewares/validateDatas'

const router = Router()

router.get('/api/directors', getDirectors)
router.post(
  '/api/directors',
  checkValidateDatas('name', 2, 20),
  checkValidateDatas('surname', 2, 20),
  checkValidateDatas('password', 8, 20),
  checkValidateDatas('role', 7, 8),
  addDirector
)
router.post(
  '/api/authdirectors',
  checkValidateDatas('name', 2, 20),
  checkValidateDatas('surname', 2, 20),
  checkValidateDatas('password', 8, 20),
  checkValidateDatas('role', 7, 8),
  checkDirector
)
router.delete('/api/directors/:id', deleteDirector)
router.put(
  '/api/directors/:id',
  checkValidateDatas('name', 2, 20),
  checkValidateDatas('surname', 2, 20),
  checkValidateDatas('password', 8, 20),
  checkValidateDatas('role', 7, 8),
  changeDirector
)

export default router
