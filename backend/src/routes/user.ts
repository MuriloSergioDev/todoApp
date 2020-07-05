import express from 'express';
import { index, create, login, verifyToken } from '../controllers/UserController';

const router = express.Router();

router.get('/users', index);

router.post('/verifyToken', verifyToken);

router.post('/signIn', login);

router.post('/signUp', create);

export default router;