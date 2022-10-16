const server = require ("./services/server"); // (1)
const port = 8080;

server.listen( port, () => {
    console.log( `Servidor listo. Escuchando en el puerto ${port}`);
});

server.on("Error", (error) => { 
    console.log("Error en el servidor", error)
});

// (1) Se importa el server (que es una APP de EXPRESS). Este Server trabaja con el manejador de rutas principal (el "index.js" de la carpeta "routes")