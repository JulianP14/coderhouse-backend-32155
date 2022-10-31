const socketio = io()
const socket = io.connect(); // El cliente se conecta al servidor mediante el tunel

const form = document.getElementById("form");
const inputProd = document.getElementById("inputProd");
const inputPrice = document.getElementById("inputPrice");

const inputSubmit = document.getElementById("inputSubmit"); 

const { username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true,})



inputSubmit.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log("Hola")
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const infoParaElServer = {
        prod: inputProd.value,
        price: inputPrice.value
    }
    console.log("Esta info va para el server")
    console.log((infoParaElServer));

    socket.emit("Producto creado:", infoParaElServer);

})

socket.on("Respuesta", (data) => {
    console.log(`El server me respondio con ${JSON.stringify(data)}`);
});
