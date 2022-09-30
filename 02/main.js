const fs = require ("fs");
const path = require ("path");

const ruta = path.resolve(__dirname, "./fyh.txt");

const fecha = Date()

fs.writeFile( ruta, fecha, (err, data) => {
    if(err) console.log("ERROR", err.message);
    console.log("Fecha agregada correctamente");
    console.log(`La fecha es: ${fecha}`);
})