const socketIo = require("socket.io");
const { ProdControl } = require("../controllers/prodControl");
const { MgsControl } = require ("../controllers/mensajesProd");
const moment = require("moment");
let io;

const initWsServer = (httpServer) => {
    io = socketIo(httpServer);
        io.on("connection", (socket) => {
            console.log("Nueva conexion establecida");
            
            socket.on("Producto Agregado", async (prod) => {
                console.log("Se agrega producto");
                await ProdControl.save(prod) 
                socket.broadcast.emit("Agregar Producto", (prod))
            });

            socket.on("Envio Mensaje", async (data) => {
                console.log("Cliente envia un mensaje");
                const now = moment().format("DD/MM/YYYY HH:mm:ss");
                data.fecha = now;
                
                // Save msg
                MgsControl.save(data); // CLASE DE PROD.

                // Send msd
                socket.broadcast.emit("Mensaje Recibido", (data));
            });
        });
        return io;
};

const getWsServer = () => {
    return io;
}

module.exports = { initWsServer, getWsServer };
