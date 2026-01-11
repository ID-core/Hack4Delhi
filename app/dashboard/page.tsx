"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DashboardSummaryCards } from "@/components/dashboard-summary-cards"
import { mockAppraisals, mockAttendance, mockTransfers, mockLeaves } from "@/lib/mock-data"
import { Calendar, TrendingUp, MapPin, FileText, CheckCircle2, AlertCircle } from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()

  const userAppraisal = mockAppraisals.find((a) => a.employeeId === user?.employeeId)
  const userAttendance = mockAttendance.filter((a) => a.employeeId === user?.employeeId)
  const userTransfers = mockTransfers.filter((t) => t.employeeId === user?.employeeId)
  const userLeaves = mockLeaves.filter((l) => l.employeeId === user?.employeeId)

  const attendanceRate =
    userAttendance.length > 0
      ? (userAttendance.filter((a) => a.status === "present").length / userAttendance.length) * 100
      : 0

  const geoHazriCompliance = userAppraisal?.geoHazriCompliance || 0

  const summaryCards = [
    {
      title: "Performance Score",
      value: `${userAppraisal?.finalScore || 0}/100`,
      subtitle: userAppraisal?.status === "completed" ? "Completed for 2026" : "In progress",
      icon: TrendingUp,
      color: "blue" as const,
    },
    {
      title: "Attendance Rate",
      value: `${attendanceRate.toFixed(1)}%`,
      subtitle: `${userAttendance.length} days recorded`,
      icon: Calendar,
      color: "teal" as const,
    },
    {
      title: "Geo-Hazri Compliance",
      value: `${geoHazriCompliance}%`,
      subtitle: "Location verification rate",
      icon: CheckCircle2,
      color: "green" as const,
    },
    {
      title: "Pending Actions",
      value: userTransfers.filter((t) => t.status === "pending").length +
        userLeaves.filter((l) => l.status === "pending").length,
      subtitle: "Requests awaiting approval",
      icon: AlertCircle,
      color: "amber" as const,
    },
  ]

  const hasAnyActivity = userLeaves.length > 0 || userTransfers.length > 0

  const goalsToShow = (userAppraisal?.goals && userAppraisal.goals.length > 0)
    ? userAppraisal.goals
    : [
        {
          id: "gfa1",
          description: "Submit self appraisal",
          targetDate: "2026-12-31",
          status: "in-progress" as const,
        },
        {
          id: "gfa2",
          description: "Achieve 95% attendance compliance",
          targetDate: "2026-12-31",
          status: "not-started" as const,
        },
      ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Welcome back, {user?.name}</h1>
        <p className="text-slate-600 mt-2 font-medium">Here's your performance overview</p>
      </div>

      <DashboardSummaryCards cards={summaryCards} />

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Recent Activity</CardTitle>
            <CardDescription className="text-slate-600">Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userLeaves.slice(0, 3).map((leave) => (
              <div key={leave.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <FileText className="h-5 w-5 text-teal-600 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">Leave Application</p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {leave.type} leave from {leave.fromDate} to {leave.toDate}
                  </p>
                  <Badge
                    variant={
                      leave.status === "approved"
                        ? "default"
                        : leave.status === "rejected"
                          ? "destructive"
                          : "secondary"
                    }
                    className="mt-2 text-xs"
                  >
                    {leave.status}
                  </Badge>
                </div>
              </div>
            ))}

            {userTransfers.slice(0, 2).map((transfer) => (
              <div key={transfer.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <MapPin className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">Transfer Request</p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {transfer.fromLocation} → {transfer.toLocation}
                  </p>
                  <Badge
                    variant={
                      transfer.status === "approved"
                        ? "default"
                        : transfer.status === "rejected"
                          ? "destructive"
                          : "secondary"
                    }
                    className="mt-2 text-xs"
                  >
                    {transfer.status}
                  </Badge>
                </div>
              </div>
            ))}

            {(!hasAnyActivity) && (
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-slate-500 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">No recent activity</p>
                  <p className="text-xs text-slate-600 mt-0.5">Your updates will appear here.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Performance Goals</CardTitle>
            <CardDescription className="text-slate-600">Your current objectives for 2026</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {goalsToShow.map((goal) => (
              <div key={goal.id} className="space-y-2 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-slate-900 leading-relaxed">{goal.description}</p>
                  <Badge
                    variant={
                      goal.status === "completed" ? "default" : goal.status === "in-progress" ? "secondary" : "outline"
                    }
                    className="shrink-0 text-xs"
                  >
                    {goal.status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600">Target: {goal.targetDate}</p>
                {goal.selfRating && (
                  <div className="flex items-center gap-2">
                    <Progress value={goal.selfRating * 10} className="flex-1" />
                    <span className="text-xs text-slate-600">{goal.selfRating}/10</span>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
