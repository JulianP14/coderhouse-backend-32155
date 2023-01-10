const { Router } = require("express");
const rutaProducts = require("./products"); 
const rutaPrincipal = Router();
    rutaPrincipal.use("/products", rutaProducts); 

module.exports = rutaPrincipal;