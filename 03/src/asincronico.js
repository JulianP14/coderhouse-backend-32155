
/////////////////           ENTREGABLE 03          ////////////////
const fs = require ("fs");
const path = require ("path");
const ruta = path.resolve( __dirname, "./main.json");

const getProds = async () => {
    try {
        const data = await fs.promises.readFile( ruta, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error (`Error de lectura ${error}`)
    }
}

const saveProds = async (products) => {
    try{
        const data = JSON.stringify(products, null, '\t')
        await fs.promises.writeFile( ruta, data )
    } catch (error) {
        throw new Error (`Error de escritura ${error}`)
    }
} 

class Contenedor  {
    constructor ( dato ) {
        this.dato = dato
    }

    // 1) getAll() (sincro) ==> MOSTRAR EL []
    getAll = async () => {
    const getProducts = await getProds();
        // return console.log(getProducts);
        return getProducts;
    }
        
    // 2) save() ==> GUARDA UN {} EN EL []
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
    // 3) getById() (sincro) ==> MOSTRAR UN {} DEL [] EN BASE AL ID
    getById = async (idBuscado) => {
        const getProducts = await getProds();
        const findIndice = getProducts.findIndex((fruit) => fruit.id === idBuscado);
            if( findIndice < 0) {
                findIndice == null;
                console.log("FIND ES NULL");
            };
            return getProducts[findIndice]
    }   
    // 4) deleteById() ==> Borrar elemento del [] por id (Usar metodo SPLICE)
    deleteById = async (idBuscado) => {
        const getProducts = await getProds();
        const findIndice = getProducts.findIndex((fruit) => fruit.id === idBuscado);
        /* 
            if( findIndice < 0) { // (1)
                return; 
            } 
        */
        getProducts.splice(findIndice, 1);
            await saveProds(getProducts);
                
    }
    // 5) deleteAll()
    deleteAll = async () => {
        return await saveProds([]);
    }   
}

const contenedor = new Contenedor ('src/main.json');

const mainFunction = async () => {
    const newFruit = {
        title: "Kiwi",
        price: "500",
    };
    await contenedor.save( newFruit );
        console.log("1. Funciona");

    console.log( await contenedor.getById(2) );
        console.log("2. Funciona");

    console.log(await contenedor.getAll());
        console.log("3. Funciona");

    await contenedor.deleteById(4);
        console.log("4. Funciona");

    /* await contenedor.deleteAll();
        console.log("5. Funciona"); */
}

mainFunction()

