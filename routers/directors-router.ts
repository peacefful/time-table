import { Router } from "express";
import { getDirectors, addDirector, deleteDirector, changeDirector, checkDirector } from "../controllers/directors-controller"

import { checkValidateDatas } from "../middlewares/validateDatas"
import { checkEmptyDatas } from "../middlewares/validateDatas"
import { body } from "express-validator";

const router = Router()

router.get("/api/directors", getDirectors)

router.post("/api/directors", checkValidateDatas("name", 2, 20), checkValidateDatas("surname", 2, 20), checkValidateDatas("password", 8, 20), [body('role').isEmpty().withMessage('Поле не должно быть пустым')], addDirector)

router.post("/api/logindirectors", checkValidateDatas("name", 2, 20), checkValidateDatas("surname", 2, 20), checkValidateDatas("password", 8, 20), checkEmptyDatas(), checkDirector)

router.delete("/api/directors/:id", deleteDirector)

router.put("/api/directors/:id", checkValidateDatas("name", 2, 20), checkValidateDatas("surname", 2, 20), checkValidateDatas("password", 8, 20), checkEmptyDatas(), changeDirector)

export default router