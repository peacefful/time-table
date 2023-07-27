import { Router } from "express";
import { getSubjectsOnMonday, addSubjectOnMonday, deleteSubjectOnMonday, changeSubjectOnMonday } from "../controllers/monday-controller"
import { getSubjectsOnTuesday, addSubjectsOnTuesday, deleteSubjectsOnTuesday, changeSubjectsOnTuesday } from "../controllers/tuesday-controller"
import { getSubjectsOnWednesday, addSubjectsOnWednesday, deleteSubjectsOnWednesday, changeSubjectsOnWednesday } from "../controllers/weekdays/wednesday-controller"
import { getSubjectsOnThursday, addSubjectsOnThursday, deleteSubjectsOnThursday, changeSubjectsOnThursday } from "../controllers/thursday-controller"
import { getSubjectsOnFriday, addSubjectsOnFriday, deleteSubjectsOnFriday, changeSubjectsOnFriday } from "../controllers/friday-controller"
import { getSubjectsOnSaturday, addSubjectOnSaturday, deleteSubjectOnSaturday, changeSubjectOnSaturday } from "../controllers/saturday-controller"

const router = Router()

router.get("/api/monday", getSubjectsOnMonday)
router.post("/api/monday", addSubjectOnMonday)
router.delete("/api/monday/:id", deleteSubjectOnMonday)
router.put("/api/monday/:id", changeSubjectOnMonday)

router.get("/api/tuesday", getSubjectsOnTuesday)
router.post("/api/tuesday", addSubjectsOnTuesday)
router.delete("/api/tuesday/:id", deleteSubjectsOnTuesday)
router.put("/api/tuesday/:id", changeSubjectsOnTuesday)

router.get("/api/wednesday", getSubjectsOnWednesday)
router.post("/api/wednesday", addSubjectsOnWednesday)
router.delete("/api/wednesday/:id", deleteSubjectsOnWednesday)
router.put("/api/wednesday/:id", changeSubjectsOnWednesday)

router.get("/api/thursday", getSubjectsOnThursday)
router.post("/api/thursday", addSubjectsOnThursday)
router.delete("/api/thursday/:id", deleteSubjectsOnThursday)
router.put("/api/thursday/:id", changeSubjectsOnThursday)

router.get("/api/friday", getSubjectsOnFriday)
router.post("/api/friday", addSubjectsOnFriday)
router.delete("/api/friday/:id", deleteSubjectsOnFriday)
router.put("/api/friday/:id", changeSubjectsOnFriday)

router.get("/api/saturday", getSubjectsOnSaturday)
router.post("/api/saturday", addSubjectOnSaturday)
router.delete("/api/saturday/:id", deleteSubjectOnSaturday)
router.put("/api/saturday/:id", changeSubjectOnSaturday)

export default router