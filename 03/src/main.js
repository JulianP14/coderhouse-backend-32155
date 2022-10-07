const express = require("express");
    const app = express();

const PORT = 8080;

const fs = require ("fs");
const path = require ("path");
const ruta = path.resolve( __dirname, "../main.json");

const getProds = async () => {
    try {
        const data = await fs.promises.readFile( ruta, 'utf-8');
        const products = JSON.parse(data);
        return products;
    } catch (error) {
        throw new Error (`Error de lectura ${error}`)
    }
}

const arrayLength = () => {
    const data = fs.promises.readFile( ruta, 'utf-8');
    const products = JSON.parse(data);
    return products.length;
}
const between = (min, max) => {
    
    return Math.floor(Math.random() * (max - min) + min);
};

    


app.get( "/products", (request, response) => {
    response.send(getProds());
    console.log(getProds());
});

app.get( "/random-prod", (request, response) => {
    response.send( );
});

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("error", error => console.log(`Error en servidor: ${error}`));

