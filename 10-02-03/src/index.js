import "dotenv/config";
import Server from "./services/server.js";
import { initMongoDB } from "./services/database.js";

const init = async () => {
    await initMongoDB();
    const port = process.env.PORT || 8080;

    Server.listen(port, () => {
        console.log(`Server ready on port ${port}`);
    });

    Server.on("error", (error) => {
        console.log("Error en el servidor", error)
    });
};

init();