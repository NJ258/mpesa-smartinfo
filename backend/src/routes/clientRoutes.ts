import { Router } from "express";
import {
  createOrUpdateClient,
  getClientByPhone,
} from "../controllers/clientController";

const router = Router();

// POST /api/clients - Criar ou atualizar cliente
router.post("/", createOrUpdateClient);

// GET /api/clients/:phone - Buscar cliente por telefone
router.get("/:phone", getClientByPhone);

export default router;
