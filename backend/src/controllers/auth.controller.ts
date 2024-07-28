import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export class AuthController {
    async registerUser(req: Request, res: Response) {
        try {
            const { email, password, username } = req.body;

            if (!email || !password || !username) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const newUser = await authService.registerUser(email, password, username);

            if (newUser.error) {
                return res.status(400).json({ error: newUser.error.message });
            }

            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error in auth controller:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async loginUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const loginUser = await authService.loginUser(email, password);

            if (loginUser.error) {
                return res.status(400).json({ error: loginUser.error.message });
            }

            res.status(200).json(loginUser);
        } catch (error) {
            console.error('Error in auth controller:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
