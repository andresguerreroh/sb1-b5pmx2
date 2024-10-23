"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Trophy } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Match, Team, Player } from "@/types/team"

// Datos de ejemplo para los equipos de la escuela
const schoolTeams: Team[] = [
  { id: 1, name: "Equipo Sub-15", players: [], averageRating: 65 },
  { id: 2, name: "Equipo Sub-17", players: [], averageRating: 72 },
  { id: 3, name: "Equipo Sub-20", players: [], averageRating: 78 },
]

const playerPositions = [
  "PO", "CIZ", "CDE", "LD", "LI", "MCD", "MC", "MCO", "MDD", "MDI", "EI", "ED", "SP", "DC"
]

// Generar jugadores aleatorios para cada equipo
schoolTeams.forEach(team => {
  team.players = Array.from({ length: 20 }, (_, index) => ({
    id: `${team.id}-${index + 1}`,
    name: `Jugador ${index + 1}`,
    position: playerPositions[Math.floor(Math.random() * playerPositions.length)],
    rating: Math.floor(Math.random() * (99 - 50 + 1)) + 50,
  }))
})

const initialMatches: Match[] = [
  {
    id: 1,
    date: new Date(),
    homeTeam: "Equipo Sub-15",
    awayTeam: "Club Deportivo Juventud",
    homeScore: 3,
    awayScore: 1,
    scorers: [
      { teamId: 1, playerId: 1, goals: 2 },
      { teamId: 1, playerId: 2, goals: 1 },
    ],
    yellowCards: [3, 4],
    redCards: [5],
    category: "Sub-15",
  },
]

