import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { AttendanceProvider } from "@/lib/attendance-context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nigam Seva - Municipal HRMS | Performance Tracking System",
  description: "Municipal Human Resource Management System with Geo-Attendance, Performance Tracking, and Leave Management for MCD",
  generator: "v0.app",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" type="image/png" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tF8VdNqgWfWYf6Gh7v0g="
          crossOrigin=""
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-slate-50`}>
        <AuthProvider>
          <AttendanceProvider>
            {children}
          </AttendanceProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
