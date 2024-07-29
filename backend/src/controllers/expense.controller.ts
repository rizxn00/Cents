import { Request, Response } from 'express'
import { ExpenseService } from '../services/expense.service'

const expenseService = new ExpenseService()

export class ExpenseController {
    async createExpense(req: Request, res: Response) {
        try {
            const { id, amount, category, description, date } = req.body;

            if (!id || !amount || !category || !date) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const Expense = await expenseService.createExpense(
                id,
                amount,
                category,
                description,
                date
            );

            res.status(201).json(Expense);
        } catch (error) {
            console.error('Error in createExpense controller:', error);
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }


    async getExpenses(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            if (!userId) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const Expenses = await expenseService.getExpenses(
                userId
            );

            res.status(201).json(Expenses);
        } catch (error) {
            console.error('Error in getExpenses controller:', error);
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async deleteExpense(req: Request, res: Response) {
        try {
            const { id } = req.params

            if (!id) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const deletedExpense = await expenseService.deleteExpense(
                id
            );

            res.status(201).json(deletedExpense);

        } catch (error) {
            console.error('Error in deleteExpense controller:', error);
            if (error instanceof Error) {
                if (error.message === 'Expense not found to delete') {
                    res.status(404).json({ error: error.message });
                } else {
                    res.status(500).json({ error: 'Internal server error', details: error.message });
                }
            } else {
                res.status(500).json({ error: 'An unexpected error occurred' });
            }
        }
    }

    async updateExpense(req: Request, res: Response) {
        try {
            const { id, amount, category, description, date } = req.body;

            if (!id || !amount || !category || !date) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const Expense = await expenseService.updateExpense(
                id,
                amount,
                category,
                description,
                date
            );

            res.status(201).json(Expense);
        } catch (error) {
            console.error('Error in updateExpense controller:', error);
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}