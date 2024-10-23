"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast"

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual authentication logic
    console.log('Login attempt:', { email, password });
    
    // Simular autenticación basada en el correo electrónico
    if (email === 'admin@example.com') {
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido, Administrador",
      })
      router.push('/dashboard');
    } else if (email === 'escuela@example.com') {
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido, Encargado de Escuela",
      })
      router.push('/dashboard-escuela');
    } else {
      toast({
        title: "Error de inicio de sesión",
        description: "Credenciales inválidas",
        variant: "destructive",
      })
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Iniciar Sesión</CardTitle>
          <CardDescription>Ingresa a tu cuenta de JOYASFUTBOL</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push('/')}>Cancelar</Button>
          <Button onClick={handleSubmit}>Ingresar</Button>
        </CardFooter>
      </Card>
    </div>
  );
}