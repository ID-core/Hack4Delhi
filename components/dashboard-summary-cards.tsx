"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react"

interface SummaryCard {
  title: string
  value: string | number
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  color: "blue" | "teal" | "amber" | "green"
}

interface DashboardSummaryCardsProps {
  cards: SummaryCard[]
}

const colorClasses = {
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    border: "border-blue-200",
  },
  teal: {
    bg: "bg-teal-50",
    icon: "text-teal-600",
    border: "border-teal-200",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "text-amber-600",
    border: "border-amber-200",
  },
  green: {
    bg: "bg-green-50",
    icon: "text-green-600",
    border: "border-green-200",
  },
}

export function DashboardSummaryCards({ cards }: DashboardSummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon
        const colors = colorClasses[card.color]

        return (
          <Card key={index} className={`${colors.bg} border ${colors.border}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-slate-700">{card.title}</CardTitle>
                <Icon className={`h-5 w-5 ${colors.icon}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{card.value}</div>
              <p className="text-xs text-slate-600 mt-1">{card.subtitle}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
