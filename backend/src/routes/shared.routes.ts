import express from 'express'
import { SharedController } from '../controllers/shared.controller'

const router = express.Router()
const sharedController = new SharedController()

router.get('/getoverview/:id', sharedController.financialOverview)
router.get('/getprofile/:id', sharedController.profileData)

export default router