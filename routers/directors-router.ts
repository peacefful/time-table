import { Router } from "express";
import { getDirectors, addDirector, deleteDirector, changeDirector } from "../controllers/directors-controller"

const router = Router()

router.get("/api/directors", getDirectors)
router.post("/api/directors", addDirector)
router.delete("/api/directors/:id", deleteDirector)
router.put("/api/directors/:id", changeDirector)

export default router