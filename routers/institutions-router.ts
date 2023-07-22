import { Router } from "express";
import { getInstitutions, addInstitutions, deleteInstitution, changeInstitution } from "../controllers/institution-controller"

import { getDataFrominstitutions } from "../middlewares/checkInput";

const router = Router()

router.get("/api/institutions", getInstitutions)
router.post("/api/institutions", getDataFrominstitutions, addInstitutions)
router.delete("/api/institutions/:id", deleteInstitution)
router.put("/api/institutions/:id", changeInstitution)

export default router