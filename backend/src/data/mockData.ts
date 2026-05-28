import { Agent } from '../models/Agent'
import { HelpRequest } from '../models/Request'
import { TemporaryAgent } from '../models/TemporaryAgent'
import { LiquidityPing } from '../models/LiquidityPing'

export const agents: Agent[] = [
  {
    id: 1,
    name: 'Agente M-Pesa Baixa',
    location: 'Baixa, Maputo',
    latitude: -25.9692,
    longitude: 32.5732,
    isActive: true,
    hasCash: true,
    hasFloat: true,
    rating: 4.8,
    referencePoint: 'Junto ao Mercado Central',
  },
  {
    id: 2,
    name: 'Agente M-Pesa Xipamanine',
    location: 'Xipamanine, Maputo',
    latitude: -25.9565,
    longitude: 32.5543,
    isActive: true,
    hasCash: false,
    hasFloat: true,
    rating: 4.5,
    referencePoint: 'Em frente ao Mercado Xipamanine',
  },
  {
    id: 3,
    name: 'Agente M-Pesa Matola',
    location: 'Matola',
    latitude: -25.9622,
    longitude: 32.4589,
    isActive: false,
    hasCash: false,
    hasFloat: false,
    rating: 4.2,
    referencePoint: 'Perto da praça de Matola',
  },
  {
    id: 4,
    name: 'Agente M-Pesa Boane Centro',
    location: 'Boane',
    latitude: -26.0294,
    longitude: 32.3307,
    isActive: true,
    hasCash: false,
    hasFloat: true,
    rating: 4.6,
    referencePoint: 'Ao lado da paragem de chapas',
  },
  {
    id: 5,
    name: 'Agente M-Pesa Zimpeto',
    location: 'Zimpeto, Maputo',
    latitude: -25.8607,
    longitude: 32.5812,
    isActive: true,
    hasCash: true,
    hasFloat: true,
    rating: 4.9,
    referencePoint: 'Perto do Estádio de Zimpeto',
  },
  {
    id: 6,
    name: 'Agente M-Pesa Costa do Sol',
    location: 'Costa do Sol, Maputo',
    latitude: -25.9106,
    longitude: 32.6427,
    isActive: true,
    hasCash: true,
    hasFloat: false,
    rating: 4.7,
    referencePoint: 'Em frente à praia da Costa do Sol',
  },
  {
    id: 7,
    name: 'Agente M-Pesa Benfica',
    location: 'Benfica, Maputo',
    latitude: -25.8883,
    longitude: 32.5334,
    isActive: false,
    hasCash: false,
    hasFloat: true,
    rating: 4.3,
    referencePoint: 'Junto à escola primária de Benfica',
  },
  {
    id: 8,
    name: 'Agente M-Pesa T3',
    location: 'T3, Matola',
    latitude: -25.9146,
    longitude: 32.4711,
    isActive: true,
    hasCash: true,
    hasFloat: true,
    rating: 4.8,
    referencePoint: 'Perto do terminal de chapas T3',
  },
]

export const helpRequests: HelpRequest[] = [
  {
    id: 1,
    userName: 'Utilizador Demo',
    location: 'Boane',
    description:
      'Zona com muitos utilizadores, mas poucos agentes com dinheiro disponível.',
    status: 'pending',
  },
  {
    id: 2,
    userName: 'Maria',
    location: 'Xipamanine, Maputo',
    description:
      'Há agentes próximos, mas muitos estão sem dinheiro para levantamentos.',
    status: 'pending',
  },
]

export const temporaryAgents: TemporaryAgent[] = []

export const liquidityPings: LiquidityPing[] = []

// Simple auto-increment counters for IDs
let helpRequestIdCounter = helpRequests.length
let temporaryAgentIdCounter = 0
let liquidityPingIdCounter = 0

export const nextHelpRequestId = (): number => ++helpRequestIdCounter
export const nextTemporaryAgentId = (): number => ++temporaryAgentIdCounter
export const nextLiquidityPingId = (): string => `ping-${String(++liquidityPingIdCounter).padStart(4, '0')}`