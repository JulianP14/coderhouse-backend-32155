import express from "express";
import mainRouter from "../routes/index.js";
import http from "http";

const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/api", mainRouter);

    app.use((request, response) => {
        return response.status(404).json({
            error: "Error",
            description: "Ruta no instanciada"
        });
    });

    app.use((error, response) => {
        return response.status(500).json({
            message: "Se encontro un problema inesperado en el servidor",
            error: error.message,
        });
    });

const httpServer = http.Server(app);

export default httpServer;