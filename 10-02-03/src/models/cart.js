import mongoose from "mongoose";
import { ProductsModel } from "./products.js";  

export const cartCollectionName = "carritos";

const cartsSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    timestamp: { type: String, required: true },
    products: { type: Array, required: true },
});

export const CartsModel = mongoose.model(cartCollectionName, cartsSchema);
