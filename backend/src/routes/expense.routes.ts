import express from 'express'
import { ExpenseController } from '../controllers/expense.controller'
import { authMiddleware } from '../middleware/auth'

const router = express.Router()
const expenseController = new ExpenseController()

router.post('/create', authMiddleware, expenseController.createExpense)
router.get('/get/:userId', authMiddleware, expenseController.getMonthlyExpenses)
router.delete('/delete/:id', authMiddleware, expenseController.deleteExpense)
router.post('/update', authMiddleware, expenseController.updateExpense)

export default router