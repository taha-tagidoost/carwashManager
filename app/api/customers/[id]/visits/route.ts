import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: customerId } = await params
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('visits')
      .select('*')
      .eq('customer_id', customerId)
      .order('visit_date', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching visits:', error)
    return NextResponse.json({ error: 'Failed to fetch visits' }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: customerId } = await params
    const body = await request.json()
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('visits')
      .insert([{ ...body, customer_id: customerId }])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error creating visit:', error)
    return NextResponse.json({ error: 'Failed to create visit' }, { status: 500 })
  }
}
