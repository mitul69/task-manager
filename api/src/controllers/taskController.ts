import { Request, Response } from 'express';
import { ValidationError } from 'yup';
import Task from '../models/task';
import { taskValidationSchema } from '../validations/taskValidation';

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getTask = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        await taskValidationSchema.validate(req.body);
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ error: error.errors });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await taskValidationSchema.validate(req.body);
        const [updated] = await Task.update(req.body, { where: { id } });
        if (updated) {
            const updatedTask = await Task.findOne({ where: { id } });
            return res.status(200).json(updatedTask);
        }
        throw new Error('Task not found');
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ error: error.errors });
        } else if (error instanceof Error) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deleted = await Task.destroy({ where: { id } });
        if (deleted) {
            return res.status(204).json({ message: 'Task deleted' });
        }
        throw new Error('Task not found');
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
