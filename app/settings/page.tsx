'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Plus, Trash2, Edit2, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface Service {
  id: string
  name: string
  default_price: number
  is_active: boolean
  created_at: string
}

interface Worker {
  id: string
  name: string
  phone?: string
  is_active: boolean
  created_at: string
}

export default function SettingsPage() {
  const [services, setServices] = useState<Service[]>([])
  const [workers, setWorkers] = useState<Worker[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'services' | 'workers'>('services')

  // Service form states
  const [showAddService, setShowAddService] = useState(false)
  const [serviceName, setServiceName] = useState('')
  const [servicePrice, setServicePrice] = useState('')
  const [submittingService, setSubmittingService] = useState(false)

  // Worker form states
  const [showAddWorker, setShowAddWorker] = useState(false)
  const [workerName, setWorkerName] = useState('')
  const [workerPhone, setWorkerPhone] = useState('')
  const [submittingWorker, setSubmittingWorker] = useState(false)

  useEffect(() => {
    fetchServices()
    fetchWorkers()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      if (response.ok) {
        const data = await response.json()
        setServices(data)
      }
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchWorkers = async () => {
    try {
      const response = await fetch('/api/workers?all=true')
      if (response.ok) {
        const data = await response.json()
        setWorkers(data)
      }
    } catch (error) {
      console.error('Error fetching workers:', error)
    }
  }

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!serviceName || !servicePrice) return

    setSubmittingService(true)
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: serviceName,
          default_price: parseFloat(servicePrice),
          is_active: true,
        }),
      })

      if (response.ok) {
        await fetchServices()
        setServiceName('')
        setServicePrice('')
        setShowAddService(false)
      }
    } catch (error) {
      console.error('Error adding service:', error)
    } finally {
      setSubmittingService(false)
    }
  }

  const handleDeleteService = async (id: string) => {
    if (!confirm('آیا می‌خواهید این سرویس را حذف کنید؟')) return

    try {
      const response = await fetch(`/api/services/${id}`, { method: 'DELETE' })
      if (response.ok) {
        await fetchServices()
      }
    } catch (error) {
      console.error('Error deleting service:', error)
    }
  }

  const handleAddWorker = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!workerName) return

    setSubmittingWorker(true)
    try {
      const response = await fetch('/api/workers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: workerName,
          phone: workerPhone || null,
          is_active: true,
        }),
      })

      if (response.ok) {
        await fetchWorkers()
        setWorkerName('')
        setWorkerPhone('')
        setShowAddWorker(false)
      }
    } catch (error) {
      console.error('Error adding worker:', error)
    } finally {
      setSubmittingWorker(false)
    }
  }

  const handleDeleteWorker = async (id: string) => {
    if (!confirm('آیا می‌خواهید این کارگر را حذف کنید؟')) return

    try {
      const response = await fetch(`/api/workers/${id}`, { method: 'DELETE' })
      if (response.ok) {
        await fetchWorkers()
      }
    } catch (error) {
      console.error('Error deleting worker:', error)
    }
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
            <div>
              <h1 className="text-3xl font-bold text-gray-900">تنظیمات</h1>
              <p className="text-gray-600">مدیریت سرویس‌ها و کارگران</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('services')}
            className={`pb-3 px-4 font-medium transition-colors ${
              activeTab === 'services'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            سرویس‌ها
          </button>
          <button
            onClick={() => setActiveTab('workers')}
            className={`pb-3 px-4 font-medium transition-colors ${
              activeTab === 'workers'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            کارگران
          </button>
        </div>

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">مدیریت سرویس‌ها</h2>
              <Button onClick={() => setShowAddService(!showAddService)} size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                سرویس جدید
              </Button>
            </div>

            {/* Add Service Form */}
            {showAddService && (
              <Card className="p-6">
                <form onSubmit={handleAddService} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">نام سرویس</label>
                    <Input
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      placeholder="مثال: روشویی"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">قیمت پیش‌فرض</label>
                    <Input
                      type="number"
                      value={servicePrice}
                      onChange={(e) => setServicePrice(e.target.value)}
                      placeholder="100000"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={submittingService}>
                      {submittingService ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          درحال ذخیره...
                        </>
                      ) : (
                        'افزودن سرویس'
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowAddService(false)
                        setServiceName('')
                        setServicePrice('')
                      }}
                    >
                      لغو
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Services List */}
            {loading ? (
              <Card className="p-8 text-center">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                <p className="text-gray-600">درحال بارگذاری...</p>
              </Card>
            ) : services.length === 0 ? (
              <Card className="p-8 text-center text-gray-500">
                <p>هیچ سرویسی تعریف نشده است</p>
              </Card>
            ) : (
              <div className="grid gap-4">
                {services.map((service) => (
                  <Card key={service.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{service.name}</h3>
                        <p className="text-sm text-gray-600">{service.default_price.toLocaleString()} تومان</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" disabled>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteService(service.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Workers Tab */}
        {activeTab === 'workers' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">مدیریت کارگران</h2>
              <Button onClick={() => setShowAddWorker(!showAddWorker)} size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                کارگر جدید
              </Button>
            </div>

            {/* Add Worker Form */}
            {showAddWorker && (
              <Card className="p-6">
                <form onSubmit={handleAddWorker} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">نام کارگر</label>
                    <Input
                      value={workerName}
                      onChange={(e) => setWorkerName(e.target.value)}
                      placeholder="مثال: علی"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">شماره تماس</label>
                    <Input
                      value={workerPhone}
                      onChange={(e) => setWorkerPhone(e.target.value)}
                      placeholder="09101234567"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={submittingWorker}>
                      {submittingWorker ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          درحال ذخیره...
                        </>
                      ) : (
                        'افزودن کارگر'
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowAddWorker(false)
                        setWorkerName('')
                        setWorkerPhone('')
                      }}
                    >
                      لغو
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Workers List */}
            {loading ? (
              <Card className="p-8 text-center">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                <p className="text-gray-600">درحال بارگذاری...</p>
              </Card>
            ) : workers.length === 0 ? (
              <Card className="p-8 text-center text-gray-500">
                <p>هیچ کارگری تعریف نشده است</p>
              </Card>
            ) : (
              <div className="grid gap-4">
                {workers.map((worker) => (
                  <Card key={worker.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{worker.name}</h3>
                        {worker.phone && <p className="text-sm text-gray-600">{worker.phone}</p>}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" disabled>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteWorker(worker.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
