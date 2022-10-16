const { Router } = require ("express");
    const rutaProducts = Router();
const path = require ('path');

const filePath = path.resolve(__dirname, "../../products.json");
const fs = require ( 'fs/promises' );

rutaProducts.get("/", async (request, response) => { // Ver todos los prods
    const fileData = await fs.readFile( filePath, "utf-8" );
        const usuarios = JSON.parse( fileData );
    response.json({
        data: usuarios
    });
});

rutaProducts.get("/:id", async (request, response) => { // Ver un prod especfico
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
});

rutaProducts.post("/", async (request, response) => { // Crear prod
    const data = request.body;
    console.log(data);

    const { title, price, thumbnail, id } = data;  //DESESTRUCTURACION
        if( !title || !price || !thumbnail || !id ){ //(1)    // VALIDACION (PRIMERO SE VALIDA ANTES DE CREAR EL USUARIO)
            return response.status(400).json({
                msg: "Campos Invalidos"
            })
        }

    const nuevoUsuario = {
        title,
        price,
        thumbnail,
        id
    }


    const fileData = await fs.readFile( filePath, "utf-8" );
        const usuarios = JSON.parse( fileData );
    usuarios.push(nuevoUsuario);

    await fs.writeFile( filePath, JSON.stringify( usuarios ));

    response.json({
        msg: "ok"
    })
})

rutaProducts.put("/:id", async (request, response) => { // Modificar prod // (2)
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

    //Actualizar
    response.json({
        msg: `Modificando objeto con id ${id}`,
        data: usuarioActualizado,
    })
});

rutaProducts.delete("/:id", async (request, response) => { // Borrar prod
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
});

module.exports = rutaProducts;