import {Router} from 'express'
import {Registrar, Dashboard} from '../controllers/cita.controller.js'


const router = Router()

router.post('/Registrar', Registrar)
router.get('/Dashboard', Dashboard)

export default router