import { Router } from "express";
import { getDirectors, addDirector, deleteDirector, changeDirector, checkDirector } from "../controllers/directors-controller"

import { checkEmptyDatas } from "../middlewares/validateDatas"
import passport from "passport";

const router = Router()

router.get("/api/directors", getDirectors)
router.post("/api/directors", checkEmptyDatas("name", 2, 20), checkEmptyDatas("surname", 2, 20), checkEmptyDatas("password", 8, 20),addDirector)
router.post("/api/logindirectors", checkEmptyDatas("name", 2, 20), checkEmptyDatas("surname", 2, 20), checkEmptyDatas("password", 8, 20),checkDirector)
router.delete("/api/directors/:id", deleteDirector)
router.put("/api/directors/:id", checkEmptyDatas("name", 2, 20), checkEmptyDatas("surname", 2, 20), checkEmptyDatas("password", 8, 20), changeDirector)

export default router