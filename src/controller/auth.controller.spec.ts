import { login, register } from '../controller/auth.controller.js';
import User from '../model/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('../model/user.js');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
    let req: any, res: any;

    beforeEach(() => {
        req = { body: {}, headers: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    describe('login', () => {
        it('should return 401 if user not found', async () => {
            (User.findOne as jest.Mock).mockResolvedValue(null);
            req.body = { email: 'notfound@example.com', password: '123' };

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Usuário não encontrado' });
        });

        it('should return 401 if password invalid', async () => {
            (User.findOne as jest.Mock).mockResolvedValue({ password: 'hashed' });
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);
            req.body = { email: 'user@example.com', password: 'wrong' };

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Senha inválida' });
        });

        it('should return token if login successful', async () => {
            (User.findOne as jest.Mock).mockResolvedValue({ id: 1, role: 'user', password: 'hashed' });
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (jwt.sign as jest.Mock).mockReturnValue('fake-token');
            req.body = { email: 'user@example.com', password: '123' };

            await login(req, res);

            expect(res.json).toHaveBeenCalledWith({ token: 'fake-token' });
        });
    });

    describe('register', () => {
        it('should return 400 if user already exists', async () => {
            (User.findOne as jest.Mock).mockResolvedValue(true);
            req.body = { email: 'existing@example.com' };

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Email já cadastrado' });
        });

        it('should create user and return 201', async () => {
            (User.findOne as jest.Mock).mockResolvedValue(null);
            (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpass');
            (User.create as jest.Mock).mockResolvedValue({ id: 1, name: 'John', email: 'john@example.com', role: 'user' });
            req.body = { name: 'John', email: 'john@example.com', password: '123' };

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                id: 1, name: 'John', email: 'john@example.com', role: 'user'
            });
        });
    });
});
