const express = require ('express');              // (1)
const path = require ('path');
const rutaPrincipal = require("../routes/index");      // (5)

const app = express();                              // (2) 

app.use( express.json() );                          // (3) 
app.use( express.urlencoded({ extended: true }));   // (3) 

const publicPath = path.resolve(__dirname, "../../public")
app.use(express.static(publicPath));
app.use("/api", rutaPrincipal);                        // (4) (4.b)

module.exports = app;

/* 
(1) Este server es una APP de EXPRESS
(2) Estoy inicializando la APP
(3) Le pongo toda la data necesaria para parsear el request.body (Esto es configuracion de la app de express)
(4) Y tengo un ROUTER c/vez que vea un path que arranque con "usuarios"
(4.b) Se reemplaza el "usuarios" por "api" PORQUE TODOS LOS ENDPOINTS DEBEN EMPEZAR CON "/api"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
(5) El servidor en vez de llamar a la ruta de usuarios, va a llamar a la PPAL (index)

A ESTOS 5 PASOS SE LOS CONOCE COMO: RECETA DE COCINA

*/
