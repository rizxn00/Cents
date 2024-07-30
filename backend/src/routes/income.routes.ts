import express from 'express'
import { IncomeController } from '../controllers/income.controller'

const router = express.Router()
const incomeController = new IncomeController()

router.post('/create', incomeController.createIncome)
router.get('/get/:userId', incomeController.getMonthlyIncomes)
router.delete('/delete/:id', incomeController.deleteIncome)
router.post('/update', incomeController.updateIncome)

export default router