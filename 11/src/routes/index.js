import Router from "express";
import productsRouter from "./products.js";
import messagesRouter from "./messages.js";

const router = Router();

router.use("/products", productsRouter);
router.use("/messages", messagesRouter);

export default router;
