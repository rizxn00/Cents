import { supabase } from '../config/supabase'

export class ExpenseService {
    async createExpense(id: string, amount: number, category: string, description: string, date: Date) {
        try {
        
            const { data: userData, error: userError } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', id)
                .single();
    
            if (userError) throw new Error(`User not found: ${userError.message}`);
            if (!userData) throw new Error('User not found');
          
            const { data: insertData, error: insertError } = await supabase
                .from('expenses')
                .insert({
                    user_id: id,
                    amount,
                    category,
                    description,
                    date: date
                })
                .select() 
    
            if (insertError) {
                console.error('Error inserting expense:', insertError);
                throw new Error(`Error inserting expense: ${insertError.message}`);
            }
    
            if (!insertData || insertData.length === 0) {
                throw new Error('Expense was not inserted');
            }
    
        
            return { data: insertData[0], message:"Expense added" };
        } catch (error) {
            console.error('Error in createExpense service:', error);
            throw error;
        }
    }

    async getMonthlyExpenses(userId: string) {
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();
  
      const { data: Data, error: errorData } = await supabase
          .from('expenses')
          .select('id, amount, category, description, date')
          .eq('user_id', userId)
          .gte('date', firstDayOfMonth)
          .lte('date', lastDayOfMonth);
  
      if (errorData) throw new Error(`Error fetching expenses: ${errorData.message}`);
      if (!Data || Data.length === 0) throw new Error('No expenses found for this user in the current month');
      return Data;
  }

    async deleteExpense(id: string) {
        const { data: existingExpense, error: fetchError } = await supabase
          .from('expenses')
          .select()
          .eq('id', id)
          .single()
    
        if (fetchError) {
          throw new Error(`Error fetching expense: ${fetchError.message}`)
        }
    
        if (!existingExpense) {
          throw new Error('Expense not found to delete')
        }
    
        const { error: deleteError } = await supabase
          .from('expenses')
          .delete()
          .eq('id', id)
    
        if (deleteError) {
          throw new Error(`Error deleting expense: ${deleteError.message}`)
        }
        return { message: 'Expense successfully deleted', deletedExpense: existingExpense }
      }

      async updateExpense(id: string, amount: number, category: string, description: string, date: Date) {
        const { data: existingExpense, error: fetchError } = await supabase
          .from('expenses')
          .select()
          .eq('id', id)
          .single()
    
        if (fetchError) {
          throw new Error(`Error fetching expense: ${fetchError.message}`)
        }
    
        if (!existingExpense) {
          throw new Error('Expense not found to update')
        }

        const { data: updatedData, error: updatedError } = await supabase
        .from('expenses')
        .update({ amount, category, description, date })
        .eq('id', id)
        .select()  
    
        if (updatedError) {
          throw new Error(`Error updating expense: ${updatedError.message}`)
        }
        return { message: 'Expense successfully updated', data: updatedData}
      }
}