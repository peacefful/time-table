import { Router } from "express";
import { getTutors, addTutor, deleteTutor, changeTutor } from "../controllers/tutor-controller"

import { checkEmptyDatas } from "../middlewares/validateDatas"

const router = Router()

router.get("/api/tutors", getTutors)
router.post("/api/tutors", checkEmptyDatas("name", 2, 20), checkEmptyDatas("surname", 2, 20), checkEmptyDatas("password", 8, 20),  addTutor)
router.delete("/api/tutors/:id", deleteTutor)
router.put("/api/tutors/:id", checkEmptyDatas("name", 2, 20), checkEmptyDatas("surname", 2, 20), checkEmptyDatas("password", 8, 20), changeTutor)

export default router