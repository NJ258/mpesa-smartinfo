export interface TemporaryAgent {
  id: number
  agentName: string
  targetLocation: string
  latitude: number
  longitude: number
  status: 'pending' | 'accepted' | 'available' | 'finished'
  createdAt: string
}