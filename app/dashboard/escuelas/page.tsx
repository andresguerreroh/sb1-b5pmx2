"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

// Dummy data for schools
const initialSchools = [
  { id: 1, name: "Escuela de Fútbol Estrella", city: "Santiago", logo: "https://example.com/logo1.png" },
  { id: 2, name: "Academia Goleadores", city: "Valparaíso", logo: "https://example.com/logo2.png" },
  { id: 3, name: "Club Deportivo Campeones", city: "Concepción", logo: "https://example.com/logo3.png" },
]

export default function EscuelasPage() {
  const [schools, setSchools] = useState(initialSchools)
  const [newSchool, setNewSchool] = useState({ name: '', city: '', logo: '' })
  const { toast } = useToast()

  const handleAddSchool = () => {
    const id = schools.length + 1
    setSchools([...schools, { id, ...newSchool }])
    setNewSchool({ name: '', city: '', logo: '' })
    toast({
      title: "Escuela agregada",
      description: `${newSchool.name} ha sido agregada exitosamente.`,
    })
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Escuelas de Fútbol</h1>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button>Agregar Escuela</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nueva Escuela</DialogTitle>
            <DialogDescription>
              Ingrese los detalles de la nueva escuela de fútbol.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                value={newSchool.name}
                onChange={(e) => setNewSchool({ ...newSchool, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                Ciudad
              </Label>
              <Input
                id="city"
                value={newSchool.city}
                onChange={(e) => setNewSchool({ ...newSchool, city: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="logo" className="text-right">
                Logo URL
              </Label>
              <Input
                id="logo"
                value={newSchool.logo}
                onChange={(e) => setNewSchool({ ...newSchool, logo: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddSchool}>Agregar Escuela</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Ciudad</TableHead>
            <TableHead>Logo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schools.map((school) => (
            <TableRow key={school.id}>
              <TableCell>{school.id}</TableCell>
              <TableCell>{school.name}</TableCell>
              <TableCell>{school.city}</TableCell>
              <TableCell>
                <img src={school.logo} alt={`Logo de ${school.name}`} className="w-10 h-10 object-cover rounded-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}