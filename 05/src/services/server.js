const express = require ("express"); // (1)
const {engine} = require("express-handlebars");

const path = require("path");
const app = express(); // (2) 
    app.use(express.json());    // (3) 
    app.use(express.urlencoded({extended:true}));   // (3) 
    app.use(express.static("public"));

const viewFoldersPath = path.resolve(__dirname, "../views");

const layoutFoldersPath = path.resolve `${viewFoldersPath}/layouts`; // (8)
const defaultLayoutPath = path.resolve `${viewFoldersPath}/partials`;
const partialFolderPath = path.resolve `${layoutFoldersPath}/index.hbs`;

app.set("view engine", "handlebars"); // (5)
app.set("views", viewFoldersPath); //(6)

app.engine("hbs", engine({ //(7)
    // CONFIGURACION 
    layoutsDir: layoutFoldersPath, //(8)
    extname: hbs,
    defaultLayout: defaultLayoutPath,
    partialsDir: partialFolderPath
}));




/* 
(1) Este server es la APP de EXPRESS
(2) Estoy inicializando la APP
(3) Le pongo toda la data necesaria para parsear el request.body (Esto es configuracion de la app de express)
(4) Y tengo un ROUTER c/vez que vea un path que arranque con "usuarios"


(5) Esto le dice a Express que como motor de plantilla va a usar HANDLEBARS
(6) Es la ubicacion de HANDLEBARS
(7) Esto permite configurar HANDLEBARS mediante un {}
(8) P/ configurar HBS, hay que decirle donde esta la carpeta de LAYOUTS
*/