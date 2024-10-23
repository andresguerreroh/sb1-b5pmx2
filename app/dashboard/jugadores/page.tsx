"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"

const positions = [
  { value: "PO", label: "PORTERO (PO)" },
  { value: "CIZ", label: "DEFENSA CENTRAL IZQ (CIZ)" },
  { value: "CDE", label: "DEFENSA CENTRAL DER (CDE)" },
  { value: "LD", label: "LATERAL DERECHO (LD)" },
  { value: "LI", label: "LATERAL IZQUIERDO (LI)" },
  { value: "MCD", label: "MEDIOCENTRO DEFENSIVO (MCD)" },
  { value: "MC", label: "VOLANTE MIXTO (MC)" },
  { value: "MCO", label: "MEDIOCENTRO OFENSIVO (MCO)" },
  { value: "MDD", label: "MEDIOCENTRO DERECHA (MDD)" },
  { value: "MDI", label: "MEDIOCENTRO IZQUIERDA (MDI)" },
  { value: "EI", label: "EXTREMO IZQUIERDO (EI)" },
  { value: "ED", label: "EXTREMO DERECHO (ED)" },
  { value: "SP", label: "SEGUNDA PUNTA (SP)" },
  { value: "DC", label: "DELANTERO CENTRO (DC)" },
]

const regions = [
  "Arica y Parinacota", "Tarapacá", "Antofagasta", "Atacama", "Coquimbo",
  "Valparaíso", "Metropolitana de Santiago", "Libertador General Bernardo O'Higgins",
  "Maule", "Ñuble", "Biobío", "La Araucanía", "Los Ríos", "Los Lagos",
  "Aysén del General Carlos Ibáñez del Campo", "Magallanes y de la Antártica Chilena"
]

// Función para formatear RUT chileno
const formatRut = (rut) => {
  // Eliminar puntos y guión
  const cleanRut = rut.replace(/\./g, '').replace(/-/g, '');
  // Obtener dígito verificador
  const dv = cleanRut.slice(-1);
  // Obtener cuerpo del RUT
  const rutBody = cleanRut.slice(0, -1);
  // Formatear cuerpo del RUT
  const formattedRutBody = rutBody.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // Retornar RUT formateado
  return `${formattedRutBody}-${dv}`;
}

// Dummy data for players
const initialPlayers = [
  { id: 1, name: "Juan Pérez", birthDate: "2005-03-15", location: "Santiago", position: "DC", category: "Sub-17", overall: 75, baseIllness: "Ninguna", city: "Santiago", region: "Metropolitana de Santiago", rut: "12.345.678-9", avatar: "https://api.dicebear.com/6.x/initials/svg?seed=JP" },
  { id: 2, name: "María González", birthDate: "2003-07-22", location: "Valparaíso", position: "MC", category: "Sub-20", overall: 80, baseIllness: "Asma leve", city: "Viña del Mar", region: "Valparaíso", rut: "23.456.789-0", avatar: "https://api.dicebear.com/6.x/initials/svg?seed=MG" },
  { id: 3, name: "Carlos Rodríguez", birthDate: "2007-11-30", location: "Concepción", position: "CDE", category: "Sub-15", overall: 70, baseIllness: "Ninguna", city: "Concepción", region: "Biobío", rut: "34.567.890-1", avatar: "https://api.dicebear.com/6.x/initials/svg?seed=CR" },
]

