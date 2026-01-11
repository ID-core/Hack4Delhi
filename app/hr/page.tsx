"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockUsers, mockAppraisals, mockTransfers, mockAttendance } from "@/lib/mock-data"
import type { LeaveRequest } from "@/types"
import { getPendingForRole, approveLeave, rejectLeave, getStoreSnapshot } from "@/lib/leave-service"
import { Users, TrendingUp, MapPin, FileText, AlertTriangle, CheckCircle2, ArrowLeft } from "lucide-react"
import { EmployeeList } from "@/components/employee-list"
import { AppraisalQueue } from "@/components/appraisal-queue"
import { TransferQueue } from "@/components/transfer-queue"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"

export default function HRPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [pendingLeavesList, setPendingLeavesList] = useState<LeaveRequest[]>([])
  const [allLeaves, setAllLeaves] = useState<LeaveRequest[]>([])

  const totalEmployees = mockUsers.filter((u) => u.role === "employee" || u.role === "manager").length
  const pendingAppraisals = mockAppraisals.filter((a) => a.status !== "completed").length
  const pendingTransfers = mockTransfers.filter((t) => t.status === "pending").length
  const pendingLeaves = pendingLeavesList.length

  // Load pending leaves for HR
  useEffect(() => {
    const pending = getPendingForRole("hr")
    setPendingLeavesList(pending)
    setAllLeaves(getStoreSnapshot())
    console.log("HR pending leaves:", pending)
    console.log("All leaves in store:", getStoreSnapshot())
  }, [])

  // Refresh pending leaves every 2 seconds to pick up new applications
  useEffect(() => {
    const interval = setInterval(() => {
      const pending = getPendingForRole("hr")
      setPendingLeavesList(pending)
      setAllLeaves(getStoreSnapshot())
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const avgAttendanceRate =
    mockUsers
      .filter((u) => u.role === "employee")
      .reduce((acc, user) => {
        const userAttendance = mockAttendance.filter((a) => a.employeeId === user.employeeId)
        const rate =
          userAttendance.length > 0
            ? (userAttendance.filter((a) => a.status === "present").length / userAttendance.length) * 100
            : 0
        return acc + rate
      }, 0) / mockUsers.filter((u) => u.role === "employee").length

  const avgGeoCompliance =
    mockUsers
      .filter((u) => u.role === "employee")
      .reduce((acc, user) => {
        const userAttendance = mockAttendance.filter((a) => a.employeeId === user.employeeId)
        const rate =
          userAttendance.length > 0
            ? (userAttendance.filter((a) => a.geoHazriCompliant).length / userAttendance.length) * 100
            : 0
        return acc + rate
      }, 0) / mockUsers.filter((u) => u.role === "employee").length

  return (
    <div className="p-6 space-y-6">
      {/* DEBUG: Show store contents */}
      <div className="bg-blue-50 border border-blue-200 p-3 rounded text-xs">
        <p className="font-mono">DEBUG: Total leaves in store: {allLeaves.length} | Pending for HR: {pendingLeavesList.length}</p>
        {allLeaves.map((r) => (
          <p key={r.id} className="font-mono text-xs">
            - {r.employeeId} | {r.type} | approver: {r.currentApproverRole} | status: {r.status}
          </p>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">HR Admin Dashboard</h1>
          <p className="text-slate-600 mt-2 font-medium">Manage employees, appraisals, and organizational workflows</p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
            <CardTitle className="text-sm font-semibold text-slate-700">Total Employees</CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{totalEmployees}</div>
            <p className="text-xs text-slate-600 mt-1 font-medium">Active workforce</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
            <CardTitle className="text-sm font-semibold text-slate-700">Pending Appraisals</CardTitle>
            <TrendingUp className="h-5 w-5 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">{pendingAppraisals}</div>
            <p className="text-xs text-slate-600 mt-1 font-medium">Awaiting completion</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
            <CardTitle className="text-sm font-semibold text-slate-700">Pending Transfers</CardTitle>
            <MapPin className="h-5 w-5 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-teal-600">{pendingTransfers}</div>
            <p className="text-xs text-slate-600 mt-1 font-medium">Review required</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
            <CardTitle className="text-sm font-semibold text-slate-700">Pending Leaves</CardTitle>
            <FileText className="h-5 w-5 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-600">{pendingLeaves}</div>
            <p className="text-xs text-slate-600 mt-1 font-medium">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Organizational Health</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Average Attendance Rate</span>
                <span className="text-sm font-medium">{avgAttendanceRate.toFixed(1)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${avgAttendanceRate}%` }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Geo-Hazri Compliance</span>
                <span className="text-sm font-medium">{avgGeoCompliance.toFixed(1)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${avgGeoCompliance >= 95 ? "bg-green-600" : "bg-yellow-600"}`}
                  style={{ width: `${avgGeoCompliance}%` }}
                />
              </div>
            </div>

            <div className="pt-2 space-y-2">
              {avgGeoCompliance < 95 && (
                <div className="flex items-start gap-2 text-sm text-yellow-600">
                  <AlertTriangle className="h-4 w-4 mt-0.5" />
                  <span>Geo-hazri compliance below target (95%)</span>
                </div>
              )}
              {avgGeoCompliance >= 95 && (
                <div className="flex items-start gap-2 text-sm text-green-600">
                  <CheckCircle2 className="h-4 w-4 mt-0.5" />
                  <span>All metrics within acceptable range</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Performance flags and governance issues</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockAppraisals
              .filter((a) => a.attendanceImpact < 0 || a.geoHazriCompliance < 95)
              .slice(0, 3)
              .map((appraisal, index) => {
                const employee = mockUsers.find((u) => u.employeeId === appraisal.employeeId)
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20"
                  >
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{employee?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {appraisal.attendanceImpact < 0 && "Low attendance"}
                        {appraisal.attendanceImpact < 0 && appraisal.geoHazriCompliance < 95 && " & "}
                        {appraisal.geoHazriCompliance < 95 && "Poor geo-hazri compliance"}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {appraisal.employeeId}
                    </Badge>
                  </div>
                )
              })}

            {mockAppraisals.filter((a) => a.attendanceImpact < 0 || a.geoHazriCompliance < 95).length === 0 && (
              <div className="flex flex-col items-center justify-center py-8">
                <CheckCircle2 className="h-10 w-10 text-green-600 mb-3" />
                <p className="text-sm text-muted-foreground text-center">No performance alerts at this time</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Leave Requests</CardTitle>
            <CardDescription>Pending approvals for HR</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingLeavesList.slice(0, 3).map((req) => (
              <div key={req.id} className="flex items-start justify-between gap-3 p-3 rounded border">
                <div>
                  <p className="text-sm font-semibold">{req.type} leave</p>
                  <p className="text-xs text-slate-600">{req.fromDate} to {req.toDate}</p>
                  <p className="text-xs text-slate-600">Employee: {req.employeeId}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => { approveLeave({ requestId: req.id, actorRole: "hr" }); setPendingLeavesList(getPendingForRole("hr")) }}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => { rejectLeave({ requestId: req.id, actorRole: "hr" }); setPendingLeavesList(getPendingForRole("hr")) }}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))}
            {pendingLeavesList.length === 0 && (
              <p className="text-xs text-slate-600">No pending leave requests.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="appraisals">Appraisals</TabsTrigger>
          <TabsTrigger value="transfers">Transfers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common HR administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                <Button variant="outline" className="justify-start bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  Add Employee
                </Button>
                <Button variant="outline" className="justify-start bg-transparent">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Start Appraisal Cycle
                </Button>
                <Button variant="outline" className="justify-start bg-transparent">
                  <MapPin className="h-4 w-4 mr-2" />
                  Review Transfers
                </Button>
                <Button variant="outline" className="justify-start bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees">
          <EmployeeList employees={mockUsers.filter((u) => u.role === "employee" || u.role === "manager")} />
        </TabsContent>

        <TabsContent value="appraisals">
          <AppraisalQueue appraisals={mockAppraisals} employees={mockUsers} />
        </TabsContent>

        <TabsContent value="transfers">
          <TransferQueue transfers={mockTransfers} employees={mockUsers} />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
