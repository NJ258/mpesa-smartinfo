import app from './app'

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`✅ M-Pesa SmartInfo API rodando em http://localhost:${PORT}`)
  console.log(`📋 Endpoints disponíveis:`)
  console.log(`   GET  http://localhost:${PORT}/api/agents`)
  console.log(`   GET  http://localhost:${PORT}/api/requests`)
  console.log(`   GET  http://localhost:${PORT}/api/temporary-agents`)
  console.log(`   GET  http://localhost:${PORT}/api/liquidity-pings`)
})