import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

    const { data: visits } = await supabase.from('visits').select('total_amount, visit_date, customer_id')
    const { data: visitServices } = await supabase.from('visit_services').select('service_name_snapshot, visit_id')
    const { data: customers } = await supabase.from('customers').select('id')

    if (!visits) {
      return NextResponse.json({
        todayRevenue: 0,
        weekRevenue: 0,
        monthRevenue: 0,
        topService: null,
        activeCustomersThisWeek: 0,
      })
    }

    // Calculate revenues
    const todayVisits = visits.filter((v) => v.visit_date >= today)
    const todayRevenue = todayVisits.reduce((sum, v) => sum + (v.total_amount || 0), 0)

    const weekVisits = visits.filter((v) => v.visit_date >= weekStart)
    const weekRevenue = weekVisits.reduce((sum, v) => sum + (v.total_amount || 0), 0)

    const monthVisits = visits.filter((v) => v.visit_date >= monthStart)
    const monthRevenue = monthVisits.reduce((sum, v) => sum + (v.total_amount || 0), 0)

    // Top service this month
    const serviceCountMap: Record<string, number> = {}
    visitServices?.forEach((vs) => {
      if (monthVisits.some((v) => v.visit_date === vs.visit_id)) {
        serviceCountMap[vs.service_name_snapshot] = (serviceCountMap[vs.service_name_snapshot] || 0) + 1
      }
    })

    const topService = Object.entries(serviceCountMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)[0] || null

    // Active customers this week
    const activeCustomersSet = new Set<string>()
    weekVisits.forEach((v) => {
      activeCustomersSet.add(v.customer_id)
    })

    return NextResponse.json({
      todayRevenue,
      weekRevenue,
      monthRevenue,
      topService,
      activeCustomersThisWeek: activeCustomersSet.size,
    })
  } catch (error) {
    console.error('Error fetching dashboard summary:', error)
    return NextResponse.json({ error: 'Failed to fetch summary' }, { status: 500 })
  }
}
