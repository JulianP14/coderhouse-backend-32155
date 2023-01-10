import { Router } from "express";
const router = Router();
import { AllMessages, NormalizedMessages, DenormalizedMessages } from "../controllers/messages.js";

router.get("/all", AllMessages);
router.get("/normalizr", NormalizedMessages);
router.get("/denormalizr", DenormalizedMessages);

export default router;
