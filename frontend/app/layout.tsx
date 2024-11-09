'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar"
import {  Code2, Lock, Radio, FileCode, Settings, ChevronDown, Car, LucideIcon } from "lucide-react"
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

// Define types for menu items
interface SubMenuItem {
  title: string
  href: string
  description?: string
}

interface MenuItem {
  title: string
  icon: LucideIcon
  href: string
  submenu?: SubMenuItem[]
}

// Menu Item Component props type
interface MenuItemProps {
  item: MenuItem
  isNested?: boolean
}

const menuItems: MenuItem[] = [
  {
    title: "Interactive Demo",
    icon: Car,
    href: "/",
  },
  {
    title: "API Reference",
    icon: Code2,
    href: "/api",
    submenu: [
      {
        title: "API Key",
        href: "/api/apikeys",
        description: "Create API Key"
      },
      {
        title: "Vehicles",
        href: "/api/vehicles",
        description: "Vehicle management endpoints"
      },
      {
        title: "Routes",
        href: "/api/routes",
        description: "Route planning and tracking"
      },
      {
        title: "Depots",
        href: "/api/depots",
        description: "Depot management"
      }
    ]
  },

  {
    title: "Authentication",
    icon: Lock,
    href: "/auth"
  },
  {
    title: "WebSocket Events",
    icon: Radio,
    href: "/websocket"
  },
  {
    title: "Example Code",
    icon: FileCode,
    href: "/examples",
    submenu: [
      {
        title: "Python SDK",
        href: "/examples/python"
      },
      {
        title: "JavaScript",
        href: "/examples/javascript"
      },
      {
        title: "Real-time Tracking",
        href: "/examples/tracking"
      }
    ]
  }
]

// Menu Item Component
function MenuItem({ item, isNested = false }: MenuItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const Icon = item.icon

  return (
    <div>
      <a
        href={item.href}
        onClick={(e) => {
          if (item.submenu) {
            e.preventDefault()
            setIsOpen(!isOpen)
          }
        }}
        className={`flex items-center justify-between px-4 py-2 text-sm transition-colors duration-150 hover:bg-accent hover:text-accent-foreground rounded-md ${isNested ? 'ml-4' : ''}`}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4" />}
          <span>{item.title}</span>
        </div>
        {item.submenu && (
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        )}
      </a>
      {item.submenu && isOpen && (
        <div className="mt-1 space-y-1">
          {item.submenu.map((subItem) => (
            <a
              key={subItem.href}
              href={subItem.href}
              className="flex flex-col px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground ml-6 rounded-md"
            >
              <span className="font-medium">{subItem.title}</span>
              {subItem.description && (
                <span className="text-xs text-muted-foreground">
                  {subItem.description}
                </span>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <div className="flex min-h-screen">
            <Sidebar className="border-r">
              <SidebarHeader className="p-4 border-b">
                <div className="flex items-center gap-2">
                  <div>
                    <h2 className="text-lg font-bold">AVMS.dev</h2>
                    <p className="text-xs text-muted-foreground">
                      github.com/coltspy
                    </p>
                  </div>
                </div>
              </SidebarHeader>
              
              <SidebarContent className="px-2 py-4">
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <MenuItem key={item.href} item={item} />
                  ))}
                </nav>
              </SidebarContent>

              <SidebarFooter className="p-4 border-t mt-auto">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>v1.0</span>
                  </div>
                </div>
              </SidebarFooter>
            </Sidebar>

            <main className="flex-1">
              <div className="p-4 border-b">
                <SidebarTrigger />
              </div>
              <div className="p-6">
                {children}
              </div>
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}
