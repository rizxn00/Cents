import express from 'express'
import { ExpenseController } from '../controllers/ExpenseController'

const router = express.Router()
const expenseController = new ExpenseController()

router.post('/', expenseController.createExpense)
// router.get('/', expenseController.getExpenses)
// Other routes...

export default router