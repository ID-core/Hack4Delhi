"use client"

import React, { useMemo } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { mockUsers, mockAppraisals } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, AlertCircle, CheckCircle2, Clock, Activity, ArrowLeft } from "lucide-react"

export default function ManagerDashboardPage() {
  const router = useRouter()
  const { user } = useAuth()

  // Get direct reports (employees under manager)
  const directReports = useMemo(() => {
    if (!user || user.role !== "manager") return []
    
    // Get all HRs under this manager
    const managedHRs = mockUsers.filter(u => u.managerId === user.id && u.role === "hr")
    const hrIds = managedHRs.map(hr => hr.id)
    
    // Get all employees under those HRs
    const employees = mockUsers.filter(e => 
      e.role === "employee" && hrIds.includes(e.hrId || "")
    )
    
    return employees
  }, [user])

  // Get performance data for direct reports
  const teamPerformance = useMemo(() => {
    return directReports.map(emp => {
      const appraisal = mockAppraisals.find(a => a.employeeId === emp.employeeId)
      return {
        employee: emp,
        appraisal: appraisal,
      }
    })
  }, [directReports])

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      type: "appraisal_submitted",
      title: "Appraisal Submitted",
      description: "EMP001 submitted their performance appraisal",
      timestamp: "2 hours ago",
      icon: CheckCircle2,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "goal_achieved",
      title: "Goal Milestone",
      description: "EMP003 achieved their Q4 performance goal",
      timestamp: "5 hours ago",
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "attendance_alert",
      title: "Attendance Alert",
      description: "EMP006 has low attendance compliance (82%)",
      timestamp: "1 day ago",
      icon: AlertCircle,
      color: "text-orange-600",
    },
  ]

  // Performance goals
  const performanceGoals = [
    {
      id: 1,
      title: "Improve Team Attendance",
      target: "95%",
      current: "89%",
      description: "Achieve 95% average team attendance",
      progress: 89,
    },
    {
      id: 2,
      title: "Goal Achievement Rate",
      target: "100%",
      current: "75%",
      description: "Ensure all team members achieve their goals",
      progress: 75,
    },
    {
      id: 3,
      title: "Performance Score",
      target: "85+",
      current: "82",
      description: "Maintain average team performance score",
      progress: 82,
    },
  ]

  const avgTeamScore = teamPerformance.length > 0
    ? Math.round(
        teamPerformance.reduce((sum, tp) => sum + (tp.appraisal?.finalScore || 0), 0) /
          teamPerformance.length
      )
    : 0

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="gap-2 mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div>
        <h1 className="text-4xl font-bold text-slate-900">Manager Dashboard</h1>
        <p className="text-slate-600 mt-2 font-medium">Team performance overview and management</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Direct Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{directReports.length}</div>
            <p className="text-xs text-slate-600 mt-2">Team members under management</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Avg Team Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-teal-600">{avgTeamScore}/100</div>
            <Progress value={avgTeamScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Appraisals Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {teamPerformance.filter(tp => tp.appraisal?.status === "submitted" || tp.appraisal?.status === "draft").length}
            </div>
            <p className="text-xs text-slate-600 mt-2">Awaiting review</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Completed Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {teamPerformance.reduce((sum, tp) => 
                sum + (tp.appraisal?.goals?.filter(g => g.status === "completed").length || 0), 0
              )}
            </div>
            <p className="text-xs text-slate-600 mt-2">Team achievements</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Recent Activities */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest team activities and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => {
              const IconComponent = activity.icon
              return (
                <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                  <div className={`p-2 rounded-lg bg-slate-50 ${activity.color}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-slate-900">{activity.title}</p>
                    <p className="text-xs text-slate-600 mt-1">{activity.description}</p>
                    <p className="text-xs text-slate-500 mt-2">{activity.timestamp}</p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Performance Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Goals</CardTitle>
            <CardDescription>Team quarterly targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {performanceGoals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{goal.title}</p>
                    <p className="text-xs text-slate-600 mt-1">{goal.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <Progress value={goal.progress} className="flex-1" />
                  <span className="text-xs font-medium text-slate-700 w-12 text-right">{goal.current}/{goal.target}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Team Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Performance Overview</CardTitle>
          <CardDescription>Performance metrics for all direct reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left font-semibold text-slate-700 pb-3 px-4">Employee</th>
                  <th className="text-left font-semibold text-slate-700 pb-3 px-4">Final Score</th>
                  <th className="text-left font-semibold text-slate-700 pb-3 px-4">Self Rating</th>
                  <th className="text-left font-semibold text-slate-700 pb-3 px-4">Manager Rating</th>
                  <th className="text-left font-semibold text-slate-700 pb-3 px-4">Status</th>
                  <th className="text-left font-semibold text-slate-700 pb-3 px-4">Goals</th>
                </tr>
              </thead>
              <tbody>
                {teamPerformance.map((tp) => (
                  <tr key={tp.employee.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3">{tp.employee.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold">{tp.appraisal?.finalScore || "—"}</div>
                        {tp.appraisal && (
                          <Progress value={tp.appraisal.finalScore} className="w-16" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{tp.appraisal?.selfScore || "—"}</td>
                    <td className="px-4 py-3 text-sm">{tp.appraisal?.managerScore || "—"}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          tp.appraisal?.status === "completed"
                            ? "default"
                            : tp.appraisal?.status === "submitted"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {tp.appraisal?.status || "no-data"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {tp.appraisal?.goals?.length || 0} goals
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
