import { Router } from "express";
import { getInstitutions, addInstitutions, deleteInstitution, changeInstitution } from "../controllers/institution-controller"

import { checkEmptyDatas } from "../middlewares/validateDatas";

const router = Router()

router.get("/api/institutions", getInstitutions)
router.post("/api/institutions", checkEmptyDatas("appellation", 3, 20), addInstitutions)
router.delete("/api/institutions/:id", deleteInstitution)
router.put("/api/institutions/:id", checkEmptyDatas("appellation", 3, 20), changeInstitution)

export default router