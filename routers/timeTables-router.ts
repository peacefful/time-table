import { Router } from "express";
import { getTimeTable, createTimeTable, deleteTimeTable, changeTimeTable } from "../controllers/timeTable-controller"

const router = Router()

router.get("/api/timetable", getTimeTable)
router.post("/api/timetable", createTimeTable)
router.delete("/api/timetable/:id", deleteTimeTable)
router.put("/api/timetable/:id", changeTimeTable)

export default router