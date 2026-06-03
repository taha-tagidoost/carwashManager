'use client'

import { TrendingUp, TrendingDown, Users, Zap, DollarSign, Percent } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface Metric {
  label: string
  value: string | number
  icon: React.ReactNode
  trend?: 'up' | 'down' | 'stable'
  trendValue?: string
}

interface BusinessMetricsProps {
  metrics: Metric[]
}

export function BusinessMetrics({ metrics }: BusinessMetricsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
      {metrics.map((metric, idx) => (
        <Card
          key={idx}
          className="p-4 rounded-xl border border-purple-600/50 bg-gradient-to-br from-violet-800/50 to-purple-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-purple-200">{metric.label}</p>
              <p className="mt-2 text-2xl font-bold text-white">{metric.value}</p>
              {metric.trend && metric.trendValue && (
                <div className="mt-2 flex items-center gap-1">
                  {metric.trend === 'up' && (
                    <>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-xs text-green-400">{metric.trendValue}</span>
                    </>
                  )}
                  {metric.trend === 'down' && (
                    <>
                      <TrendingDown className="h-4 w-4 text-red-400" />
                      <span className="text-xs text-red-400">{metric.trendValue}</span>
                    </>
                  )}
                  {metric.trend === 'stable' && (
                    <span className="text-xs text-gray-400">بدون تغییر</span>
                  )}
                </div>
              )}
            </div>
            <div className="text-2xl">{metric.icon}</div>
          </div>
        </Card>
      ))}
    </div>
  )
}
