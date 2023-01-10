// ACTIVIDAD EN CLASE
    const fs = require ("fs");
    const path = require ("path");
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
    });
