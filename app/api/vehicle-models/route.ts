import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const brandId = request.nextUrl.searchParams.get('brand_id')

    let query = supabase.from('vehicle_models').select('*')

    if (brandId) {
      query = query.eq('brand_id', brandId)
    }

    const { data, error } = await query.order('name', { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching vehicle models:', error)
    return NextResponse.json({ error: 'Failed to fetch vehicle models' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('vehicle_models')
      .insert([{ brand_id: body.brand_id, name: body.name }])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error creating vehicle model:', error)
    return NextResponse.json({ error: 'Failed to create vehicle model' }, { status: 500 })
  }
}
