import { Router } from "express";
import { getStudents, addStudent, deleteStudent, changeStudent, checkStudent } from "../controllers/student-controller"

import { checkValidateDatas } from "../middlewares/validateDatas";
import passport from "passport";

const router = Router()

router.get("/api/students", getStudents)
router.post("/api/students", checkValidateDatas("name", 2, 20), checkValidateDatas("surname", 2, 20), checkValidateDatas("password", 8, 20), checkValidateDatas("role", 7, 8), addStudent)
router.post("/api/authstudents", checkValidateDatas("name", 2, 20), checkValidateDatas("surname", 2, 20), checkValidateDatas("password", 8, 20), checkValidateDatas("role", 7, 8), checkStudent)
router.delete("/api/students/:id", deleteStudent)
router.put("/api/students/:id", checkValidateDatas("name", 2, 20), checkValidateDatas("surname", 2, 20), checkValidateDatas("password", 8, 20), checkValidateDatas("role", 7, 8), changeStudent)

export default router