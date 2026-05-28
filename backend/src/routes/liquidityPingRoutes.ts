import { Router } from 'express'
import {
  getLiquidityPings,
  createLiquidityPing,
  acceptLiquidityPing,
  rejectLiquidityPing,
  onTheWayLiquidityPing,
  arrivedLiquidityPing,
} from '../controllers/liquidityPingController'

const router = Router()

router.get('/', getLiquidityPings)
router.post('/', createLiquidityPing)
router.patch('/:id/accept', acceptLiquidityPing)
router.patch('/:id/reject', rejectLiquidityPing)
router.patch('/:id/on-the-way', onTheWayLiquidityPing)
router.patch('/:id/arrived', arrivedLiquidityPing)

export default router
