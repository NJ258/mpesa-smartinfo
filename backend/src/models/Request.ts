export interface HelpRequest {
  id: number
  userName: string
  location: string
  description: string
  status: 'pending' | 'resolved'
}