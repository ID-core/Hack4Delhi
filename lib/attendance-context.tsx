"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import type { CheckInAttempt } from "@/types"

interface DailyAttendance {
  date: string
  status: "present" | "absent"
  geoCompliant: boolean
  checkInAttempts: CheckInAttempt[]
  firstCompliantTime?: string
}

interface AttendanceContextType {
  attendanceRecords: Map<string, DailyAttendance>
  addCheckInAttempt: (date: string, attempt: CheckInAttempt) => void
  getTodayAttendance: () => DailyAttendance | undefined
  getAllAttendance: () => DailyAttendance[]
  getComplianceSummary: () => { compliant: number; nonCompliant: number }
  getAttendanceRate: () => number
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined)

export function AttendanceProvider({ children }: { children: ReactNode }) {
  const [attendanceRecords, setAttendanceRecords] = useState<Map<string, DailyAttendance>>(new Map())

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("attendance-records")
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setAttendanceRecords(new Map(Object.entries(data)))
      } catch (e) {
        console.error("Failed to load attendance records:", e)
      }
    }
  }, [])

  // Save to localStorage whenever records change
  useEffect(() => {
    const data = Object.fromEntries(attendanceRecords)
    localStorage.setItem("attendance-records", JSON.stringify(data))
  }, [attendanceRecords])

  const addCheckInAttempt = (date: string, attempt: CheckInAttempt) => {
    setAttendanceRecords((prev) => {
      const updated = new Map(prev)
      const existing = updated.get(date)

      if (existing) {
        existing.checkInAttempts.push(attempt)
        // If this is the first compliant attempt, mark the day as compliant
        if (attempt.compliant && !existing.firstCompliantTime) {
          existing.geoCompliant = true
          existing.firstCompliantTime = attempt.timestamp
          existing.status = "present"
        }
      } else {
        updated.set(date, {
          date,
          status: attempt.compliant ? "present" : "present",
          geoCompliant: attempt.compliant,
          checkInAttempts: [attempt],
          firstCompliantTime: attempt.compliant ? attempt.timestamp : undefined,
        })
      }

      return updated
    })
  }

  const getTodayAttendance = () => {
    const today = new Date().toISOString().split("T")[0]
    return attendanceRecords.get(today)
  }

  const getAllAttendance = () => {
    return Array.from(attendanceRecords.values()).sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }

  const getComplianceSummary = () => {
    const all = getAllAttendance()
    return {
      compliant: all.filter((a) => a.geoCompliant).length,
      nonCompliant: all.filter((a) => !a.geoCompliant && a.status === "present").length,
    }
  }

  const getAttendanceRate = () => {
    const all = getAllAttendance()
    if (all.length === 0) return 0
    const presentDays = all.filter((a) => a.status === "present").length
    return (presentDays / all.length) * 100
  }

  const value: AttendanceContextType = {
    attendanceRecords,
    addCheckInAttempt,
    getTodayAttendance,
    getAllAttendance,
    getComplianceSummary,
    getAttendanceRate,
  }

  return <AttendanceContext.Provider value={value}>{children}</AttendanceContext.Provider>
}

export function useAttendance() {
  const context = useContext(AttendanceContext)
  if (!context) {
    throw new Error("useAttendance must be used within AttendanceProvider")
  }
  return context
}
