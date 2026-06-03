'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, BarChart3, TrendingUp, Zap, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { RevenueChart } from '@/components/analytics/revenue-chart'
import { BusinessMetrics } from '@/components/analytics/business-metrics'
import { RevenueComparison } from '@/components/analytics/revenue-comparison'
import { TopCustomers } from '@/components/analytics/top-customers'
import { TopServices } from '@/components/analytics/top-services'

interface AnalyticsData {
  period: string
  totalRevenue: number
  totalTips: number
  averageTransactionValue: number
  totalTransactions: number
  uniqueCustomers: number
  topServices: Array<{ name: string; revenue: number; count: number }>
  topCustomers: Array<{ name: string; total: number; visits: number }>
  topWorkers: Array<{ name: string; revenue: number; visits: number; tips: number }>
  comparison: { percentageChange: number; trend: 'up' | 'down' | 'stable'; prevPeriodRevenue: number }
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly')
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/analytics/detailed?period=${period}`)
        if (response.ok) {
          const data = await response.json()
          setAnalytics(data)
        }
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [period])

  const periodLabels = {
    daily: 'روزانه',
    weekly: 'هفتگی',
    monthly: 'ماهانه',
    yearly: 'سالانه',
  }

  const prevPeriodLabels = {
    daily: 'دیروز',
    weekly: 'هفته قبل',
    monthly: 'ماه قبل',
    yearly: 'سال قبل',
  }

  const metrics = analytics
    ? [
        {
          label: 'درآمد کل',
          value: analytics.totalRevenue.toLocaleString('fa-IR'),
          icon: '💰',
          trend: analytics.comparison.trend as 'up' | 'down' | 'stable',
          trendValue: `${Math.abs(analytics.comparison.percentageChange).toFixed(1)}%`,
        },
        {
          label: 'انعام‌ها',
          value: analytics.totalTips.toLocaleString('fa-IR'),
          icon: '🎁',
        },
        {
          label: 'تعداد معاملات',
          value: analytics.totalTransactions,
          icon: '📊',
        },
        {
          label: 'میانگین معامله',
          value: analytics.averageTransactionValue.toLocaleString('fa-IR'),
          icon: '📈',
        },
        {
          label: 'مشتریان منحصر',
          value: analytics.uniqueCustomers,
          icon: '👥',
        },
      ]
    : []

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0A0714] via-[#140D26] to-[#1A1035]">
      {/* Header */}
      <div className="border-b border-[#3D246C]/50 bg-gradient-to-r from-[#16102E] to-[#24154A] shadow-lg backdrop-blur-md bg-opacity-95">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" className="hover:bg-purple-800">
                  <ArrowLeft className="h-5 w-5 text-purple-100" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                  <BarChart3 className="h-8 w-8 text-purple-400" />
                  تحلیل و گزارش‌ها
                </h1>
                <p className="text-[#C4B5FD] mt-1">تحلیل جامع عملکرد کسب‌وکار</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-purple-200">در حال بارگذاری...</p>
          </div>
        ) : analytics ? (
          <div className="space-y-8">
            {/* Revenue Chart */}
            <RevenueChart period={period} onPeriodChange={setPeriod} />

            {/* Business Metrics */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-purple-400" />
                شاخص‌های کلیدی
              </h2>
              <BusinessMetrics metrics={metrics} />
            </div>

            {/* Revenue Comparison */}
            {analytics && (
              <RevenueComparison
                currentRevenue={analytics.totalRevenue}
                previousRevenue={analytics.comparison.prevPeriodRevenue}
                percentageChange={analytics.comparison.percentageChange}
                trend={analytics.comparison.trend}
                periodLabel={periodLabels[period]}
                prevPeriodLabel={prevPeriodLabels[period]}
              />
            )}

            {/* Top Customers & Services */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TopCustomers customers={analytics.topCustomers} />
              <TopServices services={analytics.topServices} />
            </div>

            {/* Top Workers */}
            {analytics.topWorkers.length > 0 && (
              <div className="rounded-xl border border-purple-600/50 bg-gradient-to-br from-violet-800/50 to-purple-800/50 backdrop-blur-sm p-6 shadow-lg">
                <h3 className="text-lg font-bold text-white mb-6">کاران برتر</h3>
                <div className="space-y-3">
                  {analytics.topWorkers.map((worker, idx) => (
                    <div key={idx} className="flex items-start justify-between p-3 rounded-lg bg-black/20 hover:bg-black/30 transition-colors">
                      <div className="flex-1">
                        <p className="font-medium text-white">{worker.name}</p>
                        <div className="text-xs text-purple-300 mt-1 space-y-1">
                          <p>📊 {worker.visits} مراجعه</p>
                          <p>💰 درآمد: {worker.revenue.toLocaleString('fa-IR')}</p>
                          <p>🎁 انعام: {worker.tips.toLocaleString('fa-IR')}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-purple-200">خطا در بارگذاری داده‌ها</p>
          </div>
        )}
      </div>
    </main>
  )
}
