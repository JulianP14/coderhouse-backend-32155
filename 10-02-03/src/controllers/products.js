import { ProductsModel } from "../models/products.js";
import { validationResult } from "express-validator";
import { formatTime } from "../utils/format.js";

export const getAllProducts = async (req, res) => {
    try {
        let products = await ProductsModel.find();
        res.status(200).json({
            data: products,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        if (isNaN(req.params.id)) {
            return res.status(400).json({
                error: "El ID enviado no es valido.",
            });
        }
        const id = parseInt(req.params.id);
        let product = await ProductsModel.findById(id);
        if (!product) {
            return res.status(404).json({
                mensaje: "El producto no existe.",
            });
        } else {
            return res.status(200).json({
                data: product,
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, code, photo, value, stock } = req.body;

        let lastId = findLastId();
        lastId + 1;
        let timestamp = formatTime();

        const newProduct = await ProductsModel.create({
            lastId,
            timestamp,
            title,
            description,
            code,
            photo,
            value,
            stock,
        });
        return res.status(201).json({
            data: newProduct,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

export const updateProductById = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        if (isNaN(req.params.id)) {
            return res.status(400).json({
                error: "El ID enviado no es valido.",
            });
        }

        const id = parseInt(req.params.id);
        const { title, description, code, photo, value, stock } = req.body;

        let product = await ProductsModel.findById(id);

        if (!product) {
            return res.status(404).json({
                mensaje: "El producto no existe",
            });
        } else {
            const productUpdated = await ProductsModel.findByIdAndUpdate(
                id,
                { title, description, code, photo, value, stock },
                { new: true }
            );
            return res.status(200).json({
                mensaje: "El producto fue actualizado con exito.",
                data: productUpdated,
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

export const deleteProductById = async (req, res) => {
    try {
        if (isNaN(req.params.id)) {
            return res.status(400).json({
                error: "El ID enviado no es valido.",
            });
        }
        const id = parseInt(req.params.id);

        let product = await ProductsModel.findById(id);

        if (!product) {
            return res.status(404).json({
                mensaje: "El producto no existe.",
            });
        } else {
            await ProductsModel.findByIdAndDelete(id);
            return res.status(200).json({
                mensaje: "Producto eliminado con exito.",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

export const findLastId = async () => {
    let lastDocument = await ProductsModel.sort({ id: -1 }).limit(1);
    let lastId = lastDocument.id;
    return lastId;
};


