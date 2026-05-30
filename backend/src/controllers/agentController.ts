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

// POST /api/agents/:id/rate — Add a rating for an agent and update average
export const rateAgent = async (req: Request, res: Response): Promise<void> => {
  try {
    const agentId = String(req.params.id);
    const { stars, comment, clientPhone } = req.body;

    if (!clientPhone || typeof clientPhone !== 'string') {
      res.status(400).json({ message: 'clientPhone is required' });
      return;
    }

    if (!stars || typeof stars !== 'number' || stars < 1 || stars > 5) {
      res.status(400).json({ message: 'Stars must be a number between 1 and 5' });
      return;
    }

    const agent = await prisma.agent.findUnique({ where: { id: agentId } });
    if (!agent) {
      res.status(404).json({ message: 'Agent not found' });
      return;
    }

    const existing = await prisma.rating.findUnique({
      where: {
        agentId_clientPhone: {
          agentId,
          clientPhone: String(clientPhone),
        }
      }
    });

    if (existing) {
      res.status(400).json({ message: 'Este número já avaliou este agente.' });
      return;
    }

    const rating = await prisma.rating.create({
      data: {
        agentId,
        clientPhone: String(clientPhone),
        stars: Math.floor(stars),
        comment: comment ? String(comment) : undefined,
      }
    });

    // Recalculate average
    const agg = await prisma.rating.aggregate({
      where: { agentId },
      _avg: { stars: true }
    });

    const avg = agg._avg?.stars ?? agent.rating;
    const updated = await prisma.agent.update({ where: { id: agentId }, data: { rating: Number(avg) } });

    res.json({ message: 'Rating added', rating, agent: updated });
  } catch (error) {
    console.error('Erro ao adicionar rating:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}