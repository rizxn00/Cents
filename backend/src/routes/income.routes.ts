import express from 'express'
import { IncomeController } from '../controllers/income.controller'
import { authMiddleware } from '../middleware/auth'


const router = express.Router()
const incomeController = new IncomeController()

router.post('/create', authMiddleware, incomeController.createIncome)
router.get('/get/:userId', authMiddleware, incomeController.getMonthlyIncomes)
router.delete('/delete/:id', authMiddleware, incomeController.deleteIncome)
router.post('/update', authMiddleware, incomeController.updateIncome)

export default router