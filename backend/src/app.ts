import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import agentRoutes from './routes/agentRoutes'
import requestRoutes from './routes/requestRoutes'
import temporaryAgentRoutes from './routes/temporaryAgentRoutes'
import liquidityPingRoutes from './routes/liquidityPingRoutes'
import clientRoutes from './routes/clientRoutes'
import userRoutes from './routes/userRoutes'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Health check
app.get('/', (_req, res) => {
  res.json({
    message: 'API do M-Pesa SmartInfo está funcionando',
    version: '1.0.0',
    endpoints: {
      agents: '/api/agents',
      requests: '/api/requests',
      temporaryAgents: '/api/temporary-agents',
      liquidityPings: '/api/liquidity-pings',
      users: '/api/users',
    },
  })
})

// Routes
app.use('/api/agents', agentRoutes)
app.use('/api/requests', requestRoutes)
app.use('/api/temporary-agents', temporaryAgentRoutes)
app.use('/api/liquidity-pings', liquidityPingRoutes)
app.use('/api/clients', clientRoutes)
app.use('/api/users', userRoutes)

export default app