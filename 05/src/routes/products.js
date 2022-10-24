const { Router } = require ("express");
    const rutaProducts = Router();
const path = require ('path');

const filePath = path.resolve(__dirname, "../../products.json");
const fs = require ( 'fs/promises' );

rutaProducts.get("/", async (request, response) => { // Ver todos los prods
    try{
        const fileData = await fs.readFile( filePath, "utf-8" );
        const prods = JSON.parse( fileData );
    response.json({
        data: prods
    });

    } catch (error) {
        return response.status(404).json({
            msg: "Error", error
        });
    }
});

rutaProducts.get("/:id", async (request, response) => { // Ver un prod especfico
    try {
        const id = request.params.id;
        
    const fileData = await fs.readFile( filePath, "utf-8" );
        const prods = JSON.parse( fileData );

    const indice = prods.findIndex( usuario => usuario.id == id );
    if( indice < 0 ){
        return response.status(404).json({
            msg: "Producto no existe"
        });
    };

    response.json({
        msg: `Devolviendo producto con ID ${id}`,
        data: prods[indice]
    });

    } catch (error) {
        return response.status(404).json({
            msg: "Error", error
        });
    }
});

rutaProducts.post("/", async (request, response) => { // Crear prod
    try {
        const data = request.body;
        console.log(data);

    const fileData = await fs.readFile( filePath, "utf-8" );
        const prods = JSON.parse( fileData );

    const { title, price } = data;  //DESESTRUCTURACION
        if( !title || !price){ //(1)    // VALIDACION (PRIMERO SE VALIDA ANTES DE CREAR EL USUARIO)
            return response.status(400).json({
                msg: "Campos Invalidos"
            })
        }
    
    const newProd = {
        title: title,
        price: price,
        // thumbnail,
        id: prods.length + 1
    }

    prods.push(newProd);

    await fs.writeFile( filePath, JSON.stringify( prods ));

    response.json({
        msg: "ok"
    });

    } catch (error) {
        return response.status(404).json({
            msg: "Error", error
        });
    }
})

rutaProducts.put("/:id", async (request, response) => { // Modificar prod // (2)
    try {
        const id = request.params.id;
    const { title, price, thumbnail } = request.body;
    
    const fileData = await fs.readFile( filePath, "utf-8" );
    const prod = JSON.parse( fileData );    
    const indice = prod.findIndex( prod => prod.id == id );

    if( indice < 0 ){
        return response.status(404).json({
            msg: "Product not found"
        }); 
    };

    if( !title || !price || !thumbnail){ 
        return response.status(400).json({
            msg: "Campos Invalidos"
        })
    }

    
    const prodUpdated = {
        title,
        price,
        thumbnail,
        id: prod[indice].id // (1)
    }
    
    prod.splice(indice, 1, prodUpdated);
    
    await fs.writeFile( filePath, JSON.stringify( prod ));

    //Actualizar
    response.json({
        msg: `Modificando producto con id ${id}`,
        data: prodUpdated,
    })

    } catch (error) {
        return response.status(404).json({
            msg: "Error", error
        });
    }
});

rutaProducts.delete("/:id", async (request, response) => { // Borrar prod
    try {
        const id = request.params.id;
    const fileData = await fs.readFile( filePath, "utf-8" );
    const prod = JSON.parse( fileData );

    const indice = prod.findIndex( usuario => usuario.id == id );
    if( indice < 0 ){
        return response.json({
            msg: `Devolviendo usuario con ID ${id}`,
            data: prod[indice]
        }); 
    };

    prod.splice(indice, 1);
    await fs.writeFile( filePath, JSON.stringify( prod, null, '\t' ));

        //Borrar
        response.json({
            msg: `Borrando producto con id ${id}`,
        });
    } catch (error) {
        return response.status(404).json({
            msg: "Error", error
        });
    }     
        
        
});

module.exports = rutaProducts;