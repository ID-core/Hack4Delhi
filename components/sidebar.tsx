"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Clock,
  DollarSign,
  ArrowRightLeft,
  FileText,
  Settings,
  LogOut,
  AlertCircle,
  MessageSquare,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles: string[]
  section?: string
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["employee", "manager", "hr", "admin"],
    section: "main",
  },
  {
    title: "My Profile",
    href: "/profile",
    icon: Users,
    roles: ["employee", "manager", "hr", "admin"],
    section: "main",
  },
  {
    title: "Performance",
    href: "/appraisal",
    icon: ClipboardCheck,
    roles: ["employee", "manager", "hr", "admin"],
    section: "hr",
  },
  {
    title: "Attendance",
    href: "/attendance",
    icon: Clock,
    roles: ["employee", "manager", "hr", "admin"],
    section: "hr",
  },
  {
    title: "Leave Management",
    href: "/leaves",
    icon: FileText,
    roles: ["employee", "manager", "hr", "admin"],
    section: "hr",
  },
  {
    title: "Transfer Requests",
    href: "/transfers",
    icon: ArrowRightLeft,
    roles: ["employee", "manager", "hr", "admin"],
    section: "hr",
  },
  {
    title: "Dashboard",
    href: "/hr",
    icon: Settings,
    roles: ["hr", "admin"],
    section: "admin",
  },
  {
    title: "Manager Dashboard",
    href: "/manager-dashboard",
    icon: LayoutDashboard,
    roles: ["manager", "admin"],
    section: "admin",
  },
  {
    title: "Administration",
    href: "/administration",
    icon: Users,
    roles: ["hr", "manager", "admin"],
    section: "admin",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const filteredNavItems = navItems.filter((item) => item.roles.includes(user?.role || ""))

  const groupedItems = {
    main: filteredNavItems.filter((i) => i.section === "main"),
    hr: filteredNavItems.filter((i) => i.section === "hr"),
    admin: filteredNavItems.filter((i) => i.section === "admin"),
  }

  return (
    <div className="flex h-full w-64 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-6">
        <h1 className="text-lg font-bold text-blue-900">Nigam Seva</h1>
        <p className="text-xs text-slate-600 mt-1 font-medium">Unified HRMS for MCD</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Main Section */}
        {groupedItems.main.length > 0 && (
          <div>
            {groupedItems.main.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all mb-2",
                    isActive
                      ? "bg-blue-50 text-blue-900 border-l-4 border-blue-600"
                      : "text-slate-700 hover:bg-slate-50 hover:text-blue-900",
                  )}
                >
                  <Icon className={cn("h-5 w-5", isActive ? "text-blue-600" : "text-slate-600")} />
                  {item.title}
                </Link>
              )
            })}
          </div>
        )}

        {/* HR Section */}
        {groupedItems.hr.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-3 mb-3">HR Services</p>
            {groupedItems.hr.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all mb-2",
                    isActive
                      ? "bg-teal-50 text-teal-900 border-l-4 border-teal-600"
                      : "text-slate-700 hover:bg-slate-50 hover:text-teal-900",
                  )}
                >
                  <Icon className={cn("h-5 w-5", isActive ? "text-teal-600" : "text-slate-600")} />
                  {item.title}
                </Link>
              )
            })}
          </div>
        )}

        {/* Admin Section */}
        {groupedItems.admin.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-3 mb-3">Administration</p>
            {groupedItems.admin.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all mb-2",
                    isActive
                      ? "bg-indigo-50 text-indigo-900 border-l-4 border-indigo-600"
                      : "text-slate-700 hover:bg-slate-50 hover:text-indigo-900",
                  )}
                >
                  <Icon className={cn("h-5 w-5", isActive ? "text-indigo-600" : "text-slate-600")} />
                  {item.title}
                </Link>
              )
            })}
          </div>
        )}
      </nav>

      <div className="border-t border-slate-200 p-4 space-y-4">
        <div className="rounded-lg bg-slate-50 p-3 border border-slate-200">
          <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
          <p className="text-xs text-slate-600 mt-1">{user?.designation}</p>
          <p className="text-xs text-slate-600 mt-0.5 font-medium">ID: {user?.employeeId}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:text-slate-900 font-medium"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
