import { CartsModel } from "../models/cart.js";
import { ProductsModel } from "../models/products.js";
import { validationResult } from "express-validator";
import { formatTimeStamp } from "../utils/format.js";

export const getProductsInCart = async (req, res) => {
    try {
        if (isNaN(req.params.id)) {
            return res.status(400).json({
                error: "El ID enviado no es valido.",
            });
        }
        const id = parseInt(req.params.id);
        const cart = await CartsModel.findById(id);
            if (!cart) {
                return res.status(404).json({
                    mensaje: "El carrito no fue encontrado.",
                });
            } else {
                return res.status(200).json({
                    data: cart,
                });
            }
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

export const createCart = async (req, res) => {
    try {
        let lastId = findLastId();
        lastId + 1;
        let timestamp = formatTimeStamp();
        let products = [];

        await CartsModel.create({
            lastId,
            timestamp,
            products,
        });

        return res.status(201).json({
            mensaje: `Carrito ${lastId} creado con exito.`,
        });
    } catch (error) {
        return res.status(500).json({
            error: err.message,
            stack: err.stack,
        });
    }
};

export const addProductsToCart = async (req, res) => {
    try {
        if (isNaN(req.params.id)) {
            return res.status(400).json({
                error: "El ID enviado no es valido.",
            });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        const cartId = parseInt(req.params.id);
        const productId = parseInt(req.body.id);

        let cart = await CartsModel.findById(cartId);

        if (!cart) {
            return res.status(404).json({
                mensaje: "El carrito no fue encontrado.",
            });
        }

        let product = await ProductsModel.findById(productId);

        if (!product) {
            return res.status(404).json({
                mensaje: "El producto no existe",
            });
        } else {
            const productAddedToCart = await CartsModel.findByIdAndUpdate(
                cart._id,
                { product },
                { new: true }
            );

            return res.status(201).json({
                mensaje: "Producto agregado al carrito con exito",
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

export const deleteCartById = async (req, res) => {
    try {
        if (isNaN(req.params.id)) {
            return res.status(400).json({
                error: "El ID enviado no es valido.",
            });
        }
        const id = parseInt(req.params.id);
        let cart = await CartsModel.findById(id);

        if (!cart) {
            return res.status(404).json({
                mensaje: "El carrito no existe",
            });
        } else {
            await CartsModel.findByIdAndDelete(id);
            return res.status(200).json({
                mensaje: "Carrito eliminado con exito",
            });
        }
    } catch (error) {
        res.status(500).json({
            error: err.message,
            stack: err.stack,
        });
    }
};

export const deleteProductInCartById = async (req, res) => {
    try {
        if (isNaN(req.params.id) || isNaN(req.params.id_prod)) {
            return res.status(400).json({
                error: "Los parametros enviados son invalidos",
            });
        }
        const cartId = parseInt(req.params.id);
        const productId = parseInt(req.params.id_prod);

        let cart = await CartsModel.findById(cartId);

        if (!cart) {
            return res.status(404).json({
                mensaje: "El carrito no existe",
            });
        }

        let product = await CartsModel.find({
            products: {
                id: cartId,
            },
        });

        if (!product) {
            return res.status(404).json({
                mensaje: "El producto no existe",
            });
        } else {
            const productAddedToCart = await CartsModel.findByIdAndDelete(cart._id, {
                product,
            });

            return res.status(201).json({
                mensaje: "Producto eliminado del carrito con exito",
            });
        }
    } catch (error) {
        res.status(500).json({
            error: err.message,
            stack: err.stack,
        });
    }
};

const findLastId = async () => {
    let lastDocument = await CartsModel.sort({ id: -1 }).limit(1);
    let lastId = lastDocument.id;
    return lastId;
};

export default router;
