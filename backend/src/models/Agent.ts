export interface Agent {
  id: number
  name: string
  location: string
  latitude: number
  longitude: number
  isActive: boolean
  hasCash: boolean
  hasFloat: boolean
  rating: number
  referencePoint: string
}