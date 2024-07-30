import { supabase } from '../config/supabase'

export class SharedService {
    async getTotalFinancialOverview(id: string) {
        try {
        
            const { data: userData, error: userError } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', id)
                .single();
    
            if (userError) throw new Error(`User not found: ${userError.message}`);
            if (!userData) throw new Error('User not found');    
        
            const { data: incomeData, error: incomeError } = await supabase
                .from('incomes')
                .select('amount')
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
    
            return { incomeData: incomeData, expenseData: expenseData, message:"Financial summary retrieved"};
        } catch (error) {
            console.error('Error in financial overview service:', error);
            throw error;
        }
    }

    async getProfileData(id: string) {
        try {
            const { data: userData, error: userError } = await supabase
                .from('profiles')
                .select()
                .eq('id', id)
                .single();
    
            if (userError) throw new Error(`User not found: ${userError.message}`);
            if (!userData) throw new Error('User not found');  
            
            return { data: userData, message:"User details retrieved"};
        } catch (error) {
            console.error('Error in profile service:', error);
            throw error;
        }
    }
}