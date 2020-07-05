import express from 'express';
import { index, create, removeById, updateById } from '../controllers/TaskController';

const router = express.Router();

router.get('/tasks', index);

router.put('/updateTask/:id', updateById);

router.delete('/deleteTask/:id', removeById);

router.post('/newTask', create);

export default router;