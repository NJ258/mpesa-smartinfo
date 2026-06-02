import { Request, Response } from "express";
import prisma from "../config/prisma";

// POST /api/clients - Criar ou atualizar cliente
export const createOrUpdateClient = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      res.status(400).json({ message: "Nome e telefone são obrigatórios." });
      return;
    }

    // Validar formato do telefone (começar com 84 ou 85)
    const phoneStr = String(phone).trim();
    if (!phoneStr.match(/^(84|85)\d{7}$/)) {
      res
        .status(400)
        .json({ message: "Telefone inválido. Use o formato: 84XXXXXXXX" });
      return;
    }

    // Upsert - criar ou atualizar
    const client = await prisma.user.upsert({
      where: { phoneNumber: phoneStr },
      update: { name: String(name).trim() },
      create: {
        name: String(name).trim(),
        phoneNumber: phoneStr,
        role: "CLIENT",
      },
    });

    res.status(201).json({
      message: "Perfil guardado com sucesso",
      client: {
        id: client.id,
        name: client.name,
        phoneNumber: client.phoneNumber,
      },
    });
  } catch (error) {
    console.error("Erro ao guardar cliente:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// GET /api/clients/:phone - Buscar cliente por telefone
export const getClientByPhone = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const client = await prisma.user.findUnique({
      where: { phoneNumber: String(req.params.phone) },
      select: {
        id: true,
        name: true,
        phoneNumber: true,
        createdAt: true,
      },
    });

    if (!client) {
      res.status(404).json({ message: "Cliente não encontrado." });
      return;
    }

    res.json(client);
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};
