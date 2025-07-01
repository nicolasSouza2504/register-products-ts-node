import express, {Request, Response, Router} from "express";
import { login, register} from '../controller/auth.controller.js';

const router = Router();

router.post('/login', login);

router.post('/register', (req: Request, res: Response) => {
    return register(req, res);
});

export default router;
