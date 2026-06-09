'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Plus, Trash2, Edit2, Loader2 } from 'lucide-react'
import Link from 'next/link'
<<<<<<< HEAD
=======
import { VehicleBrandsSection } from '@/components/vehicle-brands-section'
import { VehicleModelsSection } from '@/components/vehicle-models-section'
>>>>>>> 6e0a88a (initial commit - car wash crm)

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
<<<<<<< HEAD
  const [activeTab, setActiveTab] = useState<'services' | 'workers'>('services')
=======
  const [activeTab, setActiveTab] = useState<'services' | 'workers' | 'vehicles'>('services')
>>>>>>> 6e0a88a (initial commit - car wash crm)

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
    <main className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-violet-900">
      {/* Header */}
      <div className="border-b border-purple-800/50 bg-gradient-to-r from-purple-900 to-violet-900 shadow-lg backdrop-blur-md bg-opacity-95">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="hover:bg-purple-800 text-purple-100">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">تنظیمات</h1>
              <p className="text-purple-200 mt-1">مدیریت سرویس‌ها و کارگران</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Tabs */}
<<<<<<< HEAD
        <div className="flex gap-4 mb-8 border-b border-purple-700/50">
          <button
            onClick={() => setActiveTab('services')}
            className={`pb-3 px-4 font-medium transition-colors ${
=======
        <div className="flex gap-4 mb-8 border-b border-purple-700/50 overflow-x-auto">
          <button
            onClick={() => setActiveTab('services')}
            className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
>>>>>>> 6e0a88a (initial commit - car wash crm)
              activeTab === 'services'
                ? 'border-b-2 border-purple-400 text-purple-200'
                : 'text-purple-300 hover:text-purple-100'
            }`}
          >
            سرویس‌ها
          </button>
          <button
            onClick={() => setActiveTab('workers')}
<<<<<<< HEAD
            className={`pb-3 px-4 font-medium transition-colors ${
=======
            className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
>>>>>>> 6e0a88a (initial commit - car wash crm)
              activeTab === 'workers'
                ? 'border-b-2 border-purple-400 text-purple-200'
                : 'text-purple-300 hover:text-purple-100'
            }`}
          >
            کارگران
          </button>
<<<<<<< HEAD
=======
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'vehicles'
                ? 'border-b-2 border-purple-400 text-purple-200'
                : 'text-purple-300 hover:text-purple-100'
            }`}
          >
            خودروها
          </button>
>>>>>>> 6e0a88a (initial commit - car wash crm)
        </div>

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">مدیریت سرویس‌ها</h2>
              <Button onClick={() => setShowAddService(!showAddService)} size="lg" className="gap-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700">
                <Plus className="h-5 w-5" />
                سرویس جدید
              </Button>
            </div>

            {/* Add Service Form */}
            {showAddService && (
              <div className="rounded-xl border border-purple-600/50 bg-purple-900/50 backdrop-blur-sm p-6 shadow-lg">
                <form onSubmit={handleAddService} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">نام سرویس</label>
                    <Input
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      placeholder="مثال: روشویی"
                      className="bg-purple-800/50 border-purple-700 text-white placeholder:text-purple-400 focus:border-purple-500 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">قیمت پیش‌فرض</label>
                    <Input
                      type="number"
                      value={servicePrice}
                      onChange={(e) => setServicePrice(e.target.value)}
                      placeholder="100000"
                      className="bg-purple-800/50 border-purple-700 text-white placeholder:text-purple-400 focus:border-purple-500 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={submittingService} className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700">
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
                      className="border-purple-600 text-purple-200 hover:bg-purple-800"
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
              </div>
            )}

            {/* Services List */}
            {loading ? (
              <div className="p-8 text-center rounded-lg border border-purple-700/50 bg-purple-900/30">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-purple-300" />
                <p className="text-purple-200">درحال بارگذاری...</p>
              </div>
            ) : services.length === 0 ? (
              <div className="p-8 text-center rounded-lg border border-purple-700/50 bg-purple-900/30">
                <p className="text-purple-200">هیچ سرویسی تعریف نشده است</p>
                <Button onClick={() => setShowAddService(true)} className="mt-4 bg-gradient-to-r from-purple-600 to-violet-600">
                  <Plus className="h-4 w-4 ml-2" />
                  افزودن سرویس جدید
                </Button>
              </div>
            ) : (
              <div className="grid gap-4">
                {services.map((service) => (
                  <div key={service.id} className="rounded-lg border border-purple-600/50 bg-purple-900/40 backdrop-blur-sm p-4 hover:bg-purple-900/60 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-white">{service.name}</h3>
                        <p className="text-sm text-purple-300">{service.default_price.toLocaleString()} تومان</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" disabled className="text-purple-400">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteService(service.id)}
                          className="text-red-400 hover:bg-red-900/50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Workers Tab */}
        {activeTab === 'workers' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">مدیریت کارگران</h2>
              <Button onClick={() => setShowAddWorker(!showAddWorker)} size="lg" className="gap-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700">
                <Plus className="h-5 w-5" />
                کارگر جدید
              </Button>
            </div>

            {/* Add Worker Form */}
            {showAddWorker && (
              <div className="rounded-xl border border-purple-600/50 bg-purple-900/50 backdrop-blur-sm p-6 shadow-lg">
                <form onSubmit={handleAddWorker} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">نام کارگر</label>
                    <Input
                      value={workerName}
                      onChange={(e) => setWorkerName(e.target.value)}
                      placeholder="مثال: علی"
                      className="bg-purple-800/50 border-purple-700 text-white placeholder:text-purple-400 focus:border-purple-500 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">شماره تماس</label>
                    <Input
                      value={workerPhone}
                      onChange={(e) => setWorkerPhone(e.target.value)}
                      placeholder="09101234567"
                      className="bg-purple-800/50 border-purple-700 text-white placeholder:text-purple-400 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={submittingWorker} className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700">
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
                      className="border-purple-600 text-purple-200 hover:bg-purple-800"
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
              </div>
            )}

            {/* Workers List */}
            {loading ? (
              <div className="p-8 text-center rounded-lg border border-purple-700/50 bg-purple-900/30">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-purple-300" />
                <p className="text-purple-200">درحال بارگذاری...</p>
              </div>
            ) : workers.length === 0 ? (
              <div className="p-8 text-center rounded-lg border border-purple-700/50 bg-purple-900/30">
                <p className="text-purple-200">هیچ کارگری تعریف نشده است</p>
                <Button onClick={() => setShowAddWorker(true)} className="mt-4 bg-gradient-to-r from-purple-600 to-violet-600">
                  <Plus className="h-4 w-4 ml-2" />
                  افزودن کارگر جدید
                </Button>
              </div>
            ) : (
              <div className="grid gap-4">
                {workers.map((worker) => (
                  <div key={worker.id} className="rounded-lg border border-purple-600/50 bg-purple-900/40 backdrop-blur-sm p-4 hover:bg-purple-900/60 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-white">{worker.name}</h3>
                        {worker.phone && <p className="text-sm text-purple-300">{worker.phone}</p>}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" disabled className="text-purple-400">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteWorker(worker.id)}
                          className="text-red-400 hover:bg-red-900/50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
<<<<<<< HEAD
=======

        {/* Vehicles Tab */}
        {activeTab === 'vehicles' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">مدیریت خودروها</h2>
              <p className="text-purple-200 mb-6">برندها و مدل‌های خودرویی را مدیریت کنید</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <VehicleBrandsSection />
              <VehicleModelsSection />
            </div>
          </div>
        )}
>>>>>>> 6e0a88a (initial commit - car wash crm)
      </div>
    </main>
  )
}
