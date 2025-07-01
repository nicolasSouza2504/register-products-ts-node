import {NextFunction, Request, Response} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).json({ error: "Usuário não encontrado" });

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(401).json({ error: "Senha inválida" });

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || "default_secret",
        { expiresIn: "1h" }
    );

    return res.json({ token });
};

export const register = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    try {
        const exists = await User.findOne({ where: { email } });
        if (exists) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        return res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};

interface JwtPayload {
    id: number;
    role: 'admin' | 'user';
}

export const verifyToken = (roles: string[] = []) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as JwtPayload;

            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ error: 'Acesso negado: permissão insuficiente' });
            }

            next();

        } catch (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }
    };
};