export default function JugadoresPage() {
  const [players, setPlayers] = useState(initialPlayers)
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    birthDate: '',
    location: '',
    position: '',
    category: '',
    overall: 50,
    baseIllness: '',
    city: '',
    region: '',
    rut: '',
    avatar: ''
  })
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const { toast } = useToast()

  const handleAddPlayer = () => {
    const id = players.length + 1
    const formattedRut = formatRut(newPlayer.rut)
    const avatarUrl = `https://api.dicebear.com/6.x/initials/svg?seed=${newPlayer.name.split(' ').map(n => n[0]).join('')}`
    const playerToAdd = { 
      id, 
      ...newPlayer, 
      rut: formattedRut,
      avatar: avatarUrl
    }
    setPlayers([...players, playerToAdd])
    setNewPlayer({
      name: '',
      birthDate: '',
      location: '',
      position: '',
      category: '',
      overall: 50,
      baseIllness: '',
      city: '',
      region: '',
      rut: '',
      avatar: ''
    })
    toast({
      title: "Jugador agregado",
      description: `${newPlayer.name} ha sido agregado exitosamente.`,
    })
  }

  const openPlayerDetails = (player) => {
    setSelectedPlayer(player)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Jugadores</h1>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button>Agregar Jugador</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Jugador</DialogTitle>
            <DialogDescription>
              Ingrese los detalles del nuevo jugador.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                value={newPlayer.name}
                onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="birthDate" className="text-right">
                Fecha de Nacimiento
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={newPlayer.birthDate}
                onChange={(e) => setNewPlayer({ ...newPlayer, birthDate: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rut" className="text-right">
                RUT
              </Label>
              <Input
                id="rut"
                value={newPlayer.rut}
                onChange={(e) => setNewPlayer({ ...newPlayer, rut: e.target.value })}
                className="col-span-3"
                placeholder="12345678-9"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                Ciudad
              </Label>
              <Input
                id="city"
                value={newPlayer.city}
                onChange={(e) => setNewPlayer({ ...newPlayer, city: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="region" className="text-right">
                Región
              </Label>
              <Select onValueChange={(value) => setNewPlayer({ ...newPlayer, region: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecciona una región" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                Posición
              </Label>
              <Select onValueChange={(value) => setNewPlayer({ ...newPlayer, position: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecciona una posición" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((pos) => (
                    <SelectItem key={pos.value} value={pos.value}>{pos.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Categoría
              </Label>
              <Select onValueChange={(value) => setNewPlayer({ ...newPlayer, category: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sub-20">Sub-20</SelectItem>
                  <SelectItem value="Sub-17">Sub-17</SelectItem>
                  <SelectItem value="Sub-15">Sub-15</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="overall" className="text-right">
                Valoración General
              </Label>
              <Input
                id="overall"
                type="number"
                min="1"
                max="99"
                value={newPlayer.overall}
                onChange={(e) => setNewPlayer({ ...newPlayer, overall: parseInt(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="baseIllness" className="text-right">
                Enfermedad Base
              </Label>
              <Textarea
                id="baseIllness"
                value={newPlayer.baseIllness}
                onChange={(e) => setNewPlayer({ ...newPlayer, baseIllness: e.target.value })}
                className="col-span-3"
                placeholder="Ingrese cualquier enfermedad base o 'Ninguna'"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddPlayer}>Agregar Jugador</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>RUT</TableHead>
            <TableHead>Ciudad</TableHead>
            <TableHead>Región</TableHead>
            <TableHead>Posición</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={player.avatar} alt={player.name} />
                  <AvatarFallback>{player.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.rut}</TableCell>
              <TableCell>{player.city}</TableCell>
              <TableCell>{player.region}</TableCell>
              <TableCell>{player.position}</TableCell>
              <TableCell>{player.category}</TableCell>
              <TableCell>
                <Button onClick={() => openPlayerDetails(player)}>Ver Detalles</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedPlayer && (
        <Dialog open={!!selectedPlayer} onOpenChange={() => setSelectedPlayer(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Detalles del Jugador</DialogTitle>
            </DialogHeader>
            <Card className="w-[300px] h-[500px] mx-auto bg-gradient-to-b from-yellow-400 to-yellow-600 text-black">
              <CardContent className="flex flex-col items-center justify-between h-full p-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={selectedPlayer.avatar} alt={selectedPlayer.name} />
                  <AvatarFallback>{selectedPlayer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-2xl font-bold">{selectedPlayer.name}</h2>
                  <p className="text-xl">{selectedPlayer.position}</p>
                </div>
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold">{selectedPlayer.overall}</span>
                </div>
                <div className="text-center">
                  <p>RUT: {selectedPlayer.rut}</p>
                  <p>Categoría: {selectedPlayer.category}</p>
                  <p>Fecha de Nacimiento: {selectedPlayer.birthDate}</p>
                  <p>Ciudad: {selectedPlayer.city}</p>
                  <p>Región: {selectedPlayer.region}</p>
                  <p>Enfermedad Base: {selectedPlayer.baseIllness || 'Ninguna'}</p>
                </div>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}