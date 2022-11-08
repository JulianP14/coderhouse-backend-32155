import { Router, Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { ProdControl } from "../controllers/prodControl";
import { typeProd } from "../utils/types/types";

const rutaProducts = Router();
const admin: boolean = false; 

const checkAdmin = (admin:boolean, route:string, method:string) => {
    if(admin == false){
        throw createError(401, `EROR 401. Ruta: ${route}, Method: ${method}. No autorizados`);
    };
};

rutaProducts.get("/", async (request: Request, response: Response) => {
    response.json({
        msg: await ProdControl.getAll()
    });
});

rutaProducts.get("/:id", async (request: Request, response: Response, next: NextFunction) => {
    try{
        const id: number = parseInt(request.params.id);
        const prod = await ProdControl.getById(id);
        response.json({
            msg: prod
        });

    } catch (error) {
        next(error)
    };
});

rutaProducts.post("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        checkAdmin(admin, request.path, request.method);
        const prod: typeProd = request.body;
        const id: number = await ProdControl.save(prod);

        response.json({
            id: `ID designado para el nuevo producto: ${id}`,
            msg: "Producto agregado correctamente"
        });
    } catch (error) {
        next(error)
    };
});

rutaProducts.put("/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        checkAdmin(admin, request.path, request.method);
        const id: number = parseInt(request.params.id);
        const prod: typeProd = request.body;
        await ProdControl.findByIdAndUpdate(id, prod);
        response.json({
            msg: 'Producto actualizado correctamente'
        });
    } catch (error) {
        next(error);
    };
});

rutaProducts.delete("/:id", async ( request, response, next) => {
    try {
        checkAdmin(admin, request.path, request.method);
        const id: number = parseInt(request.params.id);
        await ProdControl.findByIdAndDelete(id);
        response.json({
            msg: 'Producto eliminado correctamente'
        });
    } catch (error) {
        next(error);
    };
});

export default rutaProducts;

