"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = login(email, password)
    if (success) {
      router.push("/dashboard")
    } else {
      setError('Invalid credentials. Use any email from the system with password: "password"')
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-blue-50 via-white to-slate-100">
      <div className="p-6 border-b border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 mb-1">
          <Shield className="h-8 w-8 text-blue-900" />
          <h1 className="text-2xl font-bold text-blue-900">Nigam Seva</h1>
        </div>
        <p className="text-sm text-slate-600 ml-11">Unified HRMS for MCD</p>
      </div>

      <div className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-md border-slate-200 shadow-lg">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-3xl font-bold text-slate-900">Welcome</CardTitle>
            <CardDescription className="text-slate-600">Sign in to access your performance dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-semibold">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@municipal.gov.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-slate-300 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-semibold">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-slate-300 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {error && (
                <Alert variant="destructive" className="bg-red-50 border-red-300">
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10 mt-2">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