export default function PartidosPage() {
  const [matches, setMatches] = useState<Match[]>(initialMatches)
  const [date, setDate] = useState<Date>()
  const [selectedTeam, setSelectedTeam] = useState<string>("")
  const [selectedTeamId, setSelectedTeamId] = useState<number>(0)
  const [homeScore, setHomeScore] = useState<number>(0)
  const [awayScore, setAwayScore] = useState<number>(0)
  const [awayTeam, setAwayTeam] = useState<string>("")
  const [selectedScorers, setSelectedScorers] = useState<{playerId: string, goals: number}[]>([])
  const [selectedYellowCards, setSelectedYellowCards] = useState<string[]>([])
  const [selectedRedCards, setSelectedRedCards] = useState<string[]>([])
  
  const { toast } = useToast()

  const handleTeamSelect = (teamName: string) => {
    const team = schoolTeams.find(t => t.name === teamName)
    if (team) {
      setSelectedTeam(teamName)
      setSelectedTeamId(team.id)
    }
  }

  const handleScorerSelect = (playerId: string) => {
    const existingScorer = selectedScorers.find(s => s.playerId === playerId)
    if (existingScorer) {
      setSelectedScorers(selectedScorers.filter(s => s.playerId !== playerId))
    } else {
      setSelectedScorers([...selectedScorers, { playerId, goals: 1 }])
    }
  }

  const handleGoalsChange = (playerId: string, goals: number) => {
    setSelectedScorers(selectedScorers.map(scorer => 
      scorer.playerId === playerId ? { ...scorer, goals } : scorer
    ))
  }

  const handleCardSelect = (playerId: string, type: 'yellow' | 'red') => {
    if (type === 'yellow') {
      setSelectedYellowCards(prev => 
        prev.includes(playerId) 
          ? prev.filter(id => id !== playerId)
          : [...prev, playerId]
      )
    } else {
      setSelectedRedCards(prev => 
        prev.includes(playerId)
          ? prev.filter(id => id !== playerId)
          : [...prev, playerId]
      )
    }
  }

  const handleAddMatch = () => {
    if (!date || !selectedTeam || !awayTeam) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos requeridos",
        variant: "destructive",
      })
      return
    }

    const newMatch: Match = {
      id: matches.length + 1,
      date,
      homeTeam: selectedTeam,
      awayTeam,
      homeScore,
      awayScore,
      scorers: selectedScorers.map(scorer => ({
        teamId: selectedTeamId,
        playerId: parseInt(scorer.playerId),
        goals: scorer.goals,
      })),
      yellowCards: selectedYellowCards.map(id => parseInt(id)),
      redCards: selectedRedCards.map(id => parseInt(id)),
      category: selectedTeam.split(" ")[1],
    }

    setMatches([...matches, newMatch])
    resetForm()
    toast({
      title: "Partido agregado",
      description: "El partido ha sido registrado exitosamente.",
    })
  }

  const resetForm = () => {
    setDate(undefined)
    setSelectedTeam("")
    setSelectedTeamId(0)
    setAwayTeam("")
    setHomeScore(0)
    setAwayScore(0)
    setSelectedScorers([])
    setSelectedYellowCards([])
    setSelectedRedCards([])
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Partidos</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Trophy className="mr-2 h-4 w-4" />
              Registrar Partido
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Partido</DialogTitle>
              <DialogDescription>
                Ingrese los detalles del partido jugado.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Fecha</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Seleccionar fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Equipo Local</Label>
                <Select onValueChange={handleTeamSelect}>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Seleccionar equipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {schoolTeams.map((team) => (
                      <SelectItem key={team.id} value={team.name}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Equipo Visitante</Label>
                <Input 
                  className="w-[280px]" 
                  placeholder="Nombre del equipo visitante"
                  value={awayTeam}
                  onChange={(e) => setAwayTeam(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Resultado</Label>
                <div className="flex items-center space-x-2">
                  <Input 
                    type="number" 
                    className="w-20" 
                    min="0"
                    value={homeScore}
                    onChange={(e) => setHomeScore(parseInt(e.target.value))}
                  />
                  <span>-</span>
                  <Input 
                    type="number" 
                    className="w-20" 
                    min="0"
                    value={awayScore}
                    onChange={(e) => setAwayScore(parseInt(e.target.value))}
                  />
                </div>
              </div>

              {selectedTeam && (
                <>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right">Goleadores</Label>
                    <div className="space-y-2">
                      {schoolTeams.find(t => t.id === selectedTeamId)?.players.map((player) => (
                        <div key={player.id} className="flex items-center space-x-2">
                          <Button
                            type="button"
                            variant={selectedScorers.some(s => s.playerId === player.id) ? "secondary" : "outline"}
                            size="sm"
                            onClick={() => handleScorerSelect(player.id)}
                          >
                            {player.name}
                          </Button>
                          {selectedScorers.some(s => s.playerId === player.id) && (
                            <Input
                              type="number"
                              value={selectedScorers.find(s => s.playerId === player.id)?.goals || 1}
                              onChange={(e) => handleGoalsChange(player.id, parseInt(e.target.value))}
                              className="w-20"
                              min="1"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right">Tarjetas</Label>
                    <div className="space-y-4">
                      <div>
                        <Label className="mb-2 block">Amarillas</Label>
                        <div className="flex flex-wrap gap-2">
                          {schoolTeams.find(t => t.id === selectedTeamId)?.players.map((player) => (
                            <Button
                              key={`yellow-${player.id}`}
                              variant={selectedYellowCards.includes(player.id) ? "secondary" : "outline"}
                              size="sm"
                              onClick={() => handleCardSelect(player.id, 'yellow')}
                            >
                              {player.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="mb-2 block">Rojas</Label>
                        <div className="flex flex-wrap gap-2">
                          {schoolTeams.find(t => t.id === selectedTeamId)?.players.map((player) => (
                            <Button
                              key={`red-${player.id}`}
                              variant={selectedRedCards.includes(player.id) ? "secondary" : "outline"}
                              size="sm"
                              onClick={() => handleCardSelect(player.id, 'red')}
                            >
                              {player.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <DialogFooter>
              <Button onClick={handleAddMatch}>Registrar Partido</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Partidos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Local</TableHead>
                <TableHead>Resultado</TableHead>
                <TableHead>Visitante</TableHead>
                <TableHead>Goleadores</TableHead>
                <TableHead>Tarjetas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matches.map((match) => (
                <TableRow key={match.id}>
                  <TableCell>{format(new Date(match.date), "dd/MM/yyyy")}</TableCell>
                  <TableCell>{match.category}</TableCell>
                  <TableCell>{match.homeTeam}</TableCell>
                  <TableCell>{match.homeScore} - {match.awayScore}</TableCell>
                  <TableCell>{match.awayTeam}</TableCell>
                  <TableCell>
                    {match.scorers.map((scorer, index) => {
                      const team = schoolTeams.find(t => t.id === scorer.teamId)
                      const player = team?.players.find(p => p.id === scorer.playerId.toString())
                      return (
                        <div key={index}>
                          {player?.name} ({scorer.goals})
                        </div>
                      )
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {match.yellowCards.length > 0 && (
                        <div className="flex items-center">
                          <span className="w-4 h-4 bg-yellow-400 mr-2"></span>
                          {match.yellowCards.length}
                        </div>
                      )}
                      {match.redCards.length > 0 && (
                        <div className="flex items-center">
                          <span className="w-4 h-4 bg-red-600 mr-2"></span>
                          {match.redCards.length}
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}