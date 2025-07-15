import express from 'express'
import { ProfileController } from '../controllers/profile.controller'
import { authMiddleware } from '../middleware/auth'

const router = express.Router()
const profileController = new ProfileController()

router.get('/getcurrency/:id', authMiddleware, profileController.getCurrency)
router.put('/updatecurrency', authMiddleware, profileController.updateCurrency)
router.get('/getprofile/:id', authMiddleware, profileController.profileData)
router.post('/onboarding', authMiddleware, profileController.onBoarding)
router.post('/updateprofile', authMiddleware, profileController.updateProfile)

export default router