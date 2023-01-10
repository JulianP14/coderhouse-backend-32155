const { Router } = require ("express");
    const rutaProducts = Router();  
const { ProdControl } = require("../../controllers/prodControl");
const { MgsControl } = require("../../controllers/mensajesProd");
const { getWsServer } = require("../../services/socket");

rutaProducts.get("/", async (request, response) => {
    const data = {
        prods: await ProdControl.getAll(),
        show: true,
        route: "/",
        msgs: await MgsControl.getAll()
    };
        if(!Array.isArray(data.prods) || data.prods.length === 0){
            data.show = false;
        }
    const wsServer = getWsServer();
        wsServer.emit("message", data);
        response.render("carga_vista", data); //Esto carga en el hbs
});

rutaProducts.post("/", async (request, response, next) => {
    try {
        const prod = request.body;
        const id = await ProdControl.save(prod);
        response.redirect("/")
    } catch (error) {
        next(error)
    };
});

module.exports = rutaProducts;


