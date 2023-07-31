import { Router } from "express";
import { getTutors, addTutor, deleteTutor, changeTutor, checkTutor } from "../controllers/tutor-controller"

import { checkValidateDatas } from "../middlewares/validateDatas"

const router = Router()

router.get("/api/tutors", getTutors)
router.post("/api/tutors", checkValidateDatas("name", 2, 20), checkValidateDatas("surname", 2, 20), checkValidateDatas("password", 8, 20),  addTutor)
router.post("/api/logintutors", checkValidateDatas("name", 2, 20), checkValidateDatas("surname", 2, 20), checkValidateDatas("password", 8, 20),  checkTutor)
router.delete("/api/tutors/:id", deleteTutor)
router.put("/api/tutors/:id", checkValidateDatas("name", 2, 20), checkValidateDatas("surname", 2, 20), checkValidateDatas("password", 8, 20), changeTutor)

export default router