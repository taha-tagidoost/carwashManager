import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const IRANIAN_VEHICLES: Record<string, string[]> = {
  'ایران خودرو': [
    'پژو 206',
    'پژو 207',
    'پژو پارس',
    'پژو 405',
    'دنا',
    'دنا پلاس',
    'سمند',
    'تارا',
    'رانا',
  ],
  'سایپا': [
    'پراید',
    'تیبا',
    'تیبا 2',
    'ساینا',
    'کوییک',
    'شاهین',
  ],
  'MVM': [
    'X22',
    'X33',
    'X55',
  ],
  'Chery': [
    'آریزو 5',
    'آریزو 6',
    'تیگو 7',
    'تیگو 8',
  ],
  'Bahman Motor': [
    'دیگنیتی',
    'فیدلیتی',
    'ریسپکت',
  ],
  'Kerman Motor': [
    'تویسن',
    'کروز',
  ],
  'Toyota': [
    'Corolla',
    'Camry',
    'RAV4',
    'Yaris',
    'Prius',
  ],
  'Hyundai': [
    'Elantra',
    'Tucson',
    'Sonata',
    'i10',
    'Accent',
  ],
  'Kia': [
    'Cerato',
    'Sportage',
    'Optima',
    'Picanto',
    'Rio',
  ],
}

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Missing Supabase credentials' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Check if brands already exist
    const { data: existingBrands } = await supabase
      .from('vehicle_brands')
      .select('id')
      .limit(1)

    if (existingBrands && existingBrands.length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Vehicle data already seeded',
      })
    }

    // Insert brands and models
    for (const [brandName, models] of Object.entries(IRANIAN_VEHICLES)) {
      // Insert brand
      const { data: brandData, error: brandError } = await supabase
        .from('vehicle_brands')
        .insert([{ name: brandName }])
        .select('id')
        .single()

      if (brandError) {
        console.error(`Error inserting brand ${brandName}:`, brandError)
        continue
      }

      // Insert models for this brand
      const modelInserts = models.map((modelName) => ({
        brand_id: brandData.id,
        name: modelName,
      }))

      const { error: modelsError } = await supabase
        .from('vehicle_models')
        .insert(modelInserts)

      if (modelsError) {
        console.error(`Error inserting models for ${brandName}:`, modelsError)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Vehicles seeded successfully',
    })
  } catch (error) {
    console.error('Error seeding vehicles:', error)
    return NextResponse.json(
      { error: 'Failed to seed vehicles' },
      { status: 500 }
    )
  }
}
