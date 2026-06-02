import { Router } from 'express'
import { registerOrLoginUser, getUserByPhone } from '../controllers/userController'

const router = Router()

router.post('/register', registerOrLoginUser)
router.get('/:phoneNumber', getUserByPhone)

export default router
