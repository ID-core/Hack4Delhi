"use client"

import React, { useMemo } from "react"
import { useAuth } from "@/lib/auth-context"
import { mockUsers } from "@/lib/mock-data"
import type { User } from "@/types"
import { HierarchyTree } from "@/components/hierarchy-tree"
import { Button } from "@/components/ui/button"
import { AlertCircle, ShieldAlert, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface HierarchyNode {
  user: User
  children: HierarchyNode[]
}

export default function AdministrationPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  // Access control - only HR, Manager, and Admin can access
  const canAccess = useMemo(() => {
    if (!user) return false
    return ["admin", "manager", "hr"].includes(user.role)
  }, [user])

  // Build hierarchy based on user role
  const hierarchyData = useMemo(() => {
    if (!user) return []

    const buildHierarchy = (parentUser: User | null, filterRole?: string): HierarchyNode[] => {
      const childrenUsers = mockUsers.filter((u) => {
        if (filterRole && u.role !== filterRole) return false

        if (parentUser?.role === "admin") {
          return u.role === "manager"
        } else if (parentUser?.role === "manager") {
          return u.role === "hr" && u.managerId === parentUser.id
        } else if (parentUser?.role === "hr") {
          return u.role === "employee" && u.hrId === parentUser.id
        }
        return false
      })

      return childrenUsers.map((child) => ({
        user: child,
        children:
          user.role === "admin" || user.role === "manager" || user.role === "hr"
            ? buildHierarchy(child)
            : [],
      }))
    }

    if (user.role === "admin") {
      // Admin sees all managers
      return buildHierarchy(user, "manager")
    } else if (user.role === "manager") {
      // Manager sees only their HRs and their employees
      return buildHierarchy(user, "hr")
    } else if (user.role === "hr") {
      // HR sees only their employees
      return buildHierarchy(user, "employee")
    }

    return []
  }, [user])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-slate-600">Loading...</div>
      </div>
    )
  }

  if (!canAccess) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md">
          <div className="rounded-lg border-2 border-red-200 bg-red-50 p-8 text-center space-y-4">
            <ShieldAlert className="h-12 w-12 text-red-600 mx-auto" />
            <h1 className="text-xl font-bold text-red-900">Access Denied</h1>
            <p className="text-red-800">
              You don't have permission to access the Administration dashboard. Only HR, Managers, and Admins can view this page.
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  const getRoleTitle = (role: string) => {
    switch (role) {
      case "admin":
        return "System Administrator View"
      case "manager":
        return "Manager View"
      case "hr":
        return "HR Specialist View"
      default:
        return "Administration Dashboard"
    }
  }

  const getDescription = (role: string) => {
    switch (role) {
      case "admin":
        return "View the complete organizational hierarchy: Managers, HRs, and Employees"
      case "manager":
        return "View your assigned HRs and their Employees"
      case "hr":
        return "View your assigned Employees"
      default:
        return ""
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Back Button */}
      <div className="border-b border-slate-200 bg-white p-4 px-8">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Header */}
      <div className="border-b border-slate-200 bg-white p-8">
        <div className="max-w-7xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{getRoleTitle(user?.role || "")}</h1>
            <p className="text-slate-600 mt-2">{getDescription(user?.role || "")}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          {hierarchyData.length === 0 ? (
            <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
              <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No Records Found</h3>
              <p className="text-slate-600">
                {user?.role === "hr"
                  ? "You have no employees assigned yet"
                  : user?.role === "manager"
                    ? "You have no HRs assigned yet"
                    : "No managers found in the system"}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Info Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-600 text-sm font-semibold">Role</p>
                  <p className="text-lg font-bold text-blue-900 capitalize mt-1">{user?.role}</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-600 text-sm font-semibold">You are viewing</p>
                  <p className="text-lg font-bold text-green-900 mt-1">
                    {user?.role === "admin" ? "All Managers" : user?.role === "manager" ? "Your HRs" : "Your Employees"}
                  </p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-purple-600 text-sm font-semibold">Total Count</p>
                  <p className="text-lg font-bold text-purple-900 mt-1">
                    {hierarchyData.reduce((count, node) => {
                      const countChildren = (n: HierarchyNode): number => {
                        return 1 + n.children.reduce((sum, child) => sum + countChildren(child), 0)
                      }
                      return count + countChildren(node)
                    }, 0)}
                  </p>
                </div>
              </div>

              {/* Hierarchy Tree */}
              <div className="bg-white rounded-lg border border-slate-200 p-8">
                <HierarchyTree nodes={hierarchyData} currentUser={user!} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
