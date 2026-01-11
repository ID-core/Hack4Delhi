"use client"
import type React from "react"
import { AppHeader } from "@/components/app-header"

export default function HRLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      <AppHeader />
      <main className="px-4 py-4">{children}</main>
    </div>
  )
}
