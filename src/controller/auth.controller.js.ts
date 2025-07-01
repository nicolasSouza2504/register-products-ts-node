import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user";

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
