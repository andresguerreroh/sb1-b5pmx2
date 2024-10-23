// /dashboard-escuela/equipo/[id]/EstadisticasEquipo.tsx
'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface EstadisticasEquipoProps {
  team: {
    players: {
      id: string;
      name: string;
      position: string;
      rating: number;
    }[];
  };
}

export default function EstadisticasEquipo({ team }: EstadisticasEquipoProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={team.players}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="position" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="rating" fill="#8884d8" name="Valoración" />
      </BarChart>
    </ResponsiveContainer>
  );
}
