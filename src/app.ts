import express, {Express, NextFunction, Request, Response, Router} from 'express';
import bodyParser from 'body-parser';
import MainRoutes from "./routes/main-routes.js";

class App {

    private server: Express;

    public constructor() {

        this.server = express();

        this.server.use((req: Request, res: Response, next: NextFunction) => {

            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            res.setHeader('Access-Control-Allow-Methods', '*');

            next();

        });

        this.middlewares();

        this.routes();

    }

    private middlewares(): void {
        this.server.use(express.json());
        this.server.use(bodyParser.json());
    }

    private routes(): void {

        MainRoutes.forEach((route: Router) => {
            this.server.use(route);
        });

    }

    getServer(): Express {
        return this.server;
    }

}

export default new App().getServer()
