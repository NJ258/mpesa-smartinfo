import { Request, Response } from 'express'
import prisma from '../config/prisma'

// GET /api/requests — List all help requests
export const getRequests = async (_req: Request, res: Response): Promise<void> => {
  try {
    const requests = await prisma.helpRequest.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json(requests)
  } catch (error) {
    console.error('Erro ao listar pedidos:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

// POST /api/requests — Create a new help request
export const createRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, phoneNumber, location, description } = req.body

    if (!userName || !location || !description) {
      res.status(400).json({ message: 'Preencha todos os campos: userName, location, description.' })
      return
    }

    const newRequest = await prisma.helpRequest.create({
      data: {
        userName: String(userName),
        phoneNumber: phoneNumber ? String(phoneNumber) : null,
        location: String(location),
        description: String(description),
      },
    })

    res.status(201).json({
      message: 'Pedido enviado com sucesso',
      request: newRequest,
    })
  } catch (error) {
    console.error('Erro ao criar pedido:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}