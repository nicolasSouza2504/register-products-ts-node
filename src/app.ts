import express, {Router} from 'express';
import MainRoutes from "./routes/mainRoutes.js";

class App {

    server: express.Express;

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

        MainRoutes.forEach((route: Router) => {
            this.server.use(route);
        });

    }

}

export default new App().server
