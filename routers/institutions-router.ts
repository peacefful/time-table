import { Router } from "express";
import { getInstitutions, addInstitutions, deleteInstitution, changeInstitution } from "../controllers/institution-controller"

import { checkValidateDatas } from "../middlewares/validateDatas";
import passport from "passport";

const router = Router()

router.get("/api/institutions", getInstitutions)
router.post("/api/institutions", passport.authenticate('jwt', { session: false }), checkValidateDatas("appellation", 3, 20), addInstitutions)
router.delete("/api/institutions/:id", passport.authenticate('jwt', { session: false }), deleteInstitution)
router.put("/api/institutions/:id", passport.authenticate('jwt', { session: false }), checkValidateDatas("appellation", 3, 20), changeInstitution)

export default router