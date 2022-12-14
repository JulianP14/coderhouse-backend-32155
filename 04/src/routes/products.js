const { Router } = require ("express");
    const rutaProducts = Router();
const path = require ('path');

const filePath = path.resolve(__dirname, "../../products.json");
const fs = require ( 'fs/promises' );

rutaProducts.get("/", async (request, response) => { // Ver todos los prods
    try{
        const fileData = await fs.readFile( filePath, "utf-8" );
        const usuarios = JSON.parse( fileData );
    response.json({
        data: usuarios
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
        const usuarios = JSON.parse( fileData );

    const indice = usuarios.findIndex( usuario => usuario.id == id );
    if( indice < 0 ){
        return response.status(404).json({
            msg: "Fruta no existe"
        });
    };

    response.json({
        msg: `Devolviendo usuario con ID ${id}`,
        data: usuarios[indice]
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
        const usuarios = JSON.parse( fileData );

    const { title, price } = data;  //DESESTRUCTURACION
        if( !title || !price){ //(1)    // VALIDACION (PRIMERO SE VALIDA ANTES DE CREAR EL USUARIO)
            return response.status(400).json({
                msg: "Campos Invalidos"
            })
        }
    
    const nuevoUsuario = {
        title: title,
        price: price,
        // thumbnail,
        id: usuarios.length + 1
    }

    usuarios.push(nuevoUsuario);

    await fs.writeFile( filePath, JSON.stringify( usuarios ));

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
    const usuarios = JSON.parse( fileData );    
    const indice = usuarios.findIndex( usuario => usuario.id == id );

    if( indice < 0 ){
        return response.status(404).json({
            msg: "User not found"
        }); 
    };

    if( !title || !price || !thumbnail){ 
        return response.status(400).json({
            msg: "Campos Invalidos"
        })
    }

    
    const usuarioActualizado = {
        title,
        price,
        thumbnail,
        id: usuarios[indice].id // (1)
    }
    
    usuarios.splice(indice, 1, usuarioActualizado);
    
    await fs.writeFile( filePath, JSON.stringify( usuarios ));

    //Actualizar
    response.json({
        msg: `Modificando objeto con id ${id}`,
        data: usuarioActualizado,
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
    const usuarios = JSON.parse( fileData );

    const indice = usuarios.findIndex( usuario => usuario.id == id );
    if( indice < 0 ){
        return response.json({
            msg: `Devolviendo usuario con ID ${id}`,
            data: usuarios[indice]
        }); 
    };

    usuarios.splice(indice, 1);
    await fs.writeFile( filePath, JSON.stringify( usuarios, null, '\t' ));

        //Borrar
        response.json({
            msg: `Borrando objeto con id ${id}`,
        });
    } catch (error) {
        return response.status(404).json({
            msg: "Error", error
        });
    }     
        
        
});

module.exports = rutaProducts;