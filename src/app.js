import express from 'express';
import bodyParser from 'body-parser';
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
        this.server.use(bodyParser.json());
    }
    routes() {
        MainRoutes.forEach((route) => {
            this.server.use(route);
        });
    }
    getServer() {
        return this.server;
    }
}
export default new App().getServer();
