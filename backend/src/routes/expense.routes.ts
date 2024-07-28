import express from 'express'
import { ExpenseController } from '../controllers/expense.controller'

const router = express.Router()
const expenseController = new ExpenseController()

router.post('/create', expenseController.createExpense)
router.get('/get/:userId', expenseController.getExpenses)
router.delete('/delete/:id', expenseController.deleteExpense)
router.post('/update', expenseController.updateExpense)

export default router