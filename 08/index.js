import ClientSql from "./sql.js";
import { options } from "./options/database.js";

const sql = new ClientSql(options);

const prods = [
    {name: "Camiseta A", code: "AA-11", price: "5000", stock: "30"},
    {name: "Camiseta B", code: "AB-12", price: "5000", stock: "30"},
    {name: "Camiseta C", code: "AC-13", price: "5000", stock: "30"},
    {name: "Camiseta D", code: "AD-14", price: "5000", stock: "30"},
    {name: "Camiseta E", code: "AE-14", price: "5000", stock: "30"}
];

const test = async () => {
    await sql.createTable();
        console.log("Tabla creada");

    await sql.insertProd(prods);
        console.log("Productos agregados");

    const allProds = await sql.getAll();
        console.log(allProds);

    await sql.deleteProdById(1);
        console.log(`Producto con ID ${1}, eliminado correctamente`);

    await sql.updateStockById(23, 1);
        console.log("Stock actualizado correctamente");

    sql.close();

}

test();