import { Router } from 'express'
import {
   getAgents,
   getAgentById,
   updateAgentStatus,
   loginAgent,
   loginAdmin,
   rateAgent,
} from '../controllers/agentController'

const router = Router()

router.get('/', getAgents)
router.post('/login', loginAgent)
router.post('/admin-login', loginAdmin)
router.get('/:id', getAgentById)
router.patch('/:id/status', updateAgentStatus)
router.post('/:id/rate', rateAgent)

export default router