// components/app-sidebar.tsx
'use client'
import { Home, Play, Code2, Lock, Radio, FileCode, Book, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar"

const documentationItems = [
  {
    title: "Interactive Demo",  // This will show our vehicle demo
    url: "/",
    icon: Play,
  },
  {
    title: "API Reference",
    url: "/api",
    icon: Code2,
    subItems: [
      { title: "Vehicles", url: "/api/vehicles" },
      { title: "Rides", url: "/api/rides" },
      { title: "Depots", url: "/api/depots" },
    ]
  },
  {
    title: "Getting Started",
    url: "/docs/getting-started",
    icon: Book,
  },
  {
    title: "Authentication",
    url: "/docs/auth",
    icon: Lock,
  },
  {
    title: "WebSocket Events",
    url: "/docs/websockets",
    icon: Radio,
  },
  {
    title: "Example Code",
    url: "/docs/examples",
    icon: FileCode,
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-bold">ACMS API</h2>
        <p className="text-sm text-muted-foreground">
          Autonomous Car Management System
        </p>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Documentation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {documentationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span className="text-sm">v1.0.0</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}