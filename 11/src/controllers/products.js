import { createProductsMock } from "../utils/productsMock.js";

export const getAllProducts = async (request, response) => {
    try {
        response.status(200).json({
            data: createProductsMock(5),
        });
    } catch (error) {
        return response.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};
