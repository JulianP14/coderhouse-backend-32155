const express = require("express");
const http = require("http");
const {engine} = require("express-handlebars");
const path = require("path");
const rutaPrincipal = require("../routes/api/index"); 
const rutaPages = require ("../routes/pages/index")
const { initWsServer } = require("./socket");

const app = express(); 
const httpServer = http.Server(app);
    app.use(express.json());   
    app.use(express.urlencoded({extended:true})); 
    app.use(express.static('public'));
    app.use("/api", rutaPrincipal); 
    app.use("/", rutaPages);

// HBS seteo
    const viewFoldersPath = path.resolve(__dirname, "../../views"); 
    const layoutFoldersPath = path.resolve `${viewFoldersPath+"/layouts"}`; 
    const partialFolderPath = path.resolve `${viewFoldersPath+"/partials"}`;
    const defaultLayoutPath = path.resolve `${layoutFoldersPath+"/index.hbs"}`;

    app.set("view engine", "hbs");
    app.set("views", viewFoldersPath);  

    app.engine("hbs", engine({
        // CONFIGURACION 
        layoutsDir: layoutFoldersPath,
        extname: "hbs",
        defaultLayout: defaultLayoutPath,
        partialsDir: partialFolderPath
    }));

initWsServer(httpServer); //Conexion al socket
    
    app.use((error, request, response, next) => {
        const status = error.status || 500;
        const message = error.message || "Internal Server Error";

        response.status(status).json({
            message, stack: error.stack
        });
    });
    
module.exports = httpServer;


/* 
(1) Evento "connection". Se ejecuta c/ vez que un cliente se conecta al servidor
*/