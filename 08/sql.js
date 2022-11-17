import knex from "knex";

class ClientSql {
    constructor(config){
        this.knex = knex(config);
    }

    async createTable() {
        await this.knex.schema.dropTableIfExists("products"); 
        await this.knex.schema.createTable("products", table => {
            table.increments("id").primary();
            table.string("name", 50).notNullable();
            table.string("code", 100).notNullable();
            table.integer("price");
            table.integer("stock");
        });
    };
    
    async getAll() {
        return await this.knex.from("products").select("*");
        //Esto es lo que se hizo en la clase 15 escribiendo en el MYSQL Workbench para que seleccione todo lo de una tabla
    };

    async insertProd(prod) {
        await this.knex("products").insert(prod);
        //insert into ecommerce with...
    };

    async deleteProdById(id) {
        await this.knex.from("products").where("id", id).del();

        //delete from ... where ...
    };

    async updateStockById(stock, id){
        await this.knex.from("products").where("id", id).update({stock: stock});

        //update ... set ... where ...
    };

    async close(){
        await this.knex.destroy();

        //Cierra la base de datos
    };
};

export default ClientSql;