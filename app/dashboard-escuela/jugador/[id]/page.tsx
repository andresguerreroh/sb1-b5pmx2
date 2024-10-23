"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Datos de ejemplo para la Escuela de Fútbol Estrella
const schoolData = {
  name: "Escuela de Fútbol Estrella",
  teams: [
    { id: 1, name: "Equipo Sub-15", players: 20, averageRating: 65 },
    { id: 2, name: "Equipo Sub-17", players: 20, averageRating: 72 },
    { id: 3, name: "Equipo Sub-20", players: 20, averageRating: 78 },
  ],
}

const playerPositions = [
  "PO", "CIZ", "CDE", "LD", "LI", "MCD", "MC", "MCO", "MDD", "MDI", "EI", "ED", "SP", "DC"
]

// Función para generar jugadores aleatorios
const generateRandomPlayers = (team, count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `${team.id}-${index + 1}`,
    name: `Jugador ${index + 1}`,
    position: playerPositions[Math.floor(Math.random() * playerPositions.length)],
    rating: Math.floor(Math.random() * (99 - 50 + 1)) + 50,
    birthDate: `200${Math.floor(Math.random() * 9) + 1}-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
    height: Math.floor(Math.random() * (200 - 160 + 1)) + 160,
    weight: Math.floor(Math.random() * (90 - 50 + 1)) + 50,
  }))
}

// Generar jugadores para cada equipo
schoolData.teams.forEach(team => {
  team.players = generateRandomPlayers(team, 20)
})

export function generateStaticParams() {
  return schoolData.teams.flatMap(team => 
    team.players.map(player => ({
      id: player.id,
    }))
  )
}

export default function JugadorPage({ params }) {
  const router = useRouter()
  const [player, setPlayer] = useState(null)

  useEffect(() => {
    const [teamId, playerId] = params.id.split('-').map(Number)
    const team = schoolData.teams.find(t => t.id === teamId)
    if (team) {
      const foundPlayer = team.players.find(p => p.id === params.id)
      if (foundPlayer) {
        setPlayer(foundPlayer)
      } else {
        router.push('/dashboard-escuela')
      }
    } else {
      router.push('/dashboard-escuela')
    }
  }, [params.id, router])

  if (!player) {
    return <div>Cargando...</div>
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Detalles del Jugador</h1>
      
      <Card className="w-full max-w-md mx-auto bg-gradient-to-b from-yellow-400 to-yellow-600 text-black">
        <CardContent className="flex flex-col items-center justify-between h-full p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">{player.name}</h2>
            <p className="text-xl">{player.position}</p>
          </div>
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6">
            <span className="text-5xl font-bold">{player.rating}</span>
          </div>
          <div className="text-center">
            <p className="mb-2">Fecha de Nacimiento: {player.birthDate}</p>
            <p className="mb-2">Altura: {player.height} cm</p>
            <p className="mb-2">Peso: {player.weight} kg</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button onClick={() => router.back()}>Volver al Equipo</Button>
      </div>
    </div>
  )
}