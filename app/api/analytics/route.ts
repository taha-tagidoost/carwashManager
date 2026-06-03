import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    // Get total revenue
    const { data: visits } = await supabase.from('visits').select('total_amount, tip_amount, visit_date')

    // Get visit services for detailed breakdown
    const { data: visitServices } = await supabase.from('visit_services').select('service_id, service_name_snapshot, subtotal, visit_id')

    // Get services for top services calculation
    const { data: services } = await supabase.from('services').select('id, name')

    // Calculate analytics
    const totalRevenue = visits?.reduce((sum, v) => sum + (v.total_amount || 0), 0) || 0
    const totalTips = visits?.reduce((sum, v) => sum + (v.tip_amount || 0), 0) || 0

    // Revenue this month
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    const thisMonthRevenue =
      visits?.reduce((sum, v) => {
        if (new Date(v.visit_date) >= new Date(monthStart)) {
          return sum + (v.total_amount || 0)
        }
        return sum
      }, 0) || 0

    // Revenue this week
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const thisWeekRevenue =
      visits?.reduce((sum, v) => {
        if (new Date(v.visit_date) >= new Date(weekStart)) {
          return sum + (v.total_amount || 0)
        }
        return sum
      }, 0) || 0

    // Most popular services
    const serviceCountMap: Record<string, number> = {}
    visitServices?.forEach((vs) => {
      serviceCountMap[vs.service_name_snapshot] = (serviceCountMap[vs.service_name_snapshot] || 0) + 1
    })

    const topServices = Object.entries(serviceCountMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Top customers by spending
    const { data: customers } = await supabase.from('customers').select('id, full_name')
    const customerSpending: Record<string, { name: string; total: number; count: number }> = {}

    visits?.forEach((v) => {
      if (!customerSpending[v.visit_date]) {
        customerSpending[v.visit_date] = { name: '', total: 0, count: 0 }
      }
    })

    // Get customer IDs from visits and calculate spending
    const { data: visitsWithCustomer } = await supabase
      .from('visits')
      .select('customer_id, total_amount')

    const customerMap: Record<string, number> = {}
    visitsWithCustomer?.forEach((v) => {
      customerMap[v.customer_id] = (customerMap[v.customer_id] || 0) + (v.total_amount || 0)
    })

    const topCustomers = customers
      ?.map((c) => ({
        name: c.full_name,
        total: customerMap[c.id] || 0,
      }))
      .filter((c) => c.total > 0)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5) || []

    // Revenue by month (last 6 months)
    const revenueByMonth: Record<string, number> = {}
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthKey = date.toLocaleDateString('fa-IR', { month: 'short', year: 'numeric' })
      revenueByMonth[monthKey] = 0
    }

    visits?.forEach((v) => {
      const date = new Date(v.visit_date)
      const monthKey = date.toLocaleDateString('fa-IR', { month: 'short', year: 'numeric' })
      if (monthKey in revenueByMonth) {
        revenueByMonth[monthKey] += v.total_amount || 0
      }
    })

    return NextResponse.json({
      totalRevenue,
      totalTips,
      thisMonthRevenue,
      thisWeekRevenue,
      topServices,
      topCustomers,
      revenueByMonth: Object.entries(revenueByMonth).map(([month, revenue]) => ({ month, revenue })),
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
