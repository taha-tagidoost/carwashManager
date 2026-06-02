'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Plus, Calendar, Phone, Car, FileText, Trash2, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface Customer {
  id: string
  full_name: string
  phone: string
  license_plate: string
  car_brand: string
  car_model: string
  created_at: string
  updated_at: string
}

interface Visit {
  id: string
  customer_id: string
  visit_date: string
  service_type: string
  price: number | null
  notes: string | null
  created_at: string
}

export default function CustomerDetailPage() {
  const params = useParams()
  const router = useRouter()
  const customerId = params.id as string

  const [customer, setCustomer] = useState<Customer | null>(null)
  const [visits, setVisits] = useState<Visit[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddVisit, setShowAddVisit] = useState(false)
  const [newVisit, setNewVisit] = useState({ service_type: '', price: '', notes: '' })
  const [submitting, setSubmitting] = useState(false)

  const serviceTypes = ['سرویس عادی', 'سرویس VIP', 'واکس', 'تمیز داخل']

  const fetchData = async () => {
    try {
      const [customerRes, visitsRes] = await Promise.all([
        fetch(`/api/customers/${customerId}`),
        fetch(`/api/customers/${customerId}/visits`),
      ])

      if (customerRes.ok) {
        setCustomer(await customerRes.json())
      }
      if (visitsRes.ok) {
        setVisits(await visitsRes.json())
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [customerId])

  const handleAddVisit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newVisit.service_type) return

    setSubmitting(true)
    try {
      const response = await fetch(`/api/customers/${customerId}/visits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_type: newVisit.service_type,
          price: newVisit.price ? parseFloat(newVisit.price) : null,
          notes: newVisit.notes || null,
          visit_date: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setNewVisit({ service_type: '', price: '', notes: '' })
        setShowAddVisit(false)
        await fetchData()
      }
    } catch (error) {
      console.error('Error adding visit:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteVisit = async (visitId: string) => {
    if (!confirm('آیا می‌خواهید این سرویس را حذف کنید؟')) return

    try {
      const response = await fetch(`/api/visits/${visitId}`, { method: 'DELETE' })
      if (response.ok) {
        setVisits(visits.filter((v) => v.id !== visitId))
      }
    } catch (error) {
      console.error('Error deleting visit:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
        <div className="mx-auto max-w-4xl flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
        <div className="mx-auto max-w-4xl">
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            بازگشت
          </Button>
          <Card className="mt-4 p-8 text-center">
            <h2 className="text-lg font-semibold text-gray-900">مشتری یافت نشد</h2>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{customer.full_name}</h1>
                <p className="text-gray-600">مشخصات مشتری</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Customer Info */}
        <Card className="mb-8 p-6">
          <h2 className="mb-6 text-xl font-bold text-gray-900">اطلاعات شخصی</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">نام</label>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 text-gray-900">
                {customer.full_name}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">شماره تلفن</label>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 text-gray-900">
                <Phone className="h-4 w-4" />
                {customer.phone}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">پلاک خودرو</label>
              <div className="p-3 rounded-lg bg-gray-50 font-mono text-gray-900">{customer.license_plate}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">مدل خودرو</label>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 text-gray-900">
                <Car className="h-4 w-4" />
                {customer.car_brand} {customer.car_model}
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              تاریخ عضویت: {new Date(customer.created_at).toLocaleDateString('fa-IR')}
            </p>
          </div>
        </Card>

        {/* Visits Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-600" />
              <h2 className="text-xl font-bold text-gray-900">سرویس‌ها ({visits.length})</h2>
            </div>
            <Button onClick={() => setShowAddVisit(!showAddVisit)} size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              سرویس جدید
            </Button>
          </div>

          {/* Add Visit Form */}
          {showAddVisit && (
            <form onSubmit={handleAddVisit} className="mb-6 rounded-lg border border-gray-200 p-4 bg-gray-50">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نوع سرویس</label>
                  <select
                    value={newVisit.service_type}
                    onChange={(e) => setNewVisit({ ...newVisit, service_type: e.target.value })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">انتخاب کنید</option>
                    {serviceTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">قیمت (اختیاری)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={newVisit.price}
                    onChange={(e) => setNewVisit({ ...newVisit, price: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">یادداشت (اختیاری)</label>
                  <Input
                    placeholder="توضیحات"
                    value={newVisit.notes}
                    onChange={(e) => setNewVisit({ ...newVisit, notes: e.target.value })}
                  />
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button type="submit" disabled={submitting || !newVisit.service_type}>
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      درحال ذخیره...
                    </>
                  ) : (
                    'ثبت سرویس'
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddVisit(false)}>
                  لغو
                </Button>
              </div>
            </form>
          )}

          {/* Visits List */}
          <div className="space-y-3">
            {visits.length === 0 ? (
              <p className="py-8 text-center text-gray-500">هیچ سرویسی ثبت نشده است</p>
            ) : (
              visits.map((visit) => (
                <div key={visit.id} className="flex items-start justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="font-semibold text-gray-900">{visit.service_type}</span>
                    </div>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <p>{new Date(visit.visit_date).toLocaleDateString('fa-IR')}</p>
                      {visit.price && <p>قیمت: {visit.price.toLocaleString('fa-IR')} تومان</p>}
                      {visit.notes && <p className="text-gray-700">{visit.notes}</p>}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteVisit(visit.id)}
                    className="text-red-600 hover:bg-red-50 ml-4"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
