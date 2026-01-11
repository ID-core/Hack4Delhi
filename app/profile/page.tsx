"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Calendar, Briefcase, CreditCard } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">My Profile</h1>
        <p className="text-slate-600 mt-2 font-medium">View and manage your personal information</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900">Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-32 w-32 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <User className="h-16 w-16 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg text-slate-900">{user?.name}</h3>
            <p className="text-sm text-slate-600 mt-1">{user?.designation}</p>
            <Badge className="mt-3 bg-blue-600 text-white text-xs">{user?.role}</Badge>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900">Personal Information</CardTitle>
            <CardDescription className="text-slate-600">Your basic details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <CreditCard className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Employee ID</p>
                  <p className="text-sm text-slate-600 mt-0.5">{user?.employeeId}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-teal-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Email</p>
                  <p className="text-sm text-slate-600 mt-0.5">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Briefcase className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Department</p>
                  <p className="text-sm text-slate-600 mt-0.5">{user?.department}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-teal-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Joining Date</p>
                  <p className="text-sm text-slate-600 mt-0.5">
                    {new Date(user?.joiningDate || "").toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {user?.reportingManager && (
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Reporting Manager</p>
                    <p className="text-sm text-muted-foreground">{user.reportingManager}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employment Details</CardTitle>
          <CardDescription>Your role and organizational information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Current Position</h4>
              <p className="text-sm text-muted-foreground">{user?.designation}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Department</h4>
              <p className="text-sm text-muted-foreground">{user?.department}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Access Level</h4>
              <Badge variant="secondary">{user?.role.toUpperCase()}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
