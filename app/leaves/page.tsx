"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { LeaveRequest } from "@/types"
import { applyLeave, getRequestsForEmployee } from "@/lib/leave-service"
import { Plus, FileText, Calendar, CheckCircle2, XCircle, Clock } from "lucide-react"

export default function LeavesPage() {
  const { user } = useAuth()
  const [isApplying, setIsApplying] = useState(false)
  const [newLeave, setNewLeave] = useState({
    type: "casual" as const,
    fromDate: "",
    toDate: "",
    reason: "",
  })

  const [userLeaves, setUserLeaves] = useState<LeaveRequest[]>([])

  console.log("🎯 LeavesPage rendered. isApplying:", isApplying, "user:", user?.employeeId)

  // Load leaves for this employee
  useEffect(() => {
    if (user?.employeeId) {
      setUserLeaves(getRequestsForEmployee(user.employeeId))
    }
  }, [user?.employeeId])

  const handleApplyLeave = () => {
    console.log("🔔 handleApplyLeave called")
    console.log("User:", user?.employeeId)
    console.log("Form data:", newLeave)
    if (!user?.employeeId || !newLeave.fromDate || !newLeave.toDate || !newLeave.reason) {
      console.log("❌ Validation failed - missing required fields")
      return
    }
    console.log("✅ Calling applyLeave with:", {
      employeeId: user.employeeId,
      type: newLeave.type,
      fromDate: newLeave.fromDate,
      toDate: newLeave.toDate,
      reason: newLeave.reason,
    })
    applyLeave({
      employeeId: user.employeeId,
      type: newLeave.type,
      fromDate: newLeave.fromDate,
      toDate: newLeave.toDate,
      reason: newLeave.reason,
    })
    setUserLeaves(getRequestsForEmployee(user.employeeId))
    setIsApplying(false)
    setNewLeave({ type: "casual", fromDate: "", toDate: "", reason: "" })
  }

  const getStatusIcon = (wfStatus: string) => {
    if (wfStatus.includes("REJECTED")) return <XCircle className="h-4 w-4 text-red-600" />
    if (wfStatus === "APPROVED") return <CheckCircle2 className="h-4 w-4 text-green-600" />
    return <Clock className="h-4 w-4 text-yellow-600" />
  }

  const getStatusBadgeVariant = (wfStatus: string) => {
    if (wfStatus.includes("REJECTED")) return "destructive"
    if (wfStatus === "APPROVED") return "default"
    return "secondary"
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Leave Management</h1>
          <p className="text-slate-600 mt-2 font-medium">Apply for and track your leave requests</p>
        </div>
        <Dialog open={isApplying} onOpenChange={(open) => {
          console.log("📋 Dialog state changed to:", open)
          setIsApplying(open)
        }}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium" onClick={() => console.log("📌 Apply Leave button clicked")}>
              <Plus className="h-4 w-4 mr-2" />
              Apply Leave
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-slate-900">Apply for Leave</DialogTitle>
              <DialogDescription className="text-slate-600">Submit a new leave application</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="type">Leave Type</Label>
                <Select
                  value={newLeave.type}
                  onValueChange={(value) => setNewLeave({ ...newLeave, type: value as any })}
                >
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual Leave</SelectItem>
                    <SelectItem value="earned">Earned Leave</SelectItem>
                    <SelectItem value="medical">Medical Leave</SelectItem>
                    <SelectItem value="maternity">Maternity Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fromDate">From Date</Label>
                  <Input
                    id="fromDate"
                    type="date"
                    value={newLeave.fromDate}
                    onChange={(e) => setNewLeave({ ...newLeave, fromDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="toDate">To Date</Label>
                  <Input
                    id="toDate"
                    type="date"
                    value={newLeave.toDate}
                    onChange={(e) => setNewLeave({ ...newLeave, toDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  id="reason"
                  placeholder="Provide a reason for your leave..."
                  value={newLeave.reason}
                  onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                />
              </div>

              <Button onClick={() => {
                console.log("🖱️ Button clicked")
                handleApplyLeave()
              }} className="w-full">
                Submit Application
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Leaves</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userLeaves.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Applications submitted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {userLeaves.filter((l) => l.status === "APPROVED").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Leave days granted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {userLeaves.filter((l) => !l.status.includes("REJECTED") && l.status !== "APPROVED").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave History</CardTitle>
          <CardDescription>All your leave applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userLeaves.map((leave) => (
              <div key={leave.id} className="flex items-start gap-3 p-4 rounded-lg border">
                <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-medium">{leave.type.charAt(0).toUpperCase() + leave.type.slice(1)} Leave</h4>
                      <p className="text-sm text-muted-foreground">
                        {leave.fromDate} to {leave.toDate}
                      </p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(leave.status)} className="gap-1">
                      {getStatusIcon(leave.status)}
                      {leave.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{leave.reason}</p>
                </div>
              </div>
            ))}

            {userLeaves.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">No leave applications</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">You haven't applied for any leave yet</p>
                <Button onClick={() => setIsApplying(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Apply for Your First Leave
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
