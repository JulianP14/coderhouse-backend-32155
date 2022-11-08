import { Router } from "express";
import prodRouter from "./products";
import cartRouter from "./cart"

const rutaPrincipal = Router();
    rutaPrincipal.use("/products", prodRouter);
    rutaPrincipal.use("/cart", cartRouter)

/* const rutaProducts = require("./products");  */

export default rutaPrincipal;