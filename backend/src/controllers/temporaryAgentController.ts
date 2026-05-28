import { Request, Response } from 'express'
import prisma from '../config/prisma'

// GET /api/temporary-agents — List all temporary agent requests
export const getTemporaryAgents = async (_req: Request, res: Response): Promise<void> => {
  try {
    const tempAgents = await prisma.temporaryAgent.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json(tempAgents)
  } catch (error) {
    console.error('Erro ao listar agentes temporários:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

// POST /api/temporary-agents — Create a new temporary agent request
export const createTemporaryAgentRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { targetLocation, latitude, longitude } = req.body

    if (!targetLocation || latitude === undefined || longitude === undefined) {
      res.status(400).json({ message: 'Informe a zona (targetLocation), latitude e longitude.' })
      return
    }

    const newTemporaryAgent = await prisma.temporaryAgent.create({
      data: {
        agentName: 'Agente temporário disponível',
        targetLocation: String(targetLocation),
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
    })

    res.status(201).json({
      message: 'Pedido de agente temporário criado',
      temporaryAgent: newTemporaryAgent,
    })
  } catch (error) {
    console.error('Erro ao criar agente temporário:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

// PATCH /api/temporary-agents/:id/accept — Agent accepts the request
export const acceptTemporaryAgentRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const temporaryAgent = await prisma.temporaryAgent.findUnique({
      where: { id: String(req.params.id) },
    })

    if (!temporaryAgent) {
      res.status(404).json({ message: 'Pedido não encontrado.' })
      return
    }

    if (temporaryAgent.status !== 'PENDING') {
      res.status(400).json({ message: `Não é possível aceitar um pedido com estado "${temporaryAgent.status}".` })
      return
    }

    const updated = await prisma.temporaryAgent.update({
      where: { id: String(req.params.id) },
      data: {
        status: 'ACCEPTED',
        agentName: req.body.agentName || 'Agente temporário a caminho',
      },
    })

    res.json({
      message: 'Pedido aceite pelo agente.',
      temporaryAgent: updated,
    })
  } catch (error) {
    console.error('Erro ao aceitar pedido temporário:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

// PATCH /api/temporary-agents/:id/available — Agent marks as available at location
export const markTemporaryAgentAvailable = async (req: Request, res: Response): Promise<void> => {
  try {
    const temporaryAgent = await prisma.temporaryAgent.findUnique({
      where: { id: String(req.params.id) },
    })

    if (!temporaryAgent) {
      res.status(404).json({ message: 'Pedido não encontrado.' })
      return
    }

    if (temporaryAgent.status !== 'ACCEPTED') {
      res.status(400).json({ message: `Só é possível marcar como disponível após aceitar. Estado actual: "${temporaryAgent.status}".` })
      return
    }

    const updated = await prisma.temporaryAgent.update({
      where: { id: String(req.params.id) },
      data: { status: 'AVAILABLE' },
    })

    res.json({
      message: 'Agente temporário disponível no local.',
      temporaryAgent: updated,
    })
  } catch (error) {
    console.error('Erro ao marcar disponível:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}