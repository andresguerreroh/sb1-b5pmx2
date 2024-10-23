"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

// Dummy data for categories
const initialCategories = [
  { id: 1, name: "Sub-20", ageRange: "18-20 años" },
  { id: 2, name: "Sub-17", ageRange: "15-17 años" },
  { id: 3, name: "Sub-15", ageRange: "13-15 años" },
]

export default function CategoriasPage() {
  const [categories, setCategories] = useState(initialCategories)
  const [newCategory, setNewCategory] = useState({ name: '', ageRange: '' })
  const { toast } = useToast()

  const handleAddCategory = () => {
    const id = categories.length + 1
    setCategories([...categories, { id, ...newCategory }])
    setNewCategory({ name: '', ageRange: '' })
    toast({
      title: "Categoría agregada",
      description: `${newCategory.name} ha sido agregada exitosamente.`,
    })
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Categorías</h1>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button>Agregar Categoría</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nueva Categoría</DialogTitle>
            <DialogDescription>
              Ingrese los detalles de la nueva categoría.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ageRange" className="text-right">
                Rango de Edad
              </Label>
              <Input
                id="ageRange"
                value={newCategory.ageRange}
                onChange={(e) => setNewCategory({ ...newCategory, ageRange: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddCategory}>Agregar Categoría</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Rango de Edad</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.ageRange}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}