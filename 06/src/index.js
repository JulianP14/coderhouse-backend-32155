const server = require("./services/server");
const port = 8080;

server.listen(port, () => {
    console.log(`Servidor listo. Escuchando en el puerto ${port}`);
});

server.on("Error", (error) => {
    console.log(`Error en el servidor ${error}`);
});