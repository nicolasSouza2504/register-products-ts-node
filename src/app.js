import express from 'express';
import MainRoutes from "./routes/mainRoutes.js";
class App {
    server;
    constructor() {
        this.server = express();
        this.server.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.server.use(express.json());
    }
    routes() {
        MainRoutes.forEach((route) => {
            this.server.use(route);
        });
    }
}
export default new App().server;
