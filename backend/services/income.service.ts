import { supabase } from '../config/supabase'

export class IncomeService {
    async createIncome(id: string, amount: number, category: string, description: string, date: Date) {
        try {
        
            const { data: userData, error: userError } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', id)
                .single();
    
            if (userError) throw new Error(`User not found: ${userError.message}`);
            if (!userData) throw new Error('User not found');    
        
            const { data: insertData, error: insertError } = await supabase
                .from('incomes')
                .insert({
                    user_id: id,
                    amount,
                    category,
                    description,
                    date: date
                })
                .select() 
    
            if (insertError) {
                console.error('Error inserting income:', insertError);
                throw new Error(`Error inserting income: ${insertError.message}`);
            }
    
            if (!insertData || insertData.length === 0) {
                throw new Error('Income was not inserted');
            }
    
        
            return { data: insertData[0], message:"Income added"};
        } catch (error) {
            console.error('Error in createIncome service:', error);
            throw error;
        }
    }

    async getMonthlyIncomes(userId: string) {
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

        const { data: Data, error: errorData } = await supabase
            .from('incomes')
            .select('id, amount, category, description, date')
            .eq('user_id', userId)
            .gte('date', firstDayOfMonth)
            .lte('date', lastDayOfMonth);

        if (errorData) throw new Error(`Error fetching incomes: ${errorData.message}`);
        if (!Data || Data.length === 0) throw new Error('No incomes found for this user in the current month');
        return Data
    }

    async deleteIncome(id: string) {
        const { data: existingIncome, error: fetchError } = await supabase
          .from('incomes')
          .select()
          .eq('id', id)
          .single()
    
        if (fetchError) {
          throw new Error(`Error fetching income: ${fetchError.message}`)
        }
    
        if (!existingIncome) {
          throw new Error('Income not found to delete')
        }
    
        const { error: deleteError } = await supabase
          .from('incomes')
          .delete()
          .eq('id', id)
    
        if (deleteError) {
          throw new Error(`Error deleting income: ${deleteError.message}`)
        }
        return { message: 'Income successfully deleted', deletedIncome: existingIncome }
      }

      async updateIncome(id: string, amount: number, category: string, description: string, date: Date) {
        const { data: existingIncome, error: fetchError } = await supabase
          .from('incomes')
          .select()
          .eq('id', id)
          .single()
    
        if (fetchError) {
          throw new Error(`Error fetching income: ${fetchError.message}`)
        }
    
        if (!existingIncome) {
          throw new Error('Income not found to update')
        }

        const { data: updatedData, error: updatedError } = await supabase
        .from('incomes')
        .update({ amount, category, description, date })
        .eq('id', id)
        .select()  
    
        if (updatedError) {
          throw new Error(`Error updating income: ${updatedError.message}`)
        }
        return { message: 'Income successfully updated', data: updatedData}
      }
}