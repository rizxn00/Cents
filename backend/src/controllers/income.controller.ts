import { Request, Response } from 'express'
import { IncomeService } from '../services/income.service'

const incomeService = new IncomeService()

export class IncomeController {
    async createIncome(req: Request, res: Response) {
        try {
            const { id, amount, category, description, date } = req.body;

            if (!id || !amount || !category || !date) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const Income = await incomeService.createIncome(
                id,
                amount,
                category,
                description,
                date
            );

            res.status(201).json(Income);
        } catch (error) {
            console.error('Error in createIncome controller:', error);
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }


    async getIncomes(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            if (!userId) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const Incomes = await incomeService.getIncomes(
                userId
            );

            res.status(201).json(Incomes);
        } catch (error) {
            console.error('Error in getIncomes controller:', error);
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async deleteIncome(req: Request, res: Response) {
        try {
            const { id } = req.params

            if (!id) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const deletedIncome = await incomeService.deleteIncome(
                id
            );

            res.status(201).json(deletedIncome);

        } catch (error) {
            console.error('Error in deleteIncome controller:', error);
            if (error instanceof Error) {
                if (error.message === 'Income not found to delete') {
                    res.status(404).json({ error: error.message });
                } else {
                    res.status(500).json({ error: 'Internal server error', details: error.message });
                }
            } else {
                res.status(500).json({ error: 'An unexpected error occurred' });
            }
        }
    }

    async updateIncome(req: Request, res: Response) {
        try {
            const { id, amount, category, description, date } = req.body;

            if (!id || !amount || !category || !date) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const Income = await incomeService.updateIncome(
                id,
                amount,
                category,
                description,
                date
            );

            res.status(201).json(Income);
        } catch (error) {
            console.error('Error in updateIncome controller:', error);
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}