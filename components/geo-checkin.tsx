"use client"

import { useState, useEffect } from "react"
import "leaflet/dist/leaflet.css"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Loader2, CheckCircle2, XCircle, Clock, Navigation } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useAttendance } from "@/lib/attendance-context"
import type { CheckInAttempt } from "@/types"

interface CheckInResult {
  status: "success" | "violation" | "error"
  message: string
  distance?: number
  location?: {
    lat: number
    lng: number
  }
  timestamp?: string
}

// Fixed geofence: Delhi HQ
const GEOFENCE_CENTER = { lat: 28.6412, lng: 77.2277 }
const GEOFENCE_RADIUS = 1000 // 1km in meters

// Calculate distance between two coordinates using Haversine formula (in meters)
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

export function GeoCheckIn() {
  const { user } = useAuth()
  const { addCheckInAttempt, getTodayAttendance } = useAttendance()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CheckInResult | null>(null)
  const [todayAttempts, setTodayAttempts] = useState<CheckInAttempt[]>([])
  const [autoTracking, setAutoTracking] = useState(false)

  // Load history from localStorage
  // Load today's attempts from context
  useEffect(() => {
    const today = getTodayAttendance()
    if (today) {
      setTodayAttempts(today.checkInAttempts)
    }
  }, [getTodayAttendance])

  const handleCheckIn = async () => {
    setLoading(true)
    setResult(null)

    if (!navigator.geolocation) {
      setResult({
        status: "error",
        message: "Geolocation is not supported by your browser",
      })
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude
        const userLng = position.coords.longitude
        const distance = calculateDistance(userLat, userLng, GEOFENCE_CENTER.lat, GEOFENCE_CENTER.lng)
        const isCompliant = distance <= GEOFENCE_RADIUS

        const timestamp = new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })

        // Create check-in attempt
        const attempt: CheckInAttempt = {
          timestamp,
          lat: userLat,
          lng: userLng,
          distance: Math.round(distance),
          compliant: isCompliant,
        }

        // Add to context
        const dateKey = new Date().toISOString().split("T")[0]
        addCheckInAttempt(dateKey, attempt)

        // Update local state
        setTodayAttempts((prev) => [...prev, attempt])

        // Show result
        setResult({
          status: isCompliant ? "success" : "violation",
          message: isCompliant
            ? "✅ Check-in successful! You are within the valid location radius."
            : "⚠️ Location violation! You are outside the 1km radius.",
          distance: Math.round(distance),
          location: { lat: userLat, lng: userLng },
          timestamp,
        })

        setLoading(false)
      },
      (error) => {
        let errorMessage = "Failed to get your location. "
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += "Please allow location access to check-in."
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage += "Location information is unavailable."
            break
          case error.TIMEOUT:
            errorMessage += "Location request timed out."
            break
          default:
            errorMessage += "An unknown error occurred."
            break
        }

        setResult({
          status: "error",
          message: errorMessage,
        })
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }

  return (
    <Card className="border-slate-200">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5 text-blue-600" />
              Geo-Hajiri Check-In
            </CardTitle>
            <CardDescription className="mt-2">
              <div className="space-y-1">
                <p>Valid geofence: Delhi Headquarters</p>
                <p className="text-xs">📍 28.6412°N, 77.2277°E · Radius: 1km</p>
              </div>
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        <Button onClick={handleCheckIn} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Getting your location...
            </>
          ) : (
            <>
              <Navigation className="mr-2 h-5 w-5" />
              Check-In Now
            </>
          )}
        </Button>

        {result && (
          <div
            className={`p-4 rounded-xl border-l-4 ${
              result.status === "success"
                ? "bg-green-50 border-l-green-600 dark:bg-green-950"
                : result.status === "violation"
                  ? "bg-orange-50 border-l-orange-600 dark:bg-orange-950"
                  : "bg-red-50 border-l-red-600 dark:bg-red-950"
            }`}
          >
            <div className="flex items-start gap-3">
              {result.status === "success" ? (
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
              ) : result.status === "violation" ? (
                <XCircle className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
              )}
              <div className="flex-1 space-y-3">
                <p className="font-semibold text-sm">{result.message}</p>
                <div className="grid gap-2">
                  {result.location && (
                    <div className="flex items-center gap-2 text-xs bg-white dark:bg-slate-900 p-2 rounded-lg">
                      <MapPin className="h-4 w-4 text-slate-500" />
                      <span className="font-mono text-slate-700 dark:text-slate-300">
                        {result.location.lat.toFixed(6)}, {result.location.lng.toFixed(6)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-xs">
                    <span className="bg-white dark:bg-slate-900 px-2 py-1 rounded">📏 {result.distance}m</span>
                    <span className="bg-white dark:bg-slate-900 px-2 py-1 rounded">🕐 {result.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Check-in Attempts History */}
        {/* {todayAttempts.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold mb-3">Today's Attempts ({todayAttempts.length})</h4>
            <div className="space-y-2 max-h-48 overflow-auto">
              {todayAttempts.map((attempt, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border-l-4 ${
                    attempt.compliant
                      ? "bg-green-50 border-l-green-600 dark:bg-green-950"
                      : "bg-orange-50 border-l-orange-600 dark:bg-orange-950"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                        📍 {attempt.lat.toFixed(6)}, {attempt.lng.toFixed(6)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={attempt.compliant ? "default" : "secondary"} className="text-xs">
                          {attempt.compliant ? "✓ Inside" : "✗ Outside"}
                        </Badge>
                        <span className="text-xs text-slate-600 dark:text-slate-400">
                          {attempt.distance}m
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-600 dark:text-slate-400">{attempt.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )} */}
      </CardContent>
    </Card>
  )
}
