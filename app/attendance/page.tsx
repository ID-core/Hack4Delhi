"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useAttendance } from "@/lib/attendance-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockAttendance } from "@/lib/mock-data"
import { CalendarIcon, MapPin, Clock, CheckCircle2, XCircle, AlertTriangle, Navigation } from "lucide-react"
import { AttendanceCalendar } from "@/components/attendance-calendar"
import { GeoHazriMap } from "@/components/geo-hazri-map"
import { GeoCheckIn } from "@/components/geo-checkin"

// Haversine formula to calculate distance
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3 // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lon2 - lon1) * Math.PI) / 180

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c // Distance in meters
}

// Geofence center
const GEOFENCE_CENTER = { lat: 28.6412, lng: 77.2277 }
const GEOFENCE_RADIUS = 1000 // 1km in meters

export default function AttendancePage() {
  const { user } = useAuth()
  const { getAllAttendance, getComplianceSummary, getAttendanceRate } = useAttendance()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [filterCompliant, setFilterCompliant] = useState<"all" | "compliant" | "non-compliant">("all")

  const allAttendance = getAllAttendance()
  const selectedDateStr = selectedDate?.toISOString().split("T")[0]
  const selectedAttendance = allAttendance.find((a) => a.date === selectedDateStr)
  const isToday = selectedDate?.toDateString() === new Date().toDateString()
  
  const { compliant, nonCompliant } = getComplianceSummary()
  const attendanceRate = getAttendanceRate()
  const totalDays = allAttendance.length
  const presentDays = allAttendance.filter((a) => a.status === "present").length

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Attendance & Geo-Hazri</h1>
        <p className="text-slate-600 mt-2 font-medium">Track your attendance and location compliance</p>
      </div>

      <GeoCheckIn />

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Total Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{totalDays}</div>
            <p className="text-xs text-slate-600 mt-1 font-medium">This period</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Present Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{presentDays}</div>
            <p className="text-xs text-slate-600 mt-1 font-medium">{attendanceRate.toFixed(1)}% rate</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Geo-Compliant ✓</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">{compliant}</div>
            <p className="text-xs text-slate-600 mt-1 font-medium">{totalDays > 0 ? ((compliant / totalDays) * 100).toFixed(1) : 0}% compliance</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Non-Compliant ✗</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{nonCompliant}</div>
            <p className="text-xs text-slate-600 mt-1 font-medium">Outside geofence</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AttendanceCalendar attendance={allAttendance} onDateSelect={setSelectedDate} />

        <Card>
          <CardHeader>
            <CardTitle>Attendance Details</CardTitle>
            <CardDescription>
              {selectedDate
                ? selectedDate.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Select a date"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedAttendance ? (
              <div className="space-y-4">
                {/* Status Badge */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2">
                    {selectedAttendance.status === "present" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {selectedAttendance.status === "present" ? "✓ Present" : "✗ Absent"}
                    </span>
                  </div>
                  <Badge variant={selectedAttendance.geoCompliant ? "default" : "secondary"}>
                    {selectedAttendance.geoCompliant ? "✓ Geo-Compliant" : "✗ Non-Compliant"}
                  </Badge>
                </div>

                {/* Check-in Attempts */}
                {selectedAttendance.checkInAttempts.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Check-in Attempts ({selectedAttendance.checkInAttempts.length})
                    </h4>
                    <div className="space-y-2">
                      {selectedAttendance.checkInAttempts.map((attempt, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border-l-4 transition-all ${
                            attempt.compliant
                              ? "bg-emerald-50 border-l-emerald-600 dark:bg-emerald-950"
                              : "bg-orange-50 border-l-orange-600 dark:bg-orange-950"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                                <span className="text-xs font-mono text-slate-700 dark:text-slate-300">
                                  {attempt.lat.toFixed(6)}, {attempt.lng.toFixed(6)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant={attempt.compliant ? "default" : "secondary"} className="text-xs">
                                  {attempt.compliant ? "✓ Inside" : "✗ Outside"}
                                </Badge>
                                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                                  {attempt.distance}m from center
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{attempt.timestamp}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Summary Stats */}
                <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Total Attempts</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{selectedAttendance.checkInAttempts.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">First Compliant</p>
                    <p className="text-sm font-semibold text-emerald-600">{selectedAttendance.firstCompliantTime || "N/A"}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground text-center">
                  {selectedDate ? "No attendance record for this date" : "Select a date to view details"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <GeoHazriMap attendance={allAttendance} />
    </div>
  )
}
