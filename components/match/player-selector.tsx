"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Player } from "@/types/team"

interface PlayerSelectorProps {
  players: Player[]
  onSelectPlayer: (playerId: number, type: 'goal' | 'yellow' | 'red', value?: number) => void
  selectedPlayers: {
    goals: { [key: number]: number }
    yellowCards: number[]
    redCards: number[]
  }
}

export function PlayerSelector({ players, onSelectPlayer, selectedPlayers }: PlayerSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Goleadores</Label>
        <div className="mt-2 space-y-2">
          {players.map((player) => (
            <div key={`goal-${player.id}`} className="flex items-center space-x-2">
              <Button
                type="button"
                variant={selectedPlayers.goals[player.id] ? "secondary" : "outline"}
                size="sm"
                onClick={() => onSelectPlayer(player.id, 'goal', selectedPlayers.goals[player.id] ? 0 : 1)}
              >
                {player.name}
              </Button>
              {selectedPlayers.goals[player.id] > 0 && (
                <Input
                  type="number"
                  value={selectedPlayers.goals[player.id]}
                  onChange={(e) => onSelectPlayer(player.id, 'goal', parseInt(e.target.value))}
                  className="w-20"
                  min="1"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Tarjetas Amarillas</Label>
        <div className="mt-2 space-y-2">
          {players.map((player) => (
            <Button
              key={`yellow-${player.id}`}
              type="button"
              variant={selectedPlayers.yellowCards.includes(player.id) ? "secondary" : "outline"}
              size="sm"
              onClick={() => onSelectPlayer(player.id, 'yellow')}
              className="mr-2"
            >
              {player.name}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Tarjetas Rojas</Label>
        <div className="mt-2 space-y-2">
          {players.map((player) => (
            <Button
              key={`red-${player.id}`}
              type="button"
              variant={selectedPlayers.redCards.includes(player.id) ? "secondary" : "outline"}
              size="sm"
              onClick={() => onSelectPlayer(player.id, 'red')}
              className="mr-2"
            >
              {player.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}