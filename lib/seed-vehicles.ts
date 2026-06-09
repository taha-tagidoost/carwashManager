import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export const IRANIAN_VEHICLES = {
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

export async function seedVehicles() {
  try {
    // Check if brands already exist
    const { data: existingBrands } = await supabase
      .from('vehicle_brands')
      .select('id')
      .limit(1)

    if (existingBrands && existingBrands.length > 0) {
      console.log('Vehicle data already seeded')
      return { success: true, message: 'Already seeded' }
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

    return { success: true, message: 'Vehicles seeded successfully' }
  } catch (error) {
    console.error('Error seeding vehicles:', error)
    return { success: false, error }
  }
}

export async function getVehicleBrands() {
  try {
    const { data, error } = await supabase
      .from('vehicle_brands')
      .select('id, name')
      .order('name')

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching brands:', error)
    return []
  }
}

export async function getVehicleModelsByBrand(brandId: string) {
  try {
    const { data, error } = await supabase
      .from('vehicle_models')
      .select('id, name')
      .eq('brand_id', brandId)
      .order('name')

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching models:', error)
    return []
  }
}
