"use client"

import React, { useState } from "react"
import type { User } from "@/types"
import { ChevronDown, ChevronRight, Shield, Users, Briefcase, User as UserIcon, X, Mail, Phone, MapPin, Calendar, Award } from "lucide-react"
import { cn } from "@/lib/utils"

interface HierarchyNode {
  user: User
  children: HierarchyNode[]
}

interface HierarchyTreeProps {
  nodes: HierarchyNode[]
  currentUser: User
}

export function HierarchyTree({ nodes, currentUser }: HierarchyTreeProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  return (
    <>
      <div className="space-y-4">
        {nodes.map((node) => (
          <HierarchyNode 
            key={node.user.id} 
            node={node} 
            currentUser={currentUser} 
            depth={0}
            onUserClick={setSelectedUser}
          />
        ))}
      </div>

      {/* Performance Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{selectedUser.name}</h2>
                <p className="text-sm text-slate-600 mt-1">{selectedUser.designation}</p>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-slate-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-slate-600 font-semibold">Employee ID</p>
                  <p className="text-sm text-slate-900">{selectedUser.employeeId}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-600 font-semibold">Role</p>
                  <span className={cn(
                    "inline-block px-2.5 py-1 rounded-full text-xs font-semibold",
                    selectedUser.role === "admin" && "bg-amber-100 text-amber-800",
                    selectedUser.role === "manager" && "bg-blue-100 text-blue-800",
                    selectedUser.role === "hr" && "bg-green-100 text-green-800",
                    selectedUser.role === "employee" && "bg-slate-100 text-slate-800"
                  )}>
                    {selectedUser.role.toUpperCase()}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-600 font-semibold">Department</p>
                  <p className="text-sm text-slate-900">{selectedUser.department}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-600 font-semibold">Joining Date</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-500" />
                    <p className="text-sm text-slate-900">{new Date(selectedUser.joiningDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <p className="text-sm text-slate-900">{selectedUser.email}</p>
                  </div>
                  {selectedUser.assignedLocation && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-slate-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-900">{selectedUser.assignedLocation.name}</p>
                        <p className="text-xs text-slate-600">
                          {selectedUser.assignedLocation.lat.toFixed(4)}, {selectedUser.assignedLocation.lng.toFixed(4)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  Performance Overview
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-xs text-blue-600 font-semibold mb-1">Attendance</p>
                    <p className="text-2xl font-bold text-blue-900">
                      {selectedUser.role === "employee" ? "92%" : "95%"}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">Last 30 days</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-xs text-green-600 font-semibold mb-1">Performance</p>
                    <p className="text-2xl font-bold text-green-900">
                      {selectedUser.role === "admin" ? "98%" : selectedUser.role === "manager" ? "95%" : selectedUser.role === "hr" ? "93%" : "88%"}
                    </p>
                    <p className="text-xs text-green-700 mt-1">Overall rating</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <p className="text-xs text-purple-600 font-semibold mb-1">Tasks</p>
                    <p className="text-2xl font-bold text-purple-900">
                      {selectedUser.role === "employee" ? "24/30" : selectedUser.role === "hr" ? "18/20" : "12/15"}
                    </p>
                    <p className="text-xs text-purple-700 mt-1">Completed</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-900 font-medium">Checked in on time</p>
                      <p className="text-xs text-slate-600">Today at 9:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-900 font-medium">Completed performance review</p>
                      <p className="text-xs text-slate-600">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-900 font-medium">Updated profile information</p>
                      <p className="text-xs text-slate-600">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="border-t border-slate-200 pt-6">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function HierarchyNode({ 
  node, 
  currentUser, 
  depth,
  onUserClick 
}: { 
  node: HierarchyNode
  currentUser: User
  depth: number
  onUserClick: (user: User) => void
}) {
  const [isExpanded, setIsExpanded] = useState(depth < 2)

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4 text-amber-600" />
      case "manager":
        return <Briefcase className="h-4 w-4 text-blue-600" />
      case "hr":
        return <Users className="h-4 w-4 text-green-600" />
      case "employee":
        return <UserIcon className="h-4 w-4 text-slate-600" />
      default:
        return null
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-amber-100 text-amber-800"
      case "manager":
        return "bg-blue-100 text-blue-800"
      case "hr":
        return "bg-green-100 text-green-800"
      case "employee":
        return "bg-slate-100 text-slate-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const hasChildren = node.children.length > 0

  return (
    <div className="space-y-2">
      {/* Node Header */}
      <div className="flex items-center gap-2">
        {hasChildren ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-0.5 hover:bg-slate-100 rounded transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-slate-600" />
            ) : (
              <ChevronRight className="h-4 w-4 text-slate-600" />
            )}
          </button>
        ) : (
          <div className="w-5" />
        )}

        {/* User Card */}
        <button
          onClick={() => onUserClick(node.user)}
          className={cn(
            "flex-1 flex items-center gap-3 px-4 py-3 rounded-lg border transition-all hover:shadow-md",
            "bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50",
            depth > 0 && "bg-slate-50",
            "cursor-pointer text-left w-full"
          )}
        >
          {getRoleIcon(node.user.role)}
          <div className="flex-1">
            <p className="font-semibold text-slate-900">{node.user.name}</p>
            <p className="text-xs text-slate-600">{node.user.designation}</p>
          </div>
          <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold", getRoleBadgeColor(node.user.role))}>
            {node.user.role}
          </span>
        </button>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="ml-6 border-l-2 border-slate-200 pl-0">
          <div className="space-y-2">
            {node.children.map((child) => (
              <HierarchyNode 
                key={child.user.id} 
                node={child} 
                currentUser={currentUser} 
                depth={depth + 1}
                onUserClick={onUserClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
