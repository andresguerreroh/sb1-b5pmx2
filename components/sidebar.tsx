"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Dribbble, Users, Trophy, ClipboardList, LogOut } from 'lucide-react';

const menuItems = [
  { href: '/dashboard', icon: Dribbble, label: 'Dashboard' },
  { href: '/dashboard/escuelas', icon: Users, label: 'Escuelas' },
  { href: '/dashboard/categorias', icon: Trophy, label: 'Categorías' },
  { href: '/dashboard/jugadores', icon: ClipboardList, label: 'Jugadores' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">JOYASFUTBOL</h1>
      </div>
      <nav className="flex-1">
        <ul>
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} passHref>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname === item.href && "bg-gray-700"
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/">
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Link>
        </Button>
      </div>
    </div>
  );
}