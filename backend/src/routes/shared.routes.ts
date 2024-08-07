import express from 'express'
import { SharedController } from '../controllers/shared.controller'
import upload from '../middleware/upload';
import { authMiddleware } from '../middleware/auth'

const router = express.Router()
const sharedController = new SharedController()

router.get('/getoverview/:id', authMiddleware, sharedController.financialOverview)
router.get('/dashboard/:id',authMiddleware, sharedController.dashboardData )
router.get('/dashboard/barchart/:id',authMiddleware, sharedController.barChartData )
router.get('/dashboard/donutchart/:id',authMiddleware, sharedController.donutChartData )
router.get('/dashboard/linechart/:id',authMiddleware, sharedController.lineChartData )
router.get('/dashboard/heatmapchart/:id',authMiddleware, sharedController.heatMapChartData )
router.get('/exportdata/:id',authMiddleware, sharedController.exportData )
router.post('/importdata', upload.single('file'), authMiddleware, sharedController.importData);

export default router