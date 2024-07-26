import express from 'express'
import routes from './routes/expenseRoutes'
import { errorHandler } from './utils/errorHandler'
import dotenv from 'dotenv';

dotenv.config();


const app = express();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

app.use(express.json())
app.use('/api', routes)
app.use(errorHandler)

export default app