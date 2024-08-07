import { supabase } from '../config/supabase'
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || '';

export class AuthService {
    async registerUser(email: string, password: string, username: string) {
        const { data: existingUser, error: checkError } = await supabase
            .from('profiles')
            .select('username')
            .eq('username', username)
            .single();
    
        if (checkError && checkError.code !== 'PGRST116') {
            return { error: checkError };
        }
    
        if (existingUser) {
            return { error: { message: 'Username already taken' } };
        }
    
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
    
        if (error) {
            return { error };
        }
    
        const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .insert([{ id: data.user?.id, username: username, email: email }]);
    
        if (profileError) {
            await supabase.auth.admin.deleteUser(data.user!.id);
            return { error: profileError };
        }
    
        return { data: data.user };
    }


    async loginUser(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            return { error };
        }

        const {data: profileData, error: profileError} = await supabase
        .from("profiles")
        .select("onboarding, currency")
        .eq("email", email)

        const token = jwt.sign({ userId: data.user.id }, SECRET_KEY, {
            expiresIn: '2 days',
        });

        return { data, profileData, token };
    }

    async changePassword(userId: string, currentPassword: string, newPassword: string) {
        try {
            const { data: user, error: getUserError } = await supabase.auth.getUser(userId);
            
            if (getUserError) throw getUserError;

            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: user.user.email!,
                password: currentPassword,
            });

            if (signInError) throw new Error('Current password is incorrect');

            const { data, error } = await supabase.auth.updateUser({ password: newPassword });

            if (error) throw error;

            return { message: "Password changed successfully" };
        } catch (error: any) {
            console.error('Error in change password service:', error);
            throw new Error(error.message || 'Failed to change password');
        }
    }
}