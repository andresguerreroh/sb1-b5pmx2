// /dashboard-escuela/equipo/[id]/JugadoresTable.tsx
'use client';

import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface JugadoresTableProps {
  team: {
    players: {
      id: string;
      name: string;
      position: string;
      rating: number;
    }[];
  };
}

export default function JugadoresTable({ team }: JugadoresTableProps) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Posición</TableHead>
            <TableHead>Valoración</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {team.players.map((player) => (
            <TableRow key={player.id}>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.position}</TableCell>
              <TableCell>{player.rating}</TableCell>
              <TableCell>
                <Button asChild>
                  <Link href={`/dashboard-escuela/jugador/${player.id}`}>
                    Ver Detalles
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
