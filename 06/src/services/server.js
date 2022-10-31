const express = require("express");
const {engine} = require("express-handlebars");
const http = require("http");
const path = require("path");
const rutaPrincipal = require("../routes/index"); 
const app = express(); 
const httpServer = http.Server(app);
    app.use(express.json());   
    app.use(express.urlencoded({extended:true})); 
    app.use(express.static("public"));
    app.use("/api", rutaPrincipal); 

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
    

// ENDPOINTS
    app.get("/", async (request, response) => {
        try {
            const fs = require ( 'fs/promises' );
            const filePath = path.resolve(__dirname, "../../products.json");
            const fileData = await fs.readFile( filePath, "utf-8" );
            const dataProds = JSON.parse( fileData );
            response.render("main", {dataProds})
        } catch (error) {
            return error, "Error";
        }
        
    })
    
module.exports = httpServer;


/* 
(1) Evento "connection". Se ejecuta c/ vez que un cliente se conecta al servidor
*/