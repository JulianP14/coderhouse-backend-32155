const express = require("express");
    const app = express();

const PORT = 8080;

const fs = require ("fs");
const path = require ("path");
const ruta = path.resolve( __dirname, "../main.json");


    const getProds = async () => {
        try {
            const data = await fs.promises.readFile( ruta, 'utf-8');
            const productsArray = JSON.parse(data);
            return productsArray;
        } catch (error) {
            throw new Error (`Error de lectura ${error}`)
        }
    }
    class Contenedor  {
        constructor ( dato ) {
            this.dato = dato
        }

        getAll = async () => {
        const getProducts = await getProds();
            return getProducts;
        }
            
        save = async ( data ) => {
            if(!data.title || !data.price || !isNaN(data.title) || isNaN(data.price)) {
                throw new Error("Datos incorrectos");
            }
            const getProducts = await getProds();

            let id = 1;
                if(getProducts.length){
                    id = getProducts[getProducts.length-1].id +1
                }

            const prodNuevo = {
                title: data.title,
                price: data.price,
                id: id
            }
            
            getProducts.push(prodNuevo);
                await saveProds(getProducts);
                    return console.log(`Nueva fruta agregada con exito. La fruta es: ${prodNuevo.title}`);
        }
        getById = async (idBuscado) => {
            const getProducts = await getProds();
            const findIndice = getProducts.findIndex((fruit) => fruit.id === idBuscado);
                if( findIndice < 0) {
                    findIndice == null;
                    console.log("FIND ES NULL");
                };
                return getProducts[findIndice]
        }   
        deleteById = async (idBuscado) => {
            const getProducts = await getProds();
            const findIndice = getProducts.findIndex((fruit) => fruit.id === idBuscado);
            
                if( findIndice < 0) { // (1)
                    return; 
                } 
            
            getProducts.splice(findIndice, 1);
                await saveProds(getProducts);
                    
        }
        deleteAll = async () => {
            return await saveProds([]);
        }   
    }
    const contenedor = new Contenedor ('./main.json');
app.get( "/products", async (request, response) => { // (1)
    const products = await contenedor.getAll();
    const showProducts = products.map(( product ) => {
        return `Product: ${product.title}, Price: ${product.price}, ID: ${product.id}`
    })
    response.send( showProducts );
});


    const randomNumber = (min, max) => {
        return Math.floor( Math.random() * (max - min) + min );
    }
app.get( "/prod-random", async (request, response) => { // (1)
    const data = await fs.promises.readFile( ruta, 'utf-8');
            const productsArray = JSON.parse(data);

    const id = randomNumber( 1, productsArray.length + 1 ); // (2)
    const randomProduct = await contenedor.getById(id);
    const showRandomProduct = `Product: ${randomProduct.title}, Price: ${randomProduct.price}, ID: ${randomProduct.id}`
        
    response.send(showRandomProduct);
}); 

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("error", error => console.log(`Error en servidor: ${error}`));

