import { Request, Response } from 'express'
import Task from '../schemas/Task';

export async function index(req: Request, res: Response): Promise<Response> {
    try {
        const tasks = await Task.find();
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export async function create(req: Request, res: Response): Promise<Response> {
    try {
        const newTask = req.body;
        const createTask = await Task.create(newTask);
        return res.status(201).json(createTask);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export async function removeById(req: Request, res: Response): Promise<Response> {
    try {
        const result = await Task.deleteOne({ _id: req.params.id });

        if (result.deletedCount == 0)
            return res.status(404).json(result);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export async function updateById(req: Request, res: Response): Promise<Response> {
    try {
        const result = await Task.updateOne({ _id: req.params.id }, req.body);
        
        if (result.nModified == 0)
            return res.status(404).json(result);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export async function searchById(req: Request, res: Response): Promise<Response> {
    try {
        const result = await Task.findById(req.params.id);
        
        if (result === null)
            return res.status(404).json(result);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
}