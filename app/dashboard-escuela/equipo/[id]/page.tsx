import JugadoresTable from '@/components/team/JugadoresTable';
import EstadisticasEquipo from '@/components/team//EstadisticasEquipo';

type Team = {
  id: number;
  name: string;
  players: Player[];
};

type Player = {
  id: string;
  name: string;
  position: string;
  rating: number;
};

type SchoolData = {
  name: string;
  teams: Team[];
};

const schoolData: SchoolData = {
  name: 'Escuela de Fútbol Estrella',
  teams: [
    { id: 1, name: 'Equipo Sub-15', players: [] },
    { id: 2, name: 'Equipo Sub-17', players: [] },
    { id: 3, name: 'Equipo Sub-20', players: [] },
  ],
};

export function generateStaticParams() {
  return schoolData.teams.map((team) => ({
    id: team.id.toString(),
  }));
}

interface EquipoPageProps {
  params: { id: string };
}

export default function EquipoPage({ params }: EquipoPageProps) {
  const teamId = parseInt(params.id);
  const team = schoolData.teams.find((t) => t.id === teamId);

  if (!team) {
    return <div>Equipo no encontrado</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{team.name}</h1>

      <JugadoresTable team={team} />
      <EstadisticasEquipo team={team} />
    </div>
  );
}
