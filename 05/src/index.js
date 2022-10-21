const server = require ("./services/server"); // (1)
const port = 8080; // (2)

    server.listen(port, () => {
        console.log(`Servidor listo. Escuchando en el puerto ${port}`);
    });

    server.on("Error", (error) => {  // (3)
        console.log("Error en el servidor", error)
    });


/* 
(1) Importo el server que creo con la APP de EXPRESS
(2) Declaracion de un puerto p/ la funcionalidad
(3) En caso de recibir un error con la escucha del servidor y el puerto, retorno el error
*/
