import { SidebarEscuela } from '@/components/sidebar-escuela';

export default function DashboardEscuelaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-900">
      <SidebarEscuela />
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}