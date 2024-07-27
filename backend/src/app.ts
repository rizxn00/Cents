import express from 'express'
import { initializeDatabase } from './utils/initializeDatabase'
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes'
import expenseRoutes from './routes/Expense.Routes'
import incomeRoutes from './routes/income.routes'

dotenv.config();

const app = express();

const port = process.env.PORT || 8000;

app.listen(port, async () => {
  console.log(`Server running at port ${port}`);
  try {
    await initializeDatabase()
  } catch (error) {
    console.error('Failed to initialize database:', error)
    process.exit(1) 
  }
});

app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/expenses', expenseRoutes)
app.use('/api/incomes', incomeRoutes)

export default app