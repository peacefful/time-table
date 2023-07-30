import { Router } from "express";
import { getStudents, addStudent, deleteStudent, changeStudent, checkStudent } from "../controllers/student-controller"

import { checkEmptyDatas } from "../middlewares/validateDatas";
import passport from "passport";

const router = Router()

router.get("/api/students", getStudents)
router.post("/api/students", checkEmptyDatas("name", 2, 20), checkEmptyDatas("surname", 2, 20), checkEmptyDatas("password", 8, 20), addStudent)
router.post("/api/loginstudents", checkEmptyDatas("name", 2, 20), checkEmptyDatas("surname", 2, 20), checkEmptyDatas("password", 8, 20), checkStudent)
router.delete("/api/students/:id", deleteStudent)
router.put("/api/students/:id", checkEmptyDatas("name", 2, 20), checkEmptyDatas("surname", 2, 20), checkEmptyDatas("password", 8, 20), changeStudent)

export default router