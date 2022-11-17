const { Router } = require("express");
const rutaProducts = require("./products"); 
const rutaPrincipal = Router();
    rutaPrincipal.use("/", rutaProducts); 

module.exports = rutaPrincipal;