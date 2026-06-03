'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface DashboardSummary {
  todayRevenue: number
  weekRevenue: number
  monthRevenue: number
  topService: { name: string; count: number } | null
  activeCustomersThisWeek: number
}

export function DashboardAnalyticsPreview() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch('/api/dashboard-summary')
        if (response.ok) {
          const data = await response.json()
          setSummary(data)
        }
      } catch (error) {
        console.error('Error fetching dashboard summary:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSummary()
  }, [])

  if (loading || !summary) {
    return null
  }

  return (
    <Card className="p-6 rounded-xl border border-purple-600/50 bg-gradient-to-br from-violet-800/50 to-purple-800/50 backdrop-blur-sm shadow-lg">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-400" />
            خلاصه عملکرد
          </h2>
          <p className="text-sm text-purple-200 mt-1">نمای کلی آمار کسب‌وکار</p>
        </div>
        <Link href="/analytics">
          <Button size="sm" variant="outline" className="gap-2 border-purple-600/50 hover:bg-purple-800/50">
            <BarChart3 className="h-4 w-4" />
            تفصیلات بیشتر
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="p-3 rounded-lg bg-black/20">
          <p className="text-xs text-purple-300 mb-1">امروز</p>
          <p className="text-lg font-bold text-green-400">
            {summary.todayRevenue.toLocaleString('fa-IR')}
          </p>
        </div>

        <div className="p-3 rounded-lg bg-black/20">
          <p className="text-xs text-purple-300 mb-1">این هفته</p>
          <p className="text-lg font-bold text-green-400">
            {summary.weekRevenue.toLocaleString('fa-IR')}
          </p>
        </div>

        <div className="p-3 rounded-lg bg-black/20">
          <p className="text-xs text-purple-300 mb-1">این ماه</p>
          <p className="text-lg font-bold text-green-400">
            {summary.monthRevenue.toLocaleString('fa-IR')}
          </p>
        </div>

        <div className="p-3 rounded-lg bg-black/20">
          <p className="text-xs text-purple-300 mb-1">مشتریان فعال</p>
          <p className="text-lg font-bold text-blue-400">{summary.activeCustomersThisWeek}</p>
        </div>
      </div>

      {summary.topService && (
        <div className="mt-4 p-3 rounded-lg bg-black/20 border border-purple-600/30">
          <p className="text-xs text-purple-300 mb-1">سرویس محبوب این ماه</p>
          <p className="text-sm font-semibold text-white">
            {summary.topService.name} ({summary.topService.count} سفارش)
          </p>
        </div>
      )}
    </Card>
  )
}
