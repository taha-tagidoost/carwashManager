import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateMockCustomers } from '@/lib/seed-data'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check if data already exists
    const { count } = await supabase.from('customers').select('*', { count: 'exact', head: true })

    if ((count || 0) > 0) {
      return NextResponse.json({ message: 'Database already seeded', count }, { status: 200 })
    }

    // Generate mock customers
    const customers = generateMockCustomers(24)

    // Insert customers
    const { data: insertedCustomers, error: customersError } = await supabase
      .from('customers')
      .insert(customers)
      .select()

    if (customersError) {
      console.error('Error inserting customers:', customersError)
      return NextResponse.json({ error: customersError.message }, { status: 500 })
    }

    // Generate and insert visits for each customer
    const visits = []
    const serviceTypes = ['سرویس عادی', 'سرویس VIP', 'واکس', 'تمیز داخل']
    const prices = [50000, 75000, 100000, 150000, 200000]

    for (const customer of insertedCustomers || []) {
      const visitCount = Math.floor(Math.random() * 5) + 1
      for (let i = 0; i < visitCount; i++) {
        const daysAgo = Math.floor(Math.random() * 90)
        visits.push({
          customer_id: customer.id,
          visit_date: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
          service_type: serviceTypes[Math.floor(Math.random() * serviceTypes.length)],
          price: prices[Math.floor(Math.random() * prices.length)],
          notes: 'سرویس منظم',
        })
      }
    }

    const { error: visitsError } = await supabase.from('visits').insert(visits)

    if (visitsError) {
      console.error('Error inserting visits:', visitsError)
      return NextResponse.json({ error: visitsError.message }, { status: 500 })
    }

    return NextResponse.json(
      {
        message: 'Database seeded successfully',
        customers: insertedCustomers?.length || 0,
        visits: visits.length,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 })
  }
}
