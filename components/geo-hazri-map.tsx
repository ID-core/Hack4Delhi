"use client"

import { useEffect, useRef, useState } from "react"
import "leaflet/dist/leaflet.css"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Attendance } from "@/types"
import { MapPin } from "lucide-react"

interface GeoHazriMapProps {
  attendance: any[]
}

export function GeoHazriMap({ attendance }: GeoHazriMapProps) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null)
  const [status, setStatus] = useState<"idle" | "fetching" | "ready" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  const mapEl = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<any>(null)
  const leafletRef = useRef<any>(null)
  const userMarkerRef = useRef<any>(null)
  const userMarkerOuterRef = useRef<any>(null)

  const center = { lat: 28.6412, lng: 77.2277 }

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      setStatus("error")
      return
    }

    setStatus("fetching")
    let cancelled = false
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (cancelled) return
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setStatus("ready")
      },
      (err) => {
        if (cancelled) return
        setError(
          err.code === err.PERMISSION_DENIED
            ? "Location permission denied"
            : err.code === err.POSITION_UNAVAILABLE
              ? "Location unavailable"
              : err.code === err.TIMEOUT
                ? "Location request timed out"
                : "Unable to get your location",
        )
        setStatus("error")
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    )
    return () => { cancelled = true }
  }, [])

  // Initialize Leaflet map once
  useEffect(() => {
    let mounted = true
    ;(async () => {
      if (!mapEl.current || mapRef.current) return
      const L = await import("leaflet")
      if (!mounted) return
      
      // Fix default icon paths
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      })
      
      leafletRef.current = L
      const map = L.map(mapEl.current).setView([center.lat, center.lng], 13)
      mapRef.current = map
      
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19
      }).addTo(map)
      
      L.circle([center.lat, center.lng], {
        radius: 1000,
        color: "#0F766E",
        fillColor: "#0F766E",
        fillOpacity: 0.1
      }).addTo(map)
      
      L.marker([center.lat, center.lng]).addTo(map)
        .bindPopup("Geofence Center<br>1km radius")
    })()
    return () => {
      mounted = false
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null }
    }
  }, [])

  // Update or add user marker when position changes
  useEffect(() => {
    const L = leafletRef.current
    const map = mapRef.current
    if (!L || !map || !position) return
    
    if (!userMarkerRef.current) {
      // Outer ring
      userMarkerOuterRef.current = L.circleMarker([position.lat, position.lng], {
        radius: 16,
        color: "#2563EB",
        fillColor: "transparent",
        fillOpacity: 0,
        weight: 3
      }).addTo(map)
      
      // Inner circle
      userMarkerRef.current = L.circleMarker([position.lat, position.lng], {
        radius: 8,
        color: "#2563EB",
        fillColor: "#2563EB",
        fillOpacity: 1,
        weight: 3
      })
        .addTo(map)
        .bindPopup("Your Location")
      map.setView([position.lat, position.lng], 13)
    } else {
      userMarkerRef.current.setLatLng([position.lat, position.lng])
      userMarkerOuterRef.current.setLatLng([position.lat, position.lng])
    }
  }, [position])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location Map</CardTitle>
        <CardDescription>Live device marker, geofence center and 1km radius</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid gap-2">
          <h4 className="text-sm font-medium">Recent Check-ins</h4>
          {attendance
            .filter((record: any) => record.checkInAttempts && record.checkInAttempts.length > 0)
            .slice(0, 5)
            .map((record: any) => {
              const lastAttempt = record.checkInAttempts[record.checkInAttempts.length - 1]
              return (
                <div key={record.date} className="flex items-center justify-between p-2 rounded-lg bg-muted text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className={`h-4 w-4 ${record.geoCompliant ? "text-green-600" : "text-red-600"}`} />
                    <span className="text-muted-foreground">
                      {new Date(record.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      {lastAttempt.lat.toFixed(4)}, {lastAttempt.lng.toFixed(4)}
                    </span>
                    <a href={`https://www.google.com/maps?q=${lastAttempt.lat},${lastAttempt.lng}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-xs">Open</a>
                  </div>
                </div>
              )
            })}
        </div>

        <div className="h-[400px] rounded-lg bg-muted relative overflow-hidden">
          <div ref={mapEl} className="absolute inset-0 z-0" />

          <div className="absolute top-3 left-3 z-[1000] rounded-md bg-background/90 backdrop-blur px-3 py-2 shadow-sm border text-xs font-medium">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Live location</span>
            </div>
            <div className="mt-1 text-muted-foreground">
              {status === "ready" && position && <span>{position.lat.toFixed(5)}, {position.lng.toFixed(5)}</span>}
              {status === "fetching" && <span>Getting your position…</span>}
              {status === "error" && error && <span>{error}</span>}
            </div>
            {status === "ready" && position && (
              <div className="mt-2">
                <a href={`https://www.google.com/maps?q=${position.lat},${position.lng}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Open in Maps</a>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
