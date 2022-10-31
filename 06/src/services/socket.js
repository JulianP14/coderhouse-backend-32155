const io = require("socket.io");
const webSocketServer = io(httpServer);
const path = require("path");
const formatMsg = require("../utils/message");
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require("../utils/users");

webSocketServer.on("connection", async (socket) =>  {
    console.log("Se acaba de conectar un cliente");
    console.log("ID SOCKET SERVER:", socket.id);
    console.log("ID SOCKET CLIENT:", socket.client.id);


    const filePath = path.resolve(__dirname, "../../products.json");
    const fs = require ( 'fs/promises' );
    const fileData = await fs.readFile( filePath, "utf-8" ); 
        const prods = JSON.parse(fileData);

    
    socket.on("Producto creado:",(data) => {
        console.log(`El cliente ${socket.client.id} me mando un mensaje:`);
        console.log(data);
    socket.emit("Respuesta", { recibido: "ok" })

    socket.emit("Envio de datos", prods )
    }) //1.32

/////////////////// En proceso ////////////////////////

    /* SOCKET PARA CHAT */
    socket.on("joinRoom", ({ username, room }) => {
        const user = userJoin( socket.id, username, room );
        socket.join(user.room);

        //Sal. new user
        socket.emit("message", formatMsg("Bienvenido"));

        //Broadcast user se conecta
        socket.broadcast.to(user.room).emit("message",formatMsg(`${user.username} se ha unido`));

        // Envia info del usuario y room
        io.to(user.room).emit("roomUsers",{room: user.room, users: getRoomUsers(user.room)})

    });

        // Escucha mensaje
    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit("message", formatMsg(user.username, msg));
    });

        // Escucha desconexion cliente
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);
            if(user) {
                io.to(user.room).emit("message", formatMsg(`${user.username} se ha ido del chat`));
            };

        io.to(user.room).emit("roomUsers",{room: user.room, users: getRoomUsers(user.room)})
    })

});