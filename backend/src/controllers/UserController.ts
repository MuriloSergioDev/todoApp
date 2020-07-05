//import connection from '../connection';
import { Request, Response } from 'express'
import User from '../schemas/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secret = <string>process.env.ACESS_TOKEN_SECRET;

export async function index(req: Request, res: Response): Promise<Response> {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export async function create(req: Request, res: Response): Promise<Response> {
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, 10);

    const newUser = {
        username,
        password
    }

    try {
        const createUser = await User.create(newUser);
        return res.status(201).json(createUser);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export async function login(req: Request, res: Response): Promise<Response> {
    try {
        const user = await User.find({ username: req.body.username }, function (err, docs) {
            if (err != null)
                return res.status(400).send(err);

            return docs;
        });

        if (user[0] == null) {
            return res.status(404).send('Cannot find user');
        }

        const checkPassword = await bcrypt.compare(req.body.password, user[0].password);

        if (checkPassword) {
            const token = jwt.sign({ id: user[0]._id }, secret, { expiresIn: '1h' });
            return res.json({ token });
        } else {
            return res.status(403).send('Incorrect password')
        }

    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function verifyToken(req: Request, res: Response): Promise<Response> {
    try {
        let decoded = jwt.verify(req.body.token, secret);
        return res.status(200).send(decoded)
    } catch (error) {
        return res.status(500).send(error);
    }
}