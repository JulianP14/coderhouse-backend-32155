import mongoose from "mongoose";

export const authorsCollectionName = "authors";

export const authorsSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: String, required: true },
    aka: { type: String, required: true },
    avatar: { type: String, required: true },
});

export const ProductsModel = mongoose.model(authorsCollectionName, authorsSchema);
