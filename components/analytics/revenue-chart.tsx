'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ChartDataPoint {
  date: string
  revenue: number
  tips: number
}

interface RevenueChartProps {
  period: 'daily' | 'weekly' | 'monthly' | 'yearly'
  onPeriodChange: (period: 'daily' | 'weekly' | 'monthly' | 'yearly') => void
}

export function RevenueChart({ period, onPeriodChange }: RevenueChartProps) {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/analytics/detailed?period=${period}`)
        if (response.ok) {
          const data = await response.json()
          setChartData(data.chartData || [])
        }
      } catch (error) {
        console.error('Error fetching chart data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [period])

  const periodLabels = {
    daily: 'روزانه',
    weekly: 'هفتگی',
    monthly: 'ماهانه',
    yearly: 'سالانه',
  }

  return (
    <Card className="p-6 rounded-xl border border-purple-600/50 bg-gradient-to-br from-violet-800/50 to-purple-800/50 backdrop-blur-sm shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white">درآمد</h2>
        <div className="flex gap-2">
          {(Object.entries(periodLabels) as Array<[typeof period, string]>).map(([p, label]) => (
            <Button
              key={p}
              variant={period === p ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPeriodChange(p)}
              className={period === p ? 'bg-purple-600' : 'border-purple-600/50'}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-80 flex items-center justify-center text-gray-400">در حال بارگذاری...</div>
      ) : chartData.length === 0 ? (
        <div className="h-80 flex items-center justify-center text-gray-400">هیچ داده‌ای در این دوره وجود ندارد</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(168, 85, 247, 0.2)" />
            <XAxis dataKey="date" stroke="rgba(168, 85, 247, 0.5)" />
            <YAxis stroke="rgba(168, 85, 247, 0.5)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid rgba(168, 85, 247, 0.5)',
                borderRadius: '8px',
              }}
              formatter={(value) => {
                if (typeof value === 'number') {
                  return value.toLocaleString('fa-IR')
                }
                return value
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#a855f7"
              strokeWidth={2}
              dot={{ fill: '#a855f7', r: 4 }}
              activeDot={{ r: 6 }}
              name="درآمد"
            />
            <Line
              type="monotone"
              dataKey="tips"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ fill: '#22c55e', r: 4 }}
              activeDot={{ r: 6 }}
              name="انعام"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  )
}
