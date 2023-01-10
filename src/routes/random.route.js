import { Router } from "express";
const router = Router();
import { RandomNumbers } from "../controllers/random.controller.js";

router.get("/randoms/:cant", RandomNumbers);

export default router;
