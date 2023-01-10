import fs from "fs";
import createError from "http-errors";
import { typeProd } from "../utils/types/types";
import { v4 as uuidv4 } from 'uuid';

class Products {
    private archivo: string;
        public constructor(nombreArchivo: string) {
        this.archivo = nombreArchivo;
    };

    public async getAll(){
        const result: string = await fs.promises.readFile(`./${this.archivo}`, "utf-8") || "[]"; // En caso de que el archivo este vacio
        const resultParsed: typeProd[] = JSON.parse(result);
        return resultParsed;
    };

    async writeFile(text: string) {
        try {
            await fs.promises.writeFile(`./${this.archivo}`, text);
        } catch (error) {
            throw createError(500, "Error del servidor al guardar el archivo");
        };
    };

    findIdByIndex(id: number, products: typeProd[]){
        const index = products.findIndex((prod) => prod.id == id);
            if(index < 0){
                throw createError(404, "El producto no existe");
            };
            return index;
    };

    async getById(id: number){
        const prods :typeProd[] = await this.getAll();
        const index = this.findIdByIndex(id, prods);
        return prods[index];
    };

    checkProd(p: typeProd){
        if(!p.title || !p.description || !p.photo || !p.price|| !p.stock || typeof p.title !=="string" || typeof p.description !=="string" || typeof p.photo !== "string" || typeof p.price !=="number" || typeof p.stock !=="number"){ 
            throw createError(400, "Revisar los datos proporcionados")
        }
    }

    async save(prod: typeProd) {
        this.checkProd(prod);
        const prods: typeProd[] = await this.getAll();
        const id: number = prods.length !== 0 ? prods[prods.length -1].id + 1 : 1;
        prod.id = id;
        prod.code = uuidv4() ;
        prod.timestamp = new Date();
        prods.push(prod);

        await this.writeFile(JSON.stringify(prods, null, 2));
        return id;
    };

    async findByIdAndUpdate(id: number, prod: typeProd){
        const prods: typeProd[] = await this.getAll();
        const index: number = this.findIdByIndex(id, prods);
        prods[index].id = prod.id || prods[index].id;
        prods[index].timestamp = prod.timestamp || prods[index].timestamp;
        prods[index].title = prod.title || prods[index].title;
        prods[index].description = prod.description || prods[index].description;
        prods[index].code = prod.code || prods[index].code;
        prods[index].photo = prod.photo || prods[index].photo;
        prods[index].price = prod.price || prods[index].price;
        prods[index].stock = prod.stock || prods[index].stock;

        this.checkProd(prods[index]);
        await this.writeFile(JSON.stringify(prods, null, 2));
    };

    async findByIdAndDelete(id: number){
        const prods: typeProd[] = await this.getAll();
        const index: number = this.findIdByIndex(id, prods);
        prods.splice(index, 1);

        await this.writeFile(JSON.stringify(prods, null, 2));
    };
}
export const ProdControl = new Products("data/products.json");

    