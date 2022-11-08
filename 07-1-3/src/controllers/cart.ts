import fs from "fs";
import createError from "http-errors";
import { typeCart, typeProd } from "../utils/types/types";
import { ProdControl } from "../controllers/prodControl"

class Cart {
    private archivo: string;
    
    public constructor(nombreArchivo: string){
        this.archivo = nombreArchivo;
    };

    public async getAll() {
        const result: string = await fs.promises.readFile(`./${this.archivo}`, "utf-8") || "[]";
        const resultParsed: typeCart[] = JSON.parse(result);
        return resultParsed;
    };

    async writeFile(text: string){
        try {
            await fs.promises.writeFile(`./${this.archivo}`, text)
        } catch (error) {
            throw createError(500, "Error guardando el archivo")
        };
    };

    async createCart() {
        const carts: typeCart[] = await this.getAll(); 
        const id: number = carts.length !== 0 ? carts[carts.length - 1].id +1 : 1;
        let cart: typeCart = {
            id: id,
            timestamp: new Date(),
            prods: []
        };
        carts.push(cart);

        await this.writeFile(JSON.stringify(carts));
        return id;
    };

    async findIdByIndex(id: number, carts: typeCart[]) {
        const index = carts.findIndex((cart) => cart.id == id);
            if(index < 0) {
                throw createError(404, "El carrito no existe");
            };
            return index;
    };

    async findByIdAndDelete(id: number) {
        const carts: typeCart[] = await this.getAll();
        const index: number = await this.findIdByIndex(id, carts);
        carts.splice(index, 1);
    
        await this.writeFile(JSON.stringify(carts, null, 2));
    };

    async getById(id: number) {
        const carts: typeCart[] = await this.getAll();
        const index: number = await this.findIdByIndex(id, carts);
        return carts[index].prods;
    };

    checkIdProd(idProd: number){
        if(!idProd){ 
            throw createError(400, "ID de producto no fue especificado");
        };
        if(typeof idProd !== "number"){
            throw createError(400, "ID de producto no es valido. Debe ser numerico.")
        };
    };

    async addProdById(id: number, idProd: number){ 
        this.checkIdProd(idProd);
        const carts: typeCart[] = await this.getAll();
        const index: number = await this.findIdByIndex(id, carts);
        const prod: typeProd = await ProdControl.getById(idProd);
        carts[index].prods.push(prod);
        await this.writeFile(JSON.stringify(carts, null, 2)); 
    };

    async deleteProdById(id:number, idProd: number){
        this.checkIdProd(idProd);
        const carts: typeCart[] = await this.getAll();
        const indexCart: number = await this.findIdByIndex(id, carts);
        const indexProd: number = carts[indexCart].prods.findIndex((prod) => prod.id == idProd);
            if(indexProd == -1){
                throw createError(400, "El producto ingresado no esta en el carrito");
            };
        carts[indexCart].prods.splice(indexProd, 1);
        await this.writeFile(JSON.stringify(carts, null, 2));
    };
};

export const cartController = new Cart ("data/cart.json")

