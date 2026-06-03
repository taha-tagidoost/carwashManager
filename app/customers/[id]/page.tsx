'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Plus, Trash2, Loader2, X } from 'lucide-react'
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
  worker_id?: string | null
  tip_amount: number
  total_amount: number
  notes?: string | null
  created_at: string
}

interface Service {
  id: string
  name: string
  default_price: number
  is_active: boolean
}

interface Worker {
  id: string
  name: string
  phone?: string
  is_active: boolean
}

interface VisitService {
  id: string
  visit_id: string
  service_id: string
  service_name_snapshot: string
  price: number
  quantity: number
  subtotal: number
}

interface InvoiceItem {
  service_id: string
  service_name: string
  price: number
  quantity: number
  subtotal: number
}

export default function CustomerDetailPage() {
  const params = useParams()
  const customerId = params.id as string

  const [customer, setCustomer] = useState<Customer | null>(null)
  const [visits, setVisits] = useState<Visit[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [workers, setWorkers] = useState<Worker[]>([])
  const [loading, setLoading] = useState(true)

  // Invoice form states
  const [showInvoice, setShowInvoice] = useState(false)
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([])
  const [selectedWorker, setSelectedWorker] = useState('')
  const [tipAmount, setTipAmount] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchData = async () => {
    try {
      const [customerRes, visitsRes, servicesRes, workersRes] = await Promise.all([
        fetch(`/api/customers/${customerId}`),
        fetch(`/api/customers/${customerId}/visits`),
        fetch('/api/services'),
        fetch('/api/workers?all=true'),
      ])

      if (customerRes.ok) {
        setCustomer(await customerRes.json())
      }
      if (visitsRes.ok) {
        setVisits(await visitsRes.json())
      }
      if (servicesRes.ok) {
        setServices(await servicesRes.json())
      }
      if (workersRes.ok) {
        setWorkers(await workersRes.json())
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

  const handleAddServiceToInvoice = (service: Service) => {
    const existingItem = invoiceItems.find((item) => item.service_id === service.id)
    if (existingItem) {
      setInvoiceItems(
        invoiceItems.map((item) =>
          item.service_id === service.id
            ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.price }
            : item
        )
      )
    } else {
      setInvoiceItems([
        ...invoiceItems,
        {
          service_id: service.id,
          service_name: service.name,
          price: service.default_price,
          quantity: 1,
          subtotal: service.default_price,
        },
      ])
    }
  }

  const handleRemoveServiceFromInvoice = (serviceId: string) => {
    setInvoiceItems(invoiceItems.filter((item) => item.service_id !== serviceId))
  }

  const handleUpdateItemPrice = (serviceId: string, newPrice: number) => {
    setInvoiceItems(
      invoiceItems.map((item) =>
        item.service_id === serviceId
          ? { ...item, price: newPrice, subtotal: newPrice * item.quantity }
          : item
      )
    )
  }

  const handleUpdateItemQuantity = (serviceId: string, newQuantity: number) => {
    if (newQuantity <= 0) return
    setInvoiceItems(
      invoiceItems.map((item) =>
        item.service_id === serviceId
          ? { ...item, quantity: newQuantity, subtotal: item.price * newQuantity }
          : item
      )
    )
  }

  const servicesTotal = invoiceItems.reduce((sum, item) => sum + item.subtotal, 0)
  const finalTotal = servicesTotal + (parseFloat(tipAmount) || 0)

  const handleSubmitInvoice = async (e: React.FormEvent) => {
    e.preventDefault()
    if (invoiceItems.length === 0) return

    setSubmitting(true)
    try {
      // Create the visit
      const visitRes = await fetch(`/api/customers/${customerId}/visits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          worker_id: selectedWorker || null,
          tip_amount: parseFloat(tipAmount) || 0,
          total_amount: finalTotal,
          notes: notes || null,
          visit_date: new Date().toISOString(),
        }),
      })

      if (!visitRes.ok) throw new Error('Failed to create visit')
      const visit = await visitRes.json()

      // Add visit services
      for (const item of invoiceItems) {
        await fetch('/api/visit-services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            visit_id: visit.id,
            service_id: item.service_id,
            service_name_snapshot: item.service_name,
            price: item.price,
            quantity: item.quantity,
            subtotal: item.subtotal,
          }),
        })
      }

      // Reset form
      setInvoiceItems([])
      setSelectedWorker('')
      setTipAmount('')
      setNotes('')
      setShowInvoice(false)
      await fetchData()
    } catch (error) {
      console.error('Error submitting invoice:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteVisit = async (visitId: string) => {
    if (!confirm('آیا می‌خواهید این سفارش را حذف کنید؟')) return

    try {
      const response = await fetch(`/api/visits/${visitId}`, { method: 'DELETE' })
      if (response.ok) {
        await fetchData()
      }
    } catch (error) {
      console.error('Error deleting visit:', error)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
      </main>
    )
  }

  if (!customer) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <p className="text-gray-600">مشتری یافت نشد</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{customer.full_name}</h1>
              <p className="text-gray-600">{customer.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Customer Info */}
        <Card className="p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">اطلاعات خودرو</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600">پلاک</p>
              <p className="font-mono text-gray-900">{customer.license_plate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">برند و مدل</p>
              <p className="text-gray-900">
                {customer.car_brand} {customer.car_model}
              </p>
            </div>
          </div>
        </Card>

        {/* Service Invoice Builder */}
        {!showInvoice ? (
          <div className="mb-8">
            <Button onClick={() => setShowInvoice(true)} size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              سرویس جدید
            </Button>
          </div>
        ) : (
          <Card className="p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">تشکیل صورتحساب</h2>
              <button
                onClick={() => {
                  setShowInvoice(false)
                  setInvoiceItems([])
                  setSelectedWorker('')
                  setTipAmount('')
                  setNotes('')
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmitInvoice} className="space-y-6">
              {/* Available Services */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">سرویس‌های موجود</h3>
                {services.filter((s) => s.is_active).length === 0 ? (
                  <div className="p-6 text-center border border-gray-300 rounded-lg bg-gray-50">
                    <p className="text-gray-600 mb-3">هیچ سرویسی تعریف نشده است</p>
                    <Link href="/settings">
                      <Button variant="outline" size="sm">
                        افزودن سرویس جدید
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {services
                      .filter((s) => s.is_active)
                      .map((service) => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => handleAddServiceToInvoice(service)}
                          className="p-3 text-right border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                        >
                          <p className="font-medium text-gray-900">{service.name}</p>
                          <p className="text-sm text-gray-600">{service.default_price.toLocaleString()} تومان</p>
                        </button>
                      ))}
                  </div>
                )}
              </div>

              {/* Invoice Items */}
              {invoiceItems.length > 0 && (
                <div className="border-t pt-6">
                  <h3 className="font-medium text-gray-900 mb-3">آیتم‌های صورتحساب</h3>
                  <div className="space-y-3">
                    {invoiceItems.map((item) => (
                      <div key={item.service_id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.service_name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleUpdateItemQuantity(item.service_id, parseInt(e.target.value) || 1)}
                            className="w-12 text-center"
                            min="1"
                          />
                          <span className="text-gray-600">×</span>
                          <Input
                            type="number"
                            value={item.price}
                            onChange={(e) => handleUpdateItemPrice(item.service_id, parseFloat(e.target.value) || 0)}
                            className="w-24 text-center"
                          />
                          <span className="text-gray-900 font-medium min-w-max">{item.subtotal.toLocaleString()}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveServiceFromInvoice(item.service_id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Worker Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">کارگر</label>
                <select
                  value={selectedWorker}
                  onChange={(e) => setSelectedWorker(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-900"
                >
                  <option value="">انتخاب کارگر</option>
                  {workers
                    .filter((w) => w.is_active)
                    .map((worker) => (
                      <option key={worker.id} value={worker.id}>
                        {worker.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Totals */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">جمع خدمات</span>
                  <span className="font-medium text-gray-900">{servicesTotal.toLocaleString()} تومان</span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">انعام کارگر</label>
                  <Input
                    type="number"
                    value={tipAmount}
                    onChange={(e) => setTipAmount(e.target.value)}
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div className="border-t pt-2 font-bold">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900">مبلغ نهایی</span>
                    <span className="text-lg text-blue-600">{finalTotal.toLocaleString()} تومان</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">یادداشت</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="یادداشت‌های اضافی..."
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" disabled={submitting || invoiceItems.length === 0} className="w-full" size="lg">
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    درحال ذخیره...
                  </>
                ) : (
                  'ثبت سفارش'
                )}
              </Button>
            </form>
          </Card>
        )}

        {/* Visit History */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">تاریخچه سرویس‌ها</h2>
          {visits.length === 0 ? (
            <Card className="p-8 text-center text-gray-500">
              <p>هیچ سرویسی ثبت نشده است</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {visits.map((visit) => (
                <Card key={visit.id} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">
                        {new Date(visit.visit_date).toLocaleDateString('fa-IR')}
                      </p>
                      {visit.total_amount && (
                        <p className="text-sm text-gray-600">{visit.total_amount.toLocaleString()} تومان</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteVisit(visit.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  {visit.notes && <p className="text-sm text-gray-600 mt-2">{visit.notes}</p>}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
