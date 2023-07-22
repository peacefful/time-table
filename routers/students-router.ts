import { Router } from "express";
import { getStudents, addStudent, deleteStudent, changeStudent } from "../controllers/students-controller"

const router = Router()

router.get("/api/students", getStudents)
router.post("/api/students", addStudent)
router.delete("/api/students/:id", deleteStudent)
router.put("/api/students/:id", changeStudent)

export default router