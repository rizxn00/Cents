import express from 'express'
import { AuthController } from '../controllers/auth.controller'

const router = express.Router()
const authController = new AuthController()

router.post('/signup', authController.registerUser)
router.post('/signin', authController.loginUser)
router.post('/change-password', authController.changePassword)


export default router