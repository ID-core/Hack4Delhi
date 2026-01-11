"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"

export function AppHeader() {
  const router = useRouter()
  const { user } = useAuth()

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back()
    } else {
      router.push("/dashboard")
    }
  }

  const roleColors: Record<string, string> = {
    admin: "bg-blue-600 text-white",
    hr: "bg-teal-600 text-white",
    manager: "bg-indigo-600 text-white",
    employee: "bg-slate-500 text-white",
  }

  const roleLabel: Record<string, string> = {
    admin: "Administrator",
    hr: "HR Manager",
    manager: "Manager",
    employee: "Employee",
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2 text-slate-600 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back</span>
          </Button>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-blue-900">Nigam Seva</h2>
            <p className="text-xs text-slate-600">Unified HRMS for MCD</p>
          </div>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end gap-1">
              <p className="text-sm font-medium text-slate-900">{user.name}</p>
              <Badge className={`${roleColors[user.role] || "bg-slate-500"} text-xs px-2`}>
                {roleLabel[user.role] || user.role}
              </Badge>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
