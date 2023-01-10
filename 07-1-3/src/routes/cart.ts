import {Router, Request, Response, NextFunction} from "express";
import { cartController } from "../controllers/cart";

const rutaPrincipal = Router();

rutaPrincipal.post("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id: number = await cartController.createCart();
        response.json({
            msg: `Carrito creado exitosamente. El ID asignado para el mismo es ${id}`
        }); 
    } catch (error) {
        next(error);
    };
});

rutaPrincipal.delete("/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id: number = parseInt(request.params.id);
        await cartController.findByIdAndDelete(id);
        response.json({
            msg: "El carrito fue eliminado correctamente"
        });
    } catch (error) {
        next(error)
    }
});

rutaPrincipal.get("/:id/products", async (request: Request, response: Response, next: NextFunction) => {
    const id: number = parseInt(request.params.id);
    const prod = await cartController.getById(id);
    response.json({
        msg: prod
    });
});

rutaPrincipal.post("/:id/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id: number = parseInt(request.params.id);
        const idProd: number = request.body.id;
        await cartController.addProdById(id, idProd);
        response.json({
            msg: "Producto agregado al carrito exitosamente"
        });
    } catch (error) {
        next(error);
    }
});

rutaPrincipal.delete("/:id/products/:id_prod", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id: number = parseInt(request.params.id);
        const idProduct: number = parseInt(request.params.id_prod);
        await cartController.deleteProdById(id, idProduct);
        response.json({
            msg: "Producto eliminado del carrito exitosamente"
        });
    } catch (error) {
        next(error);
    }
});

export default rutaPrincipal;