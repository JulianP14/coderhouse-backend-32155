import mongoose from "mongoose";

const connectionString = process.env.MONGO_ATLAS || "mongodb://localhost:27017/ ";

export const initMongoDB = async () => {
    try {
        console.log("Intento de conexion a DB");
            console.log(connectionString);
        await mongoose.connect(connectionString);
            console.log("Conexion establecida")
    } catch (error) {
        return `Error: ${error}`
    };
};