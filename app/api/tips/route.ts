import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const visitId = request.nextUrl.searchParams.get('visit_id')
    const workerId = request.nextUrl.searchParams.get('worker_id')

    let query = supabase.from('tips').select('*')

    if (visitId) {
      query = query.eq('visit_id', visitId)
    }
    if (workerId) {
      query = query.eq('worker_id', workerId)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching tips:', error)
    return NextResponse.json({ error: 'Failed to fetch tips' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('tips')
      .insert([body])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error creating tip:', error)
    return NextResponse.json({ error: 'Failed to create tip' }, { status: 500 })
  }
}
