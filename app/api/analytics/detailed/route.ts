import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const period = request.nextUrl.searchParams.get('period') || 'monthly'

    const { data: visits } = await supabase.from('visits').select('total_amount, tip_amount, visit_date, customer_id, worker_id')
    const { data: customers } = await supabase.from('customers').select('id, full_name')
    const { data: workers } = await supabase.from('workers').select('id, name')
    const { data: visitServices } = await supabase.from('visit_services').select('service_id, service_name_snapshot, subtotal, visit_id')

    if (!visits) {
      return NextResponse.json({
        period,
        totalRevenue: 0,
        totalTips: 0,
        averageTransactionValue: 0,
        totalTransactions: 0,
        uniqueCustomers: 0,
        topServices: [],
        topCustomers: [],
        topWorkers: [],
        chartData: [],
        comparison: { percentageChange: 0, trend: 'stable' },
      })
    }

    // Calculate date ranges based on period
    const now = new Date()
    let startDate: Date
    let prevStartDate: Date
    let prevEndDate: Date

    switch (period) {
      case 'daily':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        prevStartDate = new Date(startDate.getTime() - 24 * 60 * 60 * 1000)
        prevEndDate = startDate
        break
      case 'weekly':
        const dayOfWeek = now.getDay()
        startDate = new Date(now.getTime() - dayOfWeek * 24 * 60 * 60 * 1000)
        prevStartDate = new Date(startDate.getTime() - 7 * 24 * 60 * 60 * 1000)
        prevEndDate = startDate
        break
      case 'yearly':
        startDate = new Date(now.getFullYear(), 0, 1)
        prevStartDate = new Date(now.getFullYear() - 1, 0, 1)
        prevEndDate = startDate
        break
      case 'monthly':
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        prevStartDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        prevEndDate = startDate
    }

    // Filter visits by period
    const periodVisits = visits.filter((v) => new Date(v.visit_date) >= startDate)
    const prevPeriodVisits = visits.filter(
      (v) => new Date(v.visit_date) >= prevStartDate && new Date(v.visit_date) < prevEndDate
    )

    // Calculate metrics
    const totalRevenue = periodVisits.reduce((sum, v) => sum + (v.total_amount || 0), 0)
    const totalTips = periodVisits.reduce((sum, v) => sum + (v.tip_amount || 0), 0)
    const prevTotalRevenue = prevPeriodVisits.reduce((sum, v) => sum + (v.total_amount || 0), 0)

    const percentageChange = prevTotalRevenue > 0 ? ((totalRevenue - prevTotalRevenue) / prevTotalRevenue) * 100 : 0
    const trend = percentageChange > 0 ? 'up' : percentageChange < 0 ? 'down' : 'stable'

    // Top services
    const serviceCountMap: Record<string, { name: string; revenue: number; count: number }> = {}
    visitServices?.forEach((vs) => {
      if (visits.some((v) => v.visit_date === periodVisits.find((pv) => pv.visit_date)?.visit_date && v.visit_date === vs.visit_id)) {
        if (!serviceCountMap[vs.service_name_snapshot]) {
          serviceCountMap[vs.service_name_snapshot] = { name: vs.service_name_snapshot, revenue: 0, count: 0 }
        }
        serviceCountMap[vs.service_name_snapshot].revenue += vs.subtotal || 0
        serviceCountMap[vs.service_name_snapshot].count += 1
      }
    })

    const topServices = Object.values(serviceCountMap).sort((a, b) => b.revenue - a.revenue).slice(0, 10)

    // Top customers
    const customerMap: Record<string, { name: string; total: number; visits: number }> = {}
    periodVisits.forEach((v) => {
      const customer = customers?.find((c) => c.id === v.customer_id)
      if (customer) {
        if (!customerMap[v.customer_id]) {
          customerMap[v.customer_id] = { name: customer.full_name, total: 0, visits: 0 }
        }
        customerMap[v.customer_id].total += v.total_amount || 0
        customerMap[v.customer_id].visits += 1
      }
    })

    const topCustomers = Object.values(customerMap).sort((a, b) => b.total - a.total).slice(0, 10)

    // Top workers
    const workerMap: Record<string, { name: string; revenue: number; visits: number; tips: number }> = {}
    periodVisits.forEach((v) => {
      if (v.worker_id) {
        const worker = workers?.find((w) => w.id === v.worker_id)
        if (worker) {
          if (!workerMap[v.worker_id]) {
            workerMap[v.worker_id] = { name: worker.name, revenue: 0, visits: 0, tips: 0 }
          }
          workerMap[v.worker_id].revenue += v.total_amount || 0
          workerMap[v.worker_id].visits += 1
          workerMap[v.worker_id].tips += v.tip_amount || 0
        }
      }
    })

    const topWorkers = Object.values(workerMap).sort((a, b) => b.revenue - a.revenue).slice(0, 10)

    // Generate chart data based on period
    const chartData: Array<{ date: string; revenue: number; tips: number }> = []
    if (period === 'daily') {
      const day = startDate
      const dayString = day.toISOString().split('T')[0]
      const dayVisits = periodVisits.filter((v) => v.visit_date.startsWith(dayString))
      const dayRevenue = dayVisits.reduce((sum, v) => sum + (v.total_amount || 0), 0)
      const dayTips = dayVisits.reduce((sum, v) => sum + (v.tip_amount || 0), 0)
      chartData.push({ date: dayString, revenue: dayRevenue, tips: dayTips })
    } else if (period === 'weekly') {
      for (let i = 0; i < 7; i++) {
        const day = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000)
        const dayString = day.toISOString().split('T')[0]
        const dayVisits = periodVisits.filter((v) => v.visit_date.startsWith(dayString))
        const dayRevenue = dayVisits.reduce((sum, v) => sum + (v.total_amount || 0), 0)
        const dayTips = dayVisits.reduce((sum, v) => sum + (v.tip_amount || 0), 0)
        chartData.push({ date: dayString, revenue: dayRevenue, tips: dayTips })
      }
    } else if (period === 'monthly') {
      for (let i = 0; i < 30; i++) {
        const day = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000)
        if (day.getMonth() === startDate.getMonth()) {
          const dayString = day.toISOString().split('T')[0]
          const dayVisits = periodVisits.filter((v) => v.visit_date.startsWith(dayString))
          const dayRevenue = dayVisits.reduce((sum, v) => sum + (v.total_amount || 0), 0)
          const dayTips = dayVisits.reduce((sum, v) => sum + (v.tip_amount || 0), 0)
          chartData.push({ date: dayString, revenue: dayRevenue, tips: dayTips })
        }
      }
    } else if (period === 'yearly') {
      for (let month = 0; month < 12; month++) {
        const monthStart = new Date(now.getFullYear(), month, 1)
        const monthEnd = month === 11 ? new Date(now.getFullYear() + 1, 0, 1) : new Date(now.getFullYear(), month + 1, 1)
        const monthVisits = visits.filter((v) => {
          const vDate = new Date(v.visit_date)
          return vDate >= monthStart && vDate < monthEnd
        })
        const monthRevenue = monthVisits.reduce((sum, v) => sum + (v.total_amount || 0), 0)
        const monthTips = monthVisits.reduce((sum, v) => sum + (v.tip_amount || 0), 0)
        const monthString = monthStart.toLocaleDateString('fa-IR', { month: 'short', year: '2-digit' })
        chartData.push({ date: monthString, revenue: monthRevenue, tips: monthTips })
      }
    }

    return NextResponse.json({
      period,
      totalRevenue,
      totalTips,
      averageTransactionValue: periodVisits.length > 0 ? totalRevenue / periodVisits.length : 0,
      totalTransactions: periodVisits.length,
      uniqueCustomers: Object.keys(customerMap).length,
      topServices,
      topCustomers,
      topWorkers,
      chartData,
      comparison: {
        percentageChange: Math.round(percentageChange * 100) / 100,
        trend,
        prevPeriodRevenue: prevTotalRevenue,
      },
    })
  } catch (error) {
    console.error('Error fetching detailed analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
