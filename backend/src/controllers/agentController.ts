import { Request, Response } from 'express'
import prisma from '../config/prisma'

// GET /api/agents — List all agents (never expose total balance)
export const getAgents = async (_req: Request, res: Response): Promise<void> => {
  try {
    const agents = await prisma.agent.findMany({
      select: {
        id: true,
        code: true,
        name: true,
        location: true,
        latitude: true,
        longitude: true,
        isActive: true,
        rating: true,
        referencePoint: true,
        // hasCash and hasFloat are deliberately hidden from public list
      },
      orderBy: { name: 'asc' },
    })

    res.json(agents)
  } catch (error) {
    console.error('Erro ao listar agentes:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

// GET /api/agents/:id — Get agent by ID (safe view)
export const getAgentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const agent = await prisma.agent.findUnique({
      where: { id: String(req.params.id) },
      select: {
        id: true,
        code: true,
        name: true,
        location: true,
        latitude: true,
        longitude: true,
        isActive: true,
        rating: true,
        referencePoint: true,
      },
    })

    if (!agent) {
      res.status(404).json({ message: 'Agente não encontrado' })
      return
    }

    res.json(agent)
  } catch (error) {
    console.error('Erro ao buscar agente:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

// PATCH /api/agents/:id/status — Agent updates own status (agent-only)
export const updateAgentStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const agent = await prisma.agent.findUnique({
      where: { id: String(req.params.id) },
    })

    if (!agent) {
      res.status(404).json({ message: 'Agente não encontrado' })
      return
    }

    const { isActive, hasCash, hasFloat, referencePoint } = req.body

    const updateData: Record<string, boolean | string> = {}
    if (typeof isActive === 'boolean') updateData.isActive = isActive
    if (typeof hasCash === 'boolean') updateData.hasCash = hasCash
    if (typeof hasFloat === 'boolean') updateData.hasFloat = hasFloat
    if (typeof referencePoint === 'string') updateData.referencePoint = referencePoint

    const updatedAgent = await prisma.agent.update({
      where: { id: String(req.params.id) },
      data: updateData,
    })

    res.json({
      message: 'Estado do agente actualizado com sucesso',
      agent: updatedAgent,
    })
  } catch (error) {
    console.error('Erro ao actualizar agente:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

// POST /api/agents/login — Agent login
export const loginAgent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, code } = req.body
    if (!name || !code) {
      res.status(400).json({ message: 'Nome e código são obrigatórios.' })
      return
    }

    const agent = await prisma.agent.findFirst({
      where: {
        code: String(code).trim(),
        name: {
          contains: String(name).trim(),
          mode: 'insensitive',
        },
      },
    })

    if (!agent) {
      res.status(401).json({ message: 'Nome ou código do agente inválido.' })
      return
    }

    res.json({
      message: 'Login efectuado com sucesso',
      agent: {
        id: agent.id,
        name: agent.name,
        code: agent.code,
        role: 'agent',
      },
    })
  } catch (error) {
    console.error('Erro no login do agente:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

// POST /api/agents/admin-login — Admin login
export const loginAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(400).json({ message: 'Email e senha são obrigatórios.' })
      return
    }

    const admin = await prisma.admin.findUnique({
      where: { email: String(email).trim() },
    })

    if (!admin || admin.password !== String(password).trim()) {
      res.status(401).json({ message: 'Email ou senha inválidos.' })
      return
    }

    res.json({
      message: 'Login efectuado com sucesso',
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: 'admin',
      },
    })
  } catch (error) {
    console.error('Erro no login do administrador:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}