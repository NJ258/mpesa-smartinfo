import { Request, Response } from 'express'
import prisma from '../config/prisma'

// POST /api/users/register — Register or login user (auto-create if not exists)
export const registerOrLoginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, phoneNumber } = req.body

    if (!name || !phoneNumber) {
      res.status(400).json({ message: 'Nome e telefone são obrigatórios.' })
      return
    }

    // Verificar se usuário já existe
    let user = await prisma.user.findUnique({
      where: { phoneNumber: String(phoneNumber).trim() },
    })

    // Se não existe, criar novo usuário
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: String(name).trim(),
          phoneNumber: String(phoneNumber).trim(),
        },
      })
      console.log(`✅ Novo usuário criado: ${phoneNumber}`)
    } else {
      console.log(`✅ Usuário já existe: ${phoneNumber}`)
    }

    res.json({
      message: 'Login/Registro efectuado com sucesso',
      user: {
        id: user.id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Erro no registro/login do usuário:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

// GET /api/users/:phoneNumber — Get user by phone
export const getUserByPhone = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { phoneNumber: String(req.params.phoneNumber).trim() },
    })

    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' })
      return
    }

    res.json(user)
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}
