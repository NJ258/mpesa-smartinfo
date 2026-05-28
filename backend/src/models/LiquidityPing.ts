export type PingType = 'WITHDRAW' | 'DEPOSIT'

export type PingStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'ON_THE_WAY'
  | 'ARRIVED'
  | 'EXPIRED'

export interface LiquidityPing {
  id: string
  clientName: string
  clientPhone: string
  agentId: number
  agentName: string
  amount: number
  type: PingType
  status: PingStatus
  eta: string | null
  createdAt: string
}
