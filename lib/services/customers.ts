'use server'

import { createClient } from '@/lib/supabase/server'

export interface Customer {
  id: string
  full_name: string
  phone: string
  license_plate: string
  car_brand: string
  car_model: string
  created_at: string
  updated_at: string
}

export interface Visit {
  id: string
  customer_id: string
  visit_date: string
  service_type: string
  price: number | null
  notes: string | null
  created_at: string
}

export async function getCustomers() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching customers:', error)
    return []
  }
  return data as Customer[]
}

export async function getCustomerById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching customer:', error)
    return null
  }
  return data as Customer
}

export async function getCustomerVisits(customerId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('visits')
    .select('*')
    .eq('customer_id', customerId)
    .order('visit_date', { ascending: false })

  if (error) {
    console.error('Error fetching visits:', error)
    return []
  }
  return data as Visit[]
}

export async function createCustomer(customer: Omit<Customer, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('customers')
    .insert([customer])
    .select()
    .single()

  if (error) {
    console.error('Error creating customer:', error)
    return null
  }
  return data as Customer
}

export async function updateCustomer(id: string, updates: Partial<Customer>) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('customers')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating customer:', error)
    return null
  }
  return data as Customer
}

export async function deleteCustomer(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('customers').delete().eq('id', id)

  if (error) {
    console.error('Error deleting customer:', error)
    return false
  }
  return true
}

export async function addVisit(visit: Omit<Visit, 'id' | 'created_at'>) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('visits')
    .insert([visit])
    .select()
    .single()

  if (error) {
    console.error('Error adding visit:', error)
    return null
  }
  return data as Visit
}

export async function getCustomerStats() {
  const supabase = await createClient()
  const { data: customers, error } = await supabase.from('customers').select('id')

  if (error) {
    console.error('Error fetching customer count:', error)
    return { totalCustomers: 0, totalVisits: 0 }
  }

  const { data: visits, error: visitsError } = await supabase.from('visits').select('id')

  if (visitsError) {
    console.error('Error fetching visits count:', error)
    return { totalCustomers: customers?.length || 0, totalVisits: 0 }
  }

  return {
    totalCustomers: customers?.length || 0,
    totalVisits: visits?.length || 0,
  }
}

export async function searchCustomers(query: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .or(
      `full_name.ilike.%${query}%,phone.ilike.%${query}%,license_plate.ilike.%${query}%,car_brand.ilike.%${query}%`
    )
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error searching customers:', error)
    return []
  }
  return data as Customer[]
}
