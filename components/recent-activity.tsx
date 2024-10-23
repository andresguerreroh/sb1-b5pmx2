import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    name: "Juan Pérez",
    action: "se unió a la categoría Sub-17",
    timestamp: "hace 2 horas",
    avatar: "JP"
  },
  {
    name: "María González",
    action: "anotó 2 goles en el último partido",
    timestamp: "hace 5 horas",
    avatar: "MG"
  },
  {
    name: "Carlos Rodríguez",
    action: "fue promovido a la categoría Sub-20",
    timestamp: "hace 1 día",
    avatar: "CR"
  },
  {
    name: "Ana Martínez",
    action: "recibió una calificación de 9.5",
    timestamp: "hace 2 días",
    avatar: "AM"
  }
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/${activity.avatar}.png`} alt={activity.name} />
            <AvatarFallback>{activity.avatar}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.name}</p>
            <p className="text-sm text-muted-foreground">
              {activity.action}
            </p>
            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}