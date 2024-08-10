import express, { Request, Response } from 'express'
import { initializeDatabase } from './utils/initializeDatabase'
import dotenv from 'dotenv';
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import expenseRoutes from './routes/expense.routes'
import incomeRoutes from './routes/income.routes'
import profileRoutes from './routes/profile.routes'
import sharedRoutes from './routes/shared.routes'

dotenv.config();

const app = express();

const port = process.env.PORT || 8000;

app.use(cors ({
  origin:'*',
  methods:['GET','POST', 'DELETE', 'PUT'],
  credentials:true
}))

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
app.get('/', (req: Request, res: Response) => {
  return res.status(200).json('Hello Backend');
});
app.use('/api/auth', authRoutes)
app.use('/api/expenses', expenseRoutes)
app.use('/api/incomes', incomeRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/shared', sharedRoutes)

export default app