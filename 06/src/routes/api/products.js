const { Router } = require ("express");
    const rutaProducts = Router();
const { ProdControl } = require("../../controllers/prodControl");

rutaProducts.get("/", async (request, response) => {
    response.json({
        msg: await ProdControl.getAll()
    });
});

rutaProducts.get("/:id", async (request, response, next) => {
    try{
        const id = request.params.id;
        const prod = await ProdControl.getById(id);

        response.json({
            msg: prod
        });

    } catch (error) {
        next(error)
    };
});

rutaProducts.post("/", async ( request, response, next) => {
    try {
        const prod = request.body;
        const id = await ProdControl.save(prod);

        response.json({
            id: id,
            msg: "Producto agregado correctamente"
        });
    } catch (error) {
        next(error)
    };
});

rutaProducts.put("/:id", async ( request, response, next) => {
    try {
        const id = request.params.id;
        const prod = request.body;
        await ProdControl.findByIdAndUptade(id, prod);
        response.json({
            msg: 'Producto actualizado correctamente'
        });
    } catch (error) {
        next(error);
    };
});

rutaProducts.delete("/:id", async ( request, response, next) => {
    try {
        const id = request.params.id;
        await ProdControl.findByIdAndDelete(id);
        response.json({
            msg: 'Producto eliminado correctamente'
        });
    } catch (error) {
        next(error);
    };
});

module.exports = rutaProducts;

