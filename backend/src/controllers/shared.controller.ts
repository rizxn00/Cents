import { Request, Response } from 'express'
import { SharedService } from '../services/shared.service'

const sharedService = new SharedService()

export class SharedController {
    async financialOverview(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const Overview = await sharedService.getTotalFinancialOverview(id);
            const TotalIncome = Overview.incomeData.reduce((acc, curr) => acc + curr.amount, 0);
            const TotalExpense = Overview.expenseData.reduce((acc, curr) => acc + curr.amount, 0);
            const Balance = TotalIncome - TotalExpense

            
            res.status(200).json({"TotalIncome": TotalIncome, "TotalExpense": TotalExpense, "Balance": Balance, "message": Overview.message});
        } catch (error) {
            console.error('Error in financialOverview controller:', error);
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async profileData(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const profile = await sharedService.getProfileData(id);
            
            res.status(200).json(profile);
        } catch (error) {
            console.error('Error in profileData controller:', error);
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}
