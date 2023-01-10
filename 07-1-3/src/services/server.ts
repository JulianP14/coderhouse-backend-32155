import express from "express";
import http from "http";
import rutaPrincipal from "../routes/index";
import createError from "http-errors";

const app = express(); 
const httpServer = new http.Server(app);
    app.use(express.json());   
    app.use(express.urlencoded({extended:true})); 
    app.use(express.static('public'));
    app.use("/api", rutaPrincipal); 
/*     app.use("/", rutaPages); */
    
    app.use((request, response, next) => {
        const route = request.path;        
        const method = request.method;
        next(createError(501, `route: "${route}", method: "${method}" no creada`));
    });

    app.use((error:{status: number; message: string; stack: string;},
    request: express.Request, response: express.Response, next: any) => {
        const status = error.status || 500;
        const message = error.message || "Internal Server Error";

        response.status(status).json({
            message,
            stack: error.stack
        });
    });

export default httpServer;

