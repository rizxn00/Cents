import { supabase } from '../config/supabase'

export class ProfileService {
    async getCurrency(id: string) {
        try {
            const { data: Data, error: ErrorData } = await supabase
                .from('profiles')
                .select('currency')
                .eq('id', id)

            if (ErrorData) throw new Error(`Error: ${ErrorData.message}`);
            return Data
        } catch (error) {
            console.error('Error in getCurrency service:', error);
            throw error;
        }
    }

    async updateCurrency(id: string, currency: string) {
        try {
            const { data: Data, error: ErrorData } = await supabase
                .from('profiles')
                .update({
                    currency: currency
                })
                .eq('id', id)
                .select('currency')

            if (ErrorData) throw new Error(`Error: ${ErrorData.message}`);
            return Data
        } catch (error) {
            console.error('Error in updateCurrency service:', error);
            throw error;
        }
    }

    async onBoardingService(id: string, name: string, currency: string) {
        try {
            const { data: Data, error: ErrorData } = await supabase
                .from('profiles')
                .update({
                    name: name,
                    currency: currency,
                    onboarding: true
                })
                .eq('id', id)
                .select()

            if (ErrorData) throw new Error(`Error: ${ErrorData.message}`);

            return Data
        } catch (error) {
            console.error('Error in onBoarding service:', error);
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

            if (userError) throw new Error(`Error: ${userError.message}`);
            if (!userData) throw new Error('Error');

            return { data: userData, message: "User details retrieved" };
        } catch (error) {
            console.error('Error in profile service:', error);
            throw error;
        }
    }

    async updateProfileData(id: string, username: string, name: string) {
        try {
            // Update profiles table
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .update({ username, name })
                .eq('id', id);

            if (profileError) throw profileError;
           

            // Fetch updated profile data
            const { data: updatedProfile, error: fetchError } = await supabase
                .from('profiles')
                .select('id, username, name, email')
                .eq('id', id)
                .single();

            if (fetchError) throw fetchError;

            return { data: updatedProfile, message: "Profile updated successfully" };
        } catch (error: any) {
            console.error('Error in update profile service:', error);
            throw new Error(error.message || 'Failed to update profile');
        }
    }
}