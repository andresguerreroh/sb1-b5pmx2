"use client"

import { useState } from "react"
import { Player } from "@/types/team"
import { Button } from "@/components/ui/button"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

interface FieldProps {
  players: Player[]
  onLineupChange: (lineup: Player[]) => void
}

export function Field({ players, onLineupChange }: FieldProps) {
  const [starters, setStarters] = useState<Player[]>([])
  const [bench, setBench] = useState<Player[]>(players)

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const sourceList = result.source.droppableId === "field" ? starters : bench
    const destList = result.destination.droppableId === "field" ? starters : bench

    const [removed] = sourceList.splice(result.source.index, 1)
    destList.splice(result.destination.index, 0, removed)

    if (result.source.droppableId === "field") {
      setStarters([...sourceList])
      setBench([...destList])
    } else {
      setBench([...sourceList])
      setStarters([...destList])
    }

    if (result.destination.droppableId === "field") {
      onLineupChange([...destList])
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-green-800 p-4 rounded-lg min-h-[600px] relative">
          <Droppable droppableId="field">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="grid grid-cols-3 gap-4 h-full"
              >
                {starters.map((player, index) => (
                  <Draggable key={player.id} draggableId={player.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white p-2 rounded text-center"
                      >
                        <div className="font-bold">{player.name}</div>
                        <div className="text-sm">{player.position}</div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold mb-4">Banca</h3>
          <Droppable droppableId="bench">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-2"
              >
                {bench.map((player, index) => (
                  <Draggable key={player.id} draggableId={player.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white p-2 rounded shadow"
                      >
                        <div className="font-bold">{player.name}</div>
                        <div className="text-sm text-gray-600">{player.position}</div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  )
}