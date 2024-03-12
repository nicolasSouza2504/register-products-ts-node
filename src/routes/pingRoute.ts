import express, {Request, Response, Router} from "express";

const routes:Router = express.Router();

routes.get("/ping", (req: Request, res: Response) => {
    res.send("pong");
});

export default routes;
