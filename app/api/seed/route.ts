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

    // Note: Services and visits are not seeded. User must add services manually through Settings page.
    // This ensures no hardcoded service definitions exist in the codebase.

    return NextResponse.json(
      {
        message: 'Customers seeded successfully. Please add services in Settings page.',
        customers: insertedCustomers?.length || 0,
        visits: 0,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 })
  }
}
