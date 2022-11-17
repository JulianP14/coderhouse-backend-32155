const fs = require('fs');
const createError = require('http-errors');

class Products {
    constructor (nombreArchivo) {
        this.archivo = nombreArchivo;
    }

    addId(prods) {
        for (let i = 0; i < prods.length; i++){
            prods[i].id = i + 1;
        }
        return prods;
    };

    checkProd(prod) {
        if (typeof prod.price == "string"){
            prod.price = parseFloat(prod.price);
        }
        if (!prod.title || !prod.price || !prod.thumbnail || typeof prod.title !== "string" || typeof prod.price !== "number" || typeof prod.thumbnail !== "string") {
            throw createError (400, "Error en los datos");
        };
    };

    findId(id, prods) {
        const find = prods.findIndex((prod) => prod.id == id);
        if (find < 0) {
            throw createError( 404, "El producto no tiene stock o no existe");
        };
        return find;
    };

    async writtingFile (data) {
        try {
        //Borrar los id antes de guardar en el .json
            data.forEach( prod => {
                delete prod.id                
            });
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(data, null, 2));
        } catch (error) {
            throw createError( 500, "Error al guardar el archivo");
        };
    };

    async getAll() {
        const data = await fs.promises.readFile(`./${this.archivo}`, "utf-8");
            const dataParsed = JSON.parse(data)
        return this.addId(dataParsed);
    };

    async getById(id) {
        const prods = await this.getAll();
        const index = this.findId(id, prods);

        return prods[index];
    };

    async save(prod) {
        this.checkProd(prod);

        const prods = await this.getAll();
        const id = prods[prods.length - 1].id + 1;
        prod.id = id;
        prods.push(prod);

        await this.writtingFile(prods);
        return id;
    };

    async findByIdAndUptade(id, prod) {
        const prods = await this.getAll();
        const index = this.findId(id, prods);
        prods[index].title = prod.title || prods[index].title;
        prods[index].price = prod.price || prods[index].price;
        prods[index].thumbnail = prod.thumbnail || prods[index].thumbnail;

        await this.writtingFile(prods);
    };

    async findByIdAndDelete(id) {
        const prods = await this.getAll();
        const index = this.findId(id, prods);
        prods.splice(index, 1);

        await this.writtingFile(prods);
    };

}

const instanciarProds = new Products ("src/data/products.json");

module.exports = { ProdControl: instanciarProds };