import { supabase } from '../config/supabase'
import { Auth } from '../models/auth.model'

export class AuthService {
    async registerUser(email: string, password: string, username: string) {
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
        return { data };
    }
}