const express = require ("express"); // (1)
const {engine} = require("express-handlebars");
const rutaPrincipal = require("../routes/index");  


const path = require("path");
const app = express(); // (2) 
    app.use(express.json());    // (3) 
    app.use(express.urlencoded({extended:true}));   // (3) 
    app.use(express.static("public"));
    app.use("/api", rutaPrincipal);  

const viewFoldersPath = path.resolve(__dirname, "../../views"); // (9)
    // console.log(viewFoldersPath)

const layoutFoldersPath = path.resolve `${viewFoldersPath+"/layouts"}`;  // (8)
const partialFolderPath = path.resolve `${viewFoldersPath+"/partials"}`;
const defaultLayoutPath = path.resolve `${layoutFoldersPath+"/index.hbs"}`;

app.set("view engine", "hbs"); // (5)
app.set("views", viewFoldersPath); //(6)

app.engine("hbs", engine({ //(7)
    // CONFIGURACION 
    layoutsDir: layoutFoldersPath, //(8)
    extname: "hbs",
    defaultLayout: defaultLayoutPath,
    partialsDir: partialFolderPath
}));


// ENDPOINTS
app.get("/test", (request, response) => {
    response.json({
        msg: "ok"
    })
})

    // CHEQUEAR QUE TODO ESTE BIEN 
app.get("/", (request, response) => {
    response.render("main")
    /* 
        ACA ESTAMOS DICIENDO CUAL ES EL ARCHIVO HBS QUE QUIERO UTILIZAR ("main") Y CUAL ES EL LAYOUT QUE QUIERO UTILIZAR ("index")
        . A) ?COMO SABE DONDE ESTA "main.hbs"? 
            . Por la linea 18 ("views", viewFoldersPath)
        . B) ?COMO SABE DONDE ESTA "index.hbs"?
            . Por la linea 22 ("layoutsDir: ...")
    */
});

app.get("/form", (request, response) => {
    response.render("form")
})

app.get("/products", async (request, response) => {
    try {
        const fs = require ( 'fs/promises' );
        const filePath = path.resolve(__dirname, "../../products.json");
        const fileData = await fs.readFile( filePath, "utf-8" );
        const dataProds = JSON.parse( fileData );
            console.log(dataProds[1]);

        response.render("products", {dataProds} )
    } catch (error) {
        return error, "Error";
    }
});


module.exports = app;

//


/* 
(1) Este server es la APP de EXPRESS
(2) Estoy inicializando la APP
(3) Le pongo toda la data necesaria para parsear el request.body (Esto es configuracion de la app de express)
(4) Y tengo un ROUTER c/vez que vea un path que arranque con "usuarios"


(5) Esto le dice a Express que como motor de plantilla va a usar HANDLEBARS
(6) Es la ubicacion de HANDLEBARS
(7) Esto permite configurar HANDLEBARS mediante un {}
(8) P/ configurar HBS, hay que decirle donde esta la carpeta de LAYOUTS
(9) Ubicacion de la carpeta VIEWS
*/