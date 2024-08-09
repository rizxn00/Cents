import fs from 'fs';
import { supabase } from '../config/supabase'
import { stringify } from 'csv-stringify/sync';
import { parse } from 'csv-parse';

export class SharedService {

    async getTotalFinancialOverview(id: string) {
        try {
            const { data: userData, error: userError } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', id)
                .single();

            if (userError) throw new Error(`Error: ${userError.message}`);
            if (!userData) throw new Error('No Data');

            const { data: incomeData, error: incomeError } = await supabase
                .from('incomes')
                .select('amount, category, date, description')
                .eq('user_id', id)

            if (incomeError) throw new Error(`Error fetching income data: ${incomeError.message}`);

            const { data: expenseData, error: expenseError } = await supabase
                .from('expenses')
                .select('amount')
                .eq('user_id', id)

            if (expenseError) throw new Error(`Error fetching expense data: ${expenseError.message}`);

            if (!incomeData.length && !expenseData.length) {
                throw new Error('No data found');
            }

            return { incomeData: incomeData, expenseData: expenseData, message: "Financial summary retrieved" };
        } catch (error) {
            console.error('Error in financial overview service:', error);
            throw error;
        }
    }

    async getDashboardData(id: string) {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

        try {
            const { data: nameData, error: nameError } = await supabase
                .from('profiles')
                .select('username')
                .eq('id', id)
                .single()

            const { data: expenseData, error: expenseError } = await supabase
                .from('expenses')
                .select('amount, category, date, description')
                .eq('user_id', id)
                .gte('date', firstDayOfMonth)
                .lte('date', lastDayOfMonth)

            const { data: incomeData, error: incomeError } = await supabase
                .from('incomes')
                .select('amount, category, date, description')
                .eq('user_id', id)
                .gte('date', firstDayOfMonth)
                .lte('date', lastDayOfMonth)

            if (nameError) throw new Error(`Error during fetching name: ${nameError.message}`)
            if (expenseError) throw new Error(`Error during expense data: ${expenseError.message}`)
            if (incomeError) throw new Error(`Error during income data: ${incomeError.message}`)

            const totalExpense = expenseData?.reduce((acc: number, curr: { amount: number }) => acc + curr.amount, 0) ?? 0;
            const totalIncome = incomeData?.reduce((acc: number, curr: { amount: number }) => acc + curr.amount, 0) ?? 0;
            const balance = totalIncome - totalExpense;
            const transactionsCount = (expenseData?.length ?? 0) + (incomeData?.length ?? 0);

            const formattedExpenses = expenseData?.map(expense => ({
                type: 'expense',
                category: expense.category,
                date: new Date(expense.date).toLocaleDateString('en-GB'),
                amount: expense.amount.toString(),
                description: expense.description
            })) ?? [];

            const formattedIncomes = incomeData?.map(income => ({
                type: 'income',
                category: income.category,
                date: new Date(income.date).toLocaleDateString('en-GB'),
                amount: income.amount.toString(),
                description: income.description
            })) ?? [];

            const allTransactions = [...formattedExpenses, ...formattedIncomes]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 5);

            return { username: nameData?.username, totalExpense, totalIncome, balance, transactionsCount, allTransactions, message: "Dashboard details fetched" }
        } catch (error) {
            console.error('Error in dashboard service:', error);
            throw error;
        }
    }

    async barChartData(id: string) {
        try {
            const currentYear = new Date().getFullYear();
            const startDate = new Date(currentYear, 0, 1).toISOString();
            const endDate = new Date(currentYear, 11, 31).toISOString();


            const { data: incomeData, error: incomeError } = await supabase
                .from('incomes')
                .select('amount, date')
                .gte('date', startDate)
                .lte('date', endDate);

            if (incomeError) throw new Error(`Error fetching income data: ${incomeError.message}`);


            const { data: expenseData, error: expenseError } = await supabase
                .from('expenses')
                .select('amount, date')
                .gte('date', startDate)
                .lte('date', endDate);

            if (expenseError) throw new Error(`Error fetching expense data: ${expenseError.message}`);


            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let monthlyData = monthNames.map(month => ({ month, income: 0, expense: 0 }));

            incomeData?.forEach(item => {
                const monthIndex = new Date(item.date).getMonth();
                monthlyData[monthIndex].income += item.amount;
            });

            expenseData?.forEach(item => {
                const monthIndex = new Date(item.date).getMonth();
                monthlyData[monthIndex].expense += item.amount;
            });


            monthlyData = monthlyData.map(item => ({
                ...item,
                income: Number(item.income.toFixed(2)),
                expense: Number(item.expense.toFixed(2))
            }));

            return monthlyData
        } catch (error) {
            console.error('Error in BarChart service:', error);
            throw error;
        }
    }

    async donutChartData(id: string) {
        try {
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

            const { data, error } = await supabase
                .from('expenses')
                .select('category, amount')
                .eq('user_id', id)
                .gte('date', startOfMonth)
                .lte('date', endOfMonth);

            if (error) throw new Error(`Error fetching expense data: ${error.message}`);


            const categoryTotals = data.reduce((acc: Record<string, number>, item) => {
                if (!acc[item.category]) {
                    acc[item.category] = 0;
                }
                acc[item.category] += item.amount;
                return acc;
            }, {});


            const formattedData = Object.entries(categoryTotals).map(([category, total]) => ({
                id: category,
                label: category,
                value: Number(total.toFixed(2))
            }));

            return formattedData
        } catch (error) {
            console.error('Error in BarChart service:', error);
            throw error;
        }
    }

    async lineChartData(id: string) {
        try {
            const now = new Date();
            const currentYear = now.getFullYear();
            const currentMonth = now.getMonth();
            const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
            const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

            const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
            const currentMonthDays = getDaysInMonth(currentYear, currentMonth);

            const dateRanges = [
                { start: 1, end: 5 },
                { start: 6, end: 10 },
                { start: 11, end: 15 },
                { start: 16, end: 20 },
                { start: 21, end: 25 },
                { start: 26, end: currentMonthDays < 30 ? currentMonthDays : 29 },
                { start: 30, end: currentMonthDays }
            ];

            const formatDate = (year: number, month: number, day: number) =>
                `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            const currentMonthStart = formatDate(currentYear, currentMonth, 1);
            const currentMonthEnd = formatDate(currentYear, currentMonth, currentMonthDays);
            const lastMonthStart = formatDate(lastMonthYear, lastMonth, 1);
            const lastMonthEnd = formatDate(lastMonthYear, lastMonth, getDaysInMonth(lastMonthYear, lastMonth));

            const { data: currentMonthData, error: currentMonthError } = await supabase
                .from('expenses')
                .select('amount, date')
                .eq('user_id', id)
                .gte('date', currentMonthStart)
                .lte('date', currentMonthEnd);

            if (currentMonthError) throw new Error(`Error fetching current month data: ${currentMonthError.message}`);

            const { data: lastMonthData, error: lastMonthError } = await supabase
                .from('expenses')
                .select('amount, date')
                .eq('user_id', id)
                .gte('date', lastMonthStart)
                .lte('date', lastMonthEnd);

            if (lastMonthError) throw new Error(`Error fetching last month data: ${lastMonthError.message}`);

            const result = dateRanges.map(range => {
                const currentMonthRangeStart = formatDate(currentYear, currentMonth, range.start);
                const currentMonthRangeEnd = formatDate(currentYear, currentMonth, range.end);
                const lastMonthRangeStart = formatDate(lastMonthYear, lastMonth, range.start);
                const lastMonthRangeEnd = formatDate(lastMonthYear, lastMonth, Math.min(range.end, getDaysInMonth(lastMonthYear, lastMonth)));

                const currentMonthExpense = currentMonthData
                    .filter(item => item.date >= currentMonthRangeStart && item.date <= currentMonthRangeEnd)
                    .reduce((sum, item) => sum + item.amount, 0);

                const lastMonthExpense = lastMonthData
                    .filter(item => item.date >= lastMonthRangeStart && item.date <= lastMonthRangeEnd)
                    .reduce((sum, item) => sum + item.amount, 0);

                return {
                    date: currentMonthRangeStart,
                    currentMonthExpense: Number(currentMonthExpense.toFixed(2)),
                    lastMonthExpense: Number(lastMonthExpense.toFixed(2))
                };
            });

            return result;
        } catch (error) {
            console.error('Error in line chart service:', error);
            throw error;
        }
    }

    async heatMapChart(id: string) {

        interface ExpenseDataPoint {
            day: number;
            category: string;
            amount: number;
        }
        try {
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

            const { data, error } = await supabase
                .from('expenses')
                .select('date, category, amount')
                .eq('user_id', id)
                .gte('date', startOfMonth)
                .lte('date', endOfMonth);

            if (error) throw new Error(`Error fetching expense data: ${error.message}`);

            const expenseData: ExpenseDataPoint[] = data.map(item => ({
                day: new Date(item.date).getDate(),
                category: item.category,
                amount: Number(item.amount)
            }));

            const groupedData = expenseData.reduce((acc, item) => {
                const key = `${item.day}-${item.category}`;
                if (!acc[key]) {
                    acc[key] = { ...item };
                } else {
                    acc[key].amount += item.amount;
                }
                return acc;
            }, {} as Record<string, ExpenseDataPoint>);

            const formattedData = Object.values(groupedData).sort((a, b) => {
                if (a.day !== b.day) {
                    return a.day - b.day;
                }
                return a.category.localeCompare(b.category);
            });

            return formattedData;

        } catch (error) {
            console.error('Error in line chart service:', error);
            throw error;
        }
    }

    async exportData(userId: string) {
        try {
            const { data: expenses, error: expensesError } = await supabase
                .from('expenses')
                .select('*')
                .eq('user_id', userId);

            if (expensesError) throw expensesError;

            const { data: incomes, error: incomesError } = await supabase
                .from('incomes')
                .select('*')
                .eq('user_id', userId);

            if (incomesError) throw incomesError;

            const csvData = [
                ['Type', 'Amount', 'Category', 'Date', 'Description'],
                ...expenses.map(e => ['Expense', e.amount, e.category, e.date, e.description]),
                ...incomes.map(i => ['Income', i.amount, i.category, i.date, i.description])
            ];

            const csvString = stringify(csvData);

            return csvString;
        } catch (error) {
            console.error('Error exporting data:', error);
            throw error;
        }
    }

    async importData(filePath: string, userId: string): Promise<number> {
        return new Promise((resolve, reject) => {
          const expenses: any[] = [];
          const incomes: any[] = [];
      
          fs.createReadStream(filePath)
            .pipe(parse({ columns: header => header.map((column: any) => column.toLowerCase()), skip_empty_lines: true }))
            .on('data', (record) => {
              try {
                const [day, month, year] = record.date.split('-').map(Number);
                const dateValue = new Date(year, month - 1, day + 1);
                
                if (isNaN(dateValue.getTime())) {
                  throw new Error(`Invalid date format for record: ${JSON.stringify(record)}`);
                }
      
                const processedRecord = {
                  user_id: userId,
                  amount: parseFloat(record.amount),
                  category: record.category,
                  date: dateValue.toISOString(), 
                  description: record.description || null,
                };
                
                if (record.type.toLowerCase() === 'expense') {
                  expenses.push(processedRecord);
                } else if (record.type.toLowerCase() === 'income') {
                  incomes.push(processedRecord);
                }
              } catch (error) {
                console.error(`Error processing record: ${JSON.stringify(record)}`, error);
              }
            })
            .on('end', async () => {
              try {
                const upsertRecords = async (table: string, data: any[]) => {
                  if (data.length > 0) {
                    const { error } = await supabase
                      .from(table)
                      .upsert(data, { onConflict: 'id' })
                      .select();
                    if (error) throw error;
                  }
                };
      
                await upsertRecords('expenses', expenses);
                await upsertRecords('incomes', incomes);
      
                fs.unlinkSync(filePath);
                resolve(expenses.length + incomes.length);
              } catch (error) {
                reject(error);
              }
            })
            .on('error', reject);
        });
    }
    
}