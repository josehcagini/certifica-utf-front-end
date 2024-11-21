import {
  BadgeIcon as Certificate,
  Home,
  Plus,
  Settings,
  Trophy,
} from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { authOptions } from '@/services/auth/nextAuth/authOptions'

export async function AppSidebar() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) return null

  return (
    <Sidebar>
      <SidebarHeader>
        <Link className="flex items-center gap-2 px-4 font-semibold" href="#">
          <Trophy className="h-6 w-6" />
          <span>CertificaUTF</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <Trophy className="h-4 w-4" />
                <span>Eventos</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <Certificate className="h-4 w-4" />
                <span>Certificados</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <Settings className="h-4 w-4" />
                <span>Configurações</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <Plus className="h-4 w-4" />
                <span>Criar evento</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
