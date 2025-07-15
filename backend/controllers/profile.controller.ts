import { Request, Response } from 'express'
import { ProfileService } from '../services/profile.serice'

const profileService = new ProfileService()

export class ProfileController {

    async getCurrency(req: Request, res: Response) {
        try {
            const { id } = req.params
            if (!id) return res.status(400).json({ error: 'Missing required fields' });

            const Data = await profileService.getCurrency(id)

            res.status(200).json(Data);
        } catch (error) {
            console.error('Error in getCurrency controller:', error);
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async updateCurrency(req: Request, res: Response) {
        try {
            const { id, currency } = req.body
            if (!id || !currency) return res.status(400).json({ error: 'Missing required fields' });

            const Data = await profileService.updateCurrency(id, currency)

            res.status(200).json(Data);
        } catch (error) {
            console.error('Error in getCurrency controller:', error);
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async onBoarding(req: Request, res: Response) {
        try {
            const { id, name, currency } = req.body
            if (!id || !name || !currency) return res.status(400).json({ error: 'Missing required fields' });

            const Data = await profileService.onBoardingService(id, name, currency)

            res.status(200).json(Data);
        } catch (error) {
            console.error('Error in onBoarding controller:', error);
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async profileData(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ error: 'Missing required fields' });

            const profile = await profileService.getProfileData(id);
            
            res.status(200).json(profile);
        } catch (error) {
            console.error('Error in profileData controller:', error);
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async updateProfile(req: Request, res: Response) {
        try {
            const { id, username, name } = req.body;

            const result = await profileService.updateProfileData(id, username, name);
            res.status(200).json(result);
        } catch (error: any) {
            console.error('Error in profile controller:', error);
            res.status(500).json({ error: error.message || 'Internal server error' });
        }
    }


}
