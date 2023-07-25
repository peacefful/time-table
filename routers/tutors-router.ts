import { Router } from "express";
import { getTutors, addTutor, deleteTutor, changeTutor } from "../controllers/tutor-controller"

// import { getDataFromInstitutions } from "../middlewares/checkInput";

const router = Router()

router.get("/api/tutors", getTutors)
router.post("/api/tutors", addTutor)
router.delete("/api/tutors/:id", deleteTutor)
router.put("/api/tutors/:id", changeTutor)

export default router