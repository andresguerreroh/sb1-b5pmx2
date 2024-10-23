"use client"

import { useState } from 'react'
import { Field } from "@/components/lineup/field"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const playerPositions = [
  "PO", "CIZ", "CDE", "LD", "LI", "MCD", "MC", "MCO", "MDD", "MDI", "EI", "ED", "SP", "DC"
]

// Generar jugadores de ejemplo para el equipo
const generatePlayers = (teamId: string) => {
  return Array.from({ length: 20 }, (_, index) => ({
    id: `${teamId}-${index + 1}`,
    name: `Jugador ${index + 1}`,
    position: playerPositions[Math.floor(Math.random() * playerPositions.length)],
    rating: Math.floor(Math.random() * (99 - 50 + 1)) + 50,
  }))
}

export default function AlineacionPage({ params }: { params: { id: string } }) {
  const [players] = useState(generatePlayers(params.id))
  const [lineup, setLineup] = useState([])
  const { toast } = useToast()

  const handleLineupChange = (newLineup) => {
    setLineup(newLineup)
    toast({
      title: "Alineación actualizada",
      description: "La alineación ha sido guardada exitosamente.",
    })
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Alineación del Equipo</h1>

      <Card>
        <CardHeader>
          <CardTitle>Configura la Alineación</CardTitle>
        </CardHeader>
        <CardContent>
          <Field
            players={players}
            onLineupChange={handleLineupChange}
          />
        </CardContent>
      </Card>
    </div>
  )
}