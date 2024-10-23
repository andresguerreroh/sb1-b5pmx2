"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Team {
  id: number;
  name: string;
  players: Player[];
  averageRating: number;
}

interface Player {
  id: string;
  name: string;
  position: string;
  rating: number;
}

interface SchoolData {
  name: string;
  teams: Team[];
}

// Datos de ejemplo para la Escuela de Fútbol Estrella
const schoolData: SchoolData = {
  name: "Escuela de Fútbol Estrella",
  teams: [
    { id: 1, name: "Equipo Sub-15", players: [], averageRating: 65 },
    { id: 2, name: "Equipo Sub-17", players: [], averageRating: 72 },
    { id: 3, name: "Equipo Sub-20", players: [], averageRating: 78 },
  ],
}

const playerPositions: string[] = [
  "PO", "CIZ", "CDE", "LD", "LI", "MCD", "MC", "MCO", "MDD", "MDI", "EI", "ED", "SP", "DC"
]

// Función para generar jugadores aleatorios
const generateRandomPlayers = (team: Team, count: number): Player[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `${team.id}-${index + 1}`,
    name: `Jugador ${index + 1}`,
    position: playerPositions[Math.floor(Math.random() * playerPositions.length)],
    rating: Math.floor(Math.random() * (99 - 50 + 1)) + 50,
  }))
}

// Generar jugadores para cada equipo
schoolData.teams.forEach(team => {
  team.players = generateRandomPlayers(team, 20)
})

export default function DashboardEscuela() {
  const [teams] = useState<Team[]>(schoolData.teams)

  // Prepare data for the chart
  /* Commented out chart data preparation
  const chartData = teams.map(team => ({
    name: team.name,
    players: team.players.length,
    averageRating: team.averageRating
  }))
  */

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{schoolData.name}</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        {teams.map((team) => (
          <Card key={team.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {team.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{team.players.length} jugadores</div>
              <p className="text-xs text-muted-foreground">
                Valoración promedio: {team.averageRating}
              </p>
              <Button className="mt-4" asChild>
                <Link href={`/dashboard-escuela/equipo/${team.id}`}>
                  Ver detalles
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Commented out chart component
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas Generales</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="players" fill="#8884d8" name="Jugadores" />
              <Bar yAxisId="right" dataKey="averageRating" fill="#82ca9d" name="Valoración Promedio" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      */}
    </div>
  )
}