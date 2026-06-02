import { Request, Response } from 'express'
import prisma from '../config/prisma'

const RESERVATION_MINUTES = 10

// GET /api/liquidity-pings — List all pings (optionally filter by agentId or status)
export const getLiquidityPings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { agentId, status } = req.query
    const whereClause: any = {}

    if (agentId) {
      whereClause.agentId = String(agentId)
    }

    if (status && typeof status === 'string') {
      whereClause.status = status.toUpperCase()
    }

    const pings = await prisma.liquidityPing.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    })

    res.json(pings)
  } catch (error) {
    console.error('Erro ao listar pings:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

// POST /api/liquidity-pings — Client creates a new liquidity ping
export const createLiquidityPing = async (req: Request, res: Response): Promise<void> => {
  try {
    const { clientName, clientPhone, agentId, amount, type } = req.body

    // Validate required fields
    if (!clientName || !clientPhone || !agentId || !amount || !type) {
      res.status(400).json({
        message: 'Campos obrigatórios: clientName, clientPhone, agentId, amount, type (WITHDRAW | DEPOSIT).',
      })
      return
    }

    // Validate type
    if (type !== 'WITHDRAW' && type !== 'DEPOSIT') {
      res.status(400).json({ message: 'Tipo inválido. Use WITHDRAW ou DEPOSIT.' })
      return
    }

    // Validate amount is positive number
    const numericAmount = Number(amount)
    if (isNaN(numericAmount) || numericAmount <= 0) {
      res.status(400).json({ message: 'O valor (amount) deve ser um número positivo.' })
      return
    }

    // Find the agent
    const agent = await prisma.agent.findUnique({
      where: { id: String(agentId) },
    })

    if (!agent) {
      res.status(404).json({ message: 'Agente não encontrado.' })
      return
    }

    if (!agent.isActive) {
      res.status(400).json({ message: 'Este agente não está activo no momento.' })
      return
    }

    // Upsert the client user
    await prisma.user.upsert({
      where: { phoneNumber: String(clientPhone) },
      update: { name: String(clientName) },
      create: {
        name: String(clientName),
        phoneNumber: String(clientPhone),
        role: 'CLIENT',
      },
    })

    const newPing = await prisma.liquidityPing.create({
      data: {
        clientName: String(clientName),
        clientPhone: String(clientPhone),
        agentId: agent.id,
        agentName: agent.name,
        amount: numericAmount,
        type: type,
        status: 'PENDING',
      },
    })

    res.status(201).json({
      message: 'Ping de liquidez enviado ao agente. Aguardando resposta.',
      ping: newPing,
    })
  } catch (error) {
    console.error('Erro ao criar ping:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

// PATCH /api/liquidity-pings/:id/accept — Agent accepts the ping (answers YES)
export const acceptLiquidityPing = async (req: Request, res: Response): Promise<void> => {
  try {
    const ping = await prisma.liquidityPing.findUnique({
      where: { id: String(req.params.id) },
    })

    if (!ping) {
      res.status(404).json({ message: 'Ping não encontrado.' })
      return
    }

    if (ping.status !== 'PENDING') {
      res.status(400).json({ message: `Não é possível aceitar um ping com estado "${ping.status}".` })
      return
    }

    const updatedPing = await prisma.liquidityPing.update({
      where: { id: String(req.params.id) },
      data: { status: 'ACCEPTED' },
    })

    res.json({
      message: 'Agente confirmou que consegue atender este valor.',
      ping: updatedPing,
    })
  } catch (error) {
    console.error('Erro ao aceitar ping:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

// PATCH /api/liquidity-pings/:id/reject — Agent rejects the ping (answers NO)
export const rejectLiquidityPing = async (req: Request, res: Response): Promise<void> => {
  try {
    const ping = await prisma.liquidityPing.findUnique({
      where: { id: String(req.params.id) },
    })

    if (!ping) {
      res.status(404).json({ message: 'Ping não encontrado.' })
      return
    }

    const allowedStatuses = ['PENDING', 'ACCEPTED', 'ON_THE_WAY']
    if (!allowedStatuses.includes(ping.status)) {
      res.status(400).json({ message: `Não é possível rejeitar um ping com estado "${ping.status}".` })
      return
    }

    const updatedPing = await prisma.liquidityPing.update({
      where: { id: String(req.params.id) },
      data: { status: 'REJECTED' },
    })

    res.json({
      message: 'Agente informou que não consegue atender este valor.',
      ping: updatedPing,
    })
  } catch (error) {
    console.error('Erro ao rejeitar ping:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

// PATCH /api/liquidity-pings/:id/on-the-way — Client confirms they are on the way
export const onTheWayLiquidityPing = async (req: Request, res: Response): Promise<void> => {
  try {
    const ping = await prisma.liquidityPing.findUnique({
      where: { id: String(req.params.id) },
    })

    if (!ping) {
      res.status(404).json({ message: 'Ping não encontrado.' })
      return
    }

    if (ping.status !== 'ACCEPTED') {
      res.status(400).json({ message: `O cliente só pode confirmar "a caminho" após aceitação do agente. Estado actual: "${ping.status}".` })
      return
    }

    // Validate ETA
    const { eta } = req.body

    if (!eta || typeof eta !== 'string' || eta.trim().length === 0) {
      res.status(400).json({ message: 'Informe um ETA válido.' })
      return
    }

    const expiresAt = new Date(Date.now() + RESERVATION_MINUTES * 60 * 1000)

    const updatedPing = await prisma.liquidityPing.update({
      where: { id: String(req.params.id) },
      data: {
        status: 'ON_THE_WAY',
        eta: String(eta),
        expiresAt,
      },
    })

    res.json({
      message: `Cliente a caminho. Reserva válida por ${RESERVATION_MINUTES} minutos.`,
      ping: updatedPing,
      reservationExpiresAt: expiresAt.toISOString(),
    })
  } catch (error) {
    console.error('Erro ao colocar a caminho:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

// PATCH /api/liquidity-pings/:id/arrived — Client confirms arrival
export const arrivedLiquidityPing = async (req: Request, res: Response): Promise<void> => {
  try {
    const ping = await prisma.liquidityPing.findUnique({
      where: { id: String(req.params.id) },
    })

    if (!ping) {
      res.status(404).json({ message: 'Ping não encontrado.' })
      return
    }

    if (ping.status !== 'ON_THE_WAY') {
      res.status(400).json({ message: `O cliente só pode confirmar chegada quando está "a caminho". Estado actual: "${ping.status}".` })
      return
    }

    // Check if reservation expired
    const now = new Date()
    if (ping.expiresAt && now > ping.expiresAt) {
      const updatedPing = await prisma.liquidityPing.update({
        where: { id: String(req.params.id) },
        data: { status: 'EXPIRED' },
      })
      res.status(410).json({
        message: `A reserva expirou após ${RESERVATION_MINUTES} minutos. Por favor, crie um novo ping.`,
        ping: updatedPing,
      })
      return
    }

    const updatedPing = await prisma.liquidityPing.update({
      where: { id: String(req.params.id) },
      data: { status: 'ARRIVED' },
    })

    res.json({
      message: 'Cliente chegou ao agente. Transacção pode prosseguir.',
      ping: updatedPing,
    })
  } catch (error) {
    console.error('Erro ao confirmar chegada:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}
