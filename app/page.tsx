import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dribbble } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Dribbble className="w-24 h-24 mb-8 text-yellow-400" />
      <h1 className="text-5xl font-bold mb-4">JOYASFUTBOL</h1>
      <p className="text-xl mb-8">Descubre el talento del fútbol chileno</p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/login">Iniciar Sesión</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/register">Registrarse</Link>
        </Button>
      </div>
    </div>
  );
}