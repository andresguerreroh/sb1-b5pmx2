export interface Player {
  id: number | string
  name: string
  position: string
  rating: number
}

export interface Team {
  id: number
  name: string
  players: Player[]
  averageRating: number
}

export interface Match {
  id: number
  date: Date
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  scorers: {
    teamId: number
    playerId: number
    goals: number
  }[]
  yellowCards: number[]
  redCards: number[]
  category: string
}