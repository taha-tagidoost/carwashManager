'use client'

import { Card } from '@/components/ui/card'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface RevenueComparisonProps {
  currentRevenue: number
  previousRevenue: number
  percentageChange: number
  trend: 'up' | 'down' | 'stable'
  periodLabel: string
  prevPeriodLabel: string
}

export function RevenueComparison({
  currentRevenue,
  previousRevenue,
  percentageChange,
  trend,
  periodLabel,
  prevPeriodLabel,
}: RevenueComparisonProps) {
  return (
    <Card className="p-6 rounded-xl border border-purple-600/50 bg-gradient-to-br from-violet-800/50 to-purple-800/50 backdrop-blur-sm shadow-lg">
      <h3 className="text-lg font-bold text-white mb-6">مقایسه درآمد</h3>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-purple-200 mb-2">{periodLabel}</p>
          <p className="text-3xl font-bold text-white">{currentRevenue.toLocaleString('fa-IR')}</p>
        </div>

        <div>
          <p className="text-sm text-purple-200 mb-2">{prevPeriodLabel}</p>
          <p className="text-3xl font-bold text-gray-400">{previousRevenue.toLocaleString('fa-IR')}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 p-4 rounded-lg bg-black/20">
        {trend === 'up' && (
          <>
            <TrendingUp className="h-6 w-6 text-green-400" />
            <div>
              <p className="text-sm text-green-400 font-medium">افزایش {Math.abs(percentageChange).toFixed(1)}%</p>
              <p className="text-xs text-green-300">نسبت به دوره قبل</p>
            </div>
          </>
        )}
        {trend === 'down' && (
          <>
            <TrendingDown className="h-6 w-6 text-red-400" />
            <div>
              <p className="text-sm text-red-400 font-medium">کاهش {Math.abs(percentageChange).toFixed(1)}%</p>
              <p className="text-xs text-red-300">نسبت به دوره قبل</p>
            </div>
          </>
        )}
        {trend === 'stable' && (
          <div>
            <p className="text-sm text-gray-400 font-medium">بدون تغییر</p>
            <p className="text-xs text-gray-300">نسبت به دوره قبل</p>
          </div>
        )}
      </div>
    </Card>
  )
}
