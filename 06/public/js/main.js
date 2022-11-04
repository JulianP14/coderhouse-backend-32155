window.addEventListener("load", () => {

const form = document.getElementById("form");
const tabla = document.querySelector('#tablaBody');
const formChat = document.querySelector("#chat-form");
const tablaChat = document.querySelector('#tabla-chat');
//contenidoCarga

const socket = io();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const [titleFormSubmit, priceFormSubmit, thumbnailFormSubmit] = document.querySelectorAll(".formProd"); //contenidoCarga
    const prod = {
        title: titleFormSubmit.value,
        price: priceFormSubmit.value,
        thumbnail: thumbnailFormSubmit.value
    };

    addProdToTable(prod);
    socket.emit("Producto Agregado", prod);
    form.reset();
});
 
socket.on("Agregar Producto", (dataProd) => {
    addProdToTable(dataProd);
});

const addProdToTable = (prod) => {
    const table = document.createElement("ul");
        table.innerHTML = `
            <td>${prod.title}</td>
            <td>${prod.price}</td>
            <td><img src="${prod.thumbnail}" width="50" heigth="50"></td>
        `;
        tabla/* Ver arribeconexion al dom */.appendChild(table);
}

formChat.addEventListener("submit", (e) => { //contenidoCarga
    e.preventDefault();
    console.log("Hola");
    const [userFormSubmit, messageForm] = document.querySelectorAll(".form-chat"); //chat.hbs
    const userData = {
        user: userFormSubmit.value,
        msg: messageForm.value
    };

    socket.emit("Envio Mensaje", userData);
        userData.fecha = " " + moment().format("DD/MM/YYYY HH:mm:ss");
        addMessage(userData);
        messageForm.value = null;
});

socket.on("Mensaje Recibido", (data) => {
    addMessage(data);
});

const addMessage = (data) => {
    const div = document.createElement("div");
    div.className += "message";
    div.innerHTML = `
        <p>${data.user}, ${data.fecha}</p>
        <p>${data.msg}</p>
    `;
    tablaChat.appendChild(div);
}
})
