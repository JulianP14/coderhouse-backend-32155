const { Router } = require("express");//

const productsRouter = require("./products"); // (1)

const rutaPrincipal = Router();
    rutaPrincipal.use("/products", productsRouter); // (2)

module.exports = rutaPrincipal;


/* 
ESTE ARCHIVO ES EL MANEJADOR PRINCIPAL DE LAS RUTAS GENERALES. A MEDIDA QUE HAYAN MAS RECURSOS, LOS AGREGO ACA PARA DESPUES CREAR UN ARCHIVO POR C/ RECURSO QUE SE MANEJA

(1) Este archivo de ruta PPAL va a IMPORTAR la ruta de usuarios y va a trabajar con TODO lo que tenga usuarios. Tambien podria agregar un Router para productos. 
(2) rutaPricipal va a decir que todo lo que empiece con "usuarios" lo va a manejar usuariosRouter

*/