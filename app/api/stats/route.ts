import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    const { count: customerCount, error: customerError } = await supabase
      .from('customers')
      .select('*', { count: 'exact', head: true })

    const { count: visitCount, error: visitError } = await supabase
      .from('visits')
      .select('*', { count: 'exact', head: true })

    if (customerError || visitError) {
      return NextResponse.json(
        { totalCustomers: 0, totalVisits: 0 },
        { status: 200 }
      )
    }

    return NextResponse.json({
      totalCustomers: customerCount || 0,
      totalVisits: visitCount || 0,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ totalCustomers: 0, totalVisits: 0 }, { status: 200 })
  }
}
