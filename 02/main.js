// ACTIVIDAD EN CLASE
    const fs = require ("fs");
    const path = require ("path");
/*
    const ruta = path.resolve(__dirname, "./fyh.txt");
    const fecha = Date()

    fs.writeFile( ruta, fecha, (err, data) => {
        if(err) console.log("ERROR ESCRITURA", err.message);
        console.log("Fecha agregada correctamente");
        // console.log(`La fecha es: ${fecha}`);

        fs.readFile( ruta, "utf-8", (err, data) => {
            if( err ) console.log("ERROR LECTURA", err.message);
            console.log(data);
        })
    }); */

// ENTREGABLE 02

const ruta2 = path.resolve( __dirname, "./main.txt");

const products = [
    prod1 = {
        title: "Banana",
        price: 150,
        id: 1
    },
    prod2 = {
        title: "Manzana",
        price: 175,
        id: 2
    },
    prod3 = {
        title: "Naranja",
        price: 120,
        id: 3
    }
]

class Contenedor {
    constructor (save, getById, getAll, deleteById, deleteAll) {
        this.save = save,
        this.getById = getById,
        this.getAll = getAll,
        this.deleteById = deleteById,
        this.deleteAll = deleteAll
    }

    getSave (products) {
        fs.writeFile( ruta2, JSON.stringify(products), (err, data) => {
            if (err) console.log("ERROR ESCRITURA", err.message);
            console.log("OK")
            fs.readFile( ruta2, 'utf-8', (err, data) => {
                if( err ) console.log("ERROR LECTURA", err.message);
                console.log(data.prod1)
            })
        })
    }
}


    fs.writeFile( ruta2, JSON.stringify(products), (err, data) => {
        if (err) console.log("ERROR ESCRITURA", err.message);
        console.log("OK")
        fs.readFile( ruta2, 'utf-8', (err, data) => {
            if( err ) console.log("ERROR LECTURA", err.message);
            let dataString = JSON.parse(data);
            console.log(dataString.title)
               /*  data.forEach((prod) => {
                    return console.log(prod)
                }) */
        })
    })
