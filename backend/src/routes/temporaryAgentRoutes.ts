import { Router } from 'express'
import {
  getTemporaryAgents,
  createTemporaryAgentRequest,
  acceptTemporaryAgentRequest,
  markTemporaryAgentAvailable,
} from '../controllers/temporaryAgentController'

const router = Router()

router.get('/', getTemporaryAgents)
router.post('/', createTemporaryAgentRequest)
router.patch('/:id/accept', acceptTemporaryAgentRequest)
router.patch('/:id/available', markTemporaryAgentAvailable)

export default router