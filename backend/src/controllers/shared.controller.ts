import { Request, Response } from 'express'
import { SharedService } from '../services/shared.service'

const sharedService = new SharedService()

export class SharedController {

    async financialOverview(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ error: 'Missing required fields' });

            const Overview = await sharedService.getTotalFinancialOverview(id);
            const TotalIncome = Overview.incomeData.reduce((acc, curr) => acc + curr.amount, 0);
            const TotalExpense = Overview.expenseData.reduce((acc, curr) => acc + curr.amount, 0);
            const Balance = TotalIncome - TotalExpense
            const Transcation = Overview.incomeData.length + Overview.expenseData.length

            res.status(200).json({ "TotalIncome": TotalIncome, "TotalExpense": TotalExpense, "Balance": Balance, "Transcation": Transcation, "message": Overview.message });
        } catch (error) {
            console.error('Error in financialOverview controller:', error);
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async dashboardData(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ error: 'Missing required fields' });
            
            const data = await sharedService.getDashboardData(id);
            
            res.status(200).json(data);
        } catch (error) {
            console.error('Error in dashboardData controller:', error);
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async barChartData (req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ error: 'Missing required fields' });

            const data = await sharedService.barChartData(id);
            
            res.status(200).json(data);
        } catch (error) {
            console.error('Error in barchart controller:', error);
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async donutChartData (req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ error: 'Missing required fields' });

            const data = await sharedService.donutChartData(id);
            
            res.status(200).json(data);
        } catch (error) {
            console.error('Error in donutchart controller:', error);
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async lineChartData (req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ error: 'Missing required fields' });

            const data = await sharedService.lineChartData(id);
            
            res.status(200).json(data);
        } catch (error) {
            console.error('Error in linechart controller:', error);
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async heatMapChartData (req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ error: 'Missing required fields' });

            const data = await sharedService.heatMapChart(id);
            
            res.status(200).json(data);
        } catch (error) {
            console.error('Error in heatMapChart controller:', error);
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async exportData(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ error: 'Missing required fields' });
            
            const csvString = await sharedService.exportData(id);
            
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', `attachment; filename=financial_data_${id}.csv`);
            return res.send(csvString);
        } catch (error) {
            console.error('Error in exportData controller:', error);
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async importData(req: Request, res: Response) {
        try {
          if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
          }
    
          const userId = req.body.userId;
          if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
          }
    
          const importedCount = await sharedService.importData(req.file.path, userId);
          res.json({ message: 'Import successful', importedCount });
        } catch (error) {
          console.error('Error in importData controller:', error);
          res.status(500).json({ error: 'An error occurred during import' });
        }
      }


}
