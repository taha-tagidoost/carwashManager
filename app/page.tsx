'use client'

import { useEffect, useState, useCallback } from 'react'
import { Plus, Search, Phone, Car, Trash2, Loader2, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
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

export default function DashboardPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [carBrandFilter, setCarBrandFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [seeding, setSeeding] = useState(false)
  const [stats, setStats] = useState({ totalCustomers: 0, totalVisits: 0 })
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalTips: 0,
    thisMonthRevenue: 0,
    thisWeekRevenue: 0,
    topServices: [],
    topCustomers: [],
  })

  const carBrands = ['Toyota', 'Hyundai', 'Kia', 'Peugeot', 'Renault', 'BMW', 'Mercedes', 'Nissan']

  const fetchCustomers = useCallback(async () => {
    try {
      const response = await fetch('/api/customers')
      if (response.ok) {
        const data = await response.json()
        setCustomers(data)
        setFilteredCustomers(data)
      }
    } catch (error) {
      console.error('Error fetching customers:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch('/api/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }, [])

  const fetchAnalytics = useCallback(async () => {
    try {
      const response = await fetch('/api/analytics')
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    }
  }, [])

  useEffect(() => {
    fetchCustomers()
    fetchStats()
    fetchAnalytics()
  }, [fetchCustomers, fetchStats, fetchAnalytics])

  const handleSeedData = async () => {
    setSeeding(true)
    try {
      const response = await fetch('/api/seed', { method: 'POST' })
      if (response.ok) {
        await fetchCustomers()
        await fetchStats()
        await fetchAnalytics()
      }
    } catch (error) {
      console.error('Error seeding data:', error)
    } finally {
      setSeeding(false)
    }
  }

  useEffect(() => {
    let filtered = customers

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (customer) =>
          customer.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.phone.includes(searchQuery) ||
          customer.license_plate.includes(searchQuery) ||
          customer.car_brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (carBrandFilter !== 'all') {
      filtered = filtered.filter((customer) => customer.car_brand === carBrandFilter)
    }

    setFilteredCustomers(filtered)
  }, [searchQuery, carBrandFilter, customers])

  const handleDelete = async (id: string) => {
    if (!confirm('آیا می‌خواهید این مشتری را حذف کنید؟')) return

    try {
      const response = await fetch(`/api/customers/${id}`, { method: 'DELETE' })
      if (response.ok) {
        await fetchCustomers()
        await fetchStats()
      }
    } catch (error) {
      console.error('Error deleting customer:', error)
    }
  }

  const resetFilters = () => {
    setSearchQuery('')
    setCarBrandFilter('all')
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">مدیریت مشتریان</h1>
              <p className="text-gray-600">سیستم مدیریت مشتریان و سرویس های شستشوی خودرو</p>
            </div>
            <Link href="/settings">
              <Button variant="outline" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard title="کل مشتریان" value={stats.totalCustomers} color="blue" />
          <StatCard title="کل سرویس‌ها" value={stats.totalVisits} color="green" />
          <StatCard
            title="درآمد کل"
            value={`${(analytics.totalRevenue / 1000000).toFixed(1)}M`}
            color="purple"
          />
          <StatCard title="انعام‌ها" value={`${(analytics.totalTips / 1000).toFixed(0)}K`} color="emerald" />
        </div>

        {/* Financial Analytics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <AnalyticsCard
            title="درآمد این ماه"
            value={analytics.thisMonthRevenue.toLocaleString()}
            unit="تومان"
          />
          <AnalyticsCard
            title="درآمد این هفته"
            value={analytics.thisWeekRevenue.toLocaleString()}
            unit="تومان"
          />
        </div>

        {/* Top Services & Customers */}
        {analytics.topServices.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">سرویس‌های محبوب</h2>
              <div className="space-y-2">
                {analytics.topServices.map((service: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-gray-600">{service.name}</span>
                    <span className="font-medium text-gray-900">{service.count} سفارش</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">مشتریان برتر</h2>
              <div className="space-y-2">
                {analytics.topCustomers.map((customer: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-gray-600">{customer.name}</span>
                    <span className="font-medium text-gray-900">{customer.total.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Actions and Search */}
        <div className="mb-8 space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap gap-4 mb-4">
            <Link href="/customers/new">
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                مشتری جدید
              </Button>
            </Link>
            {customers.length === 0 && (
              <Button onClick={handleSeedData} variant="outline" disabled={seeding}>
                {seeding ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    در حال بارگذاری...
                  </>
                ) : (
                  'بارگذاری نمونه داده‌ها'
                )}
              </Button>
            )}
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">جستجو</label>
              <div className="relative">
                <Search className="absolute right-3 top-3 size-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="نام، شماره، پلاک..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">برند خودرو</label>
              <select
                value={carBrandFilter}
                onChange={(e) => setCarBrandFilter(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <SelectItem value="all">همه برندها</SelectItem>
                {carBrands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              {filteredCustomers.length} از {customers.length} مشتری
            </p>
            {(searchQuery || carBrandFilter !== 'all') && (
              <Button variant="outline" size="sm" onClick={resetFilters} className="text-gray-700">
                پاک کردن فیلترها
              </Button>
            )}
          </div>
        </div>

        {/* Customer List */}
        <div className="space-y-4">
          {loading ? (
            <Card className="p-8 text-center text-gray-500 flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              در حال بارگذاری...
            </Card>
          ) : filteredCustomers.length === 0 ? (
            <Card className="p-8 text-center text-gray-500">
              {customers.length === 0 ? 'هیچ مشتری ثبت نشده است' : 'نتیجه‌ای برای جستجو پیدا نشد'}
            </Card>
          ) : (
            filteredCustomers.map((customer) => (
              <Link key={customer.id} href={`/customers/${customer.id}`}>
                <Card className="p-4 transition-all hover:shadow-md hover:ring-1 hover:ring-blue-600 cursor-pointer">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{customer.full_name}</h3>
                      <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        {customer.phone}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">پلاک خودرو</p>
                      <p className="font-mono text-gray-900">{customer.license_plate}</p>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm text-gray-600">خودرو</p>
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4" />
                          <span className="text-gray-900">
                            {customer.car_brand} {customer.car_model}
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.preventDefault()
                          handleDelete(customer.id)
                        }}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  )
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string
  value: string | number
  color: 'blue' | 'green' | 'purple' | 'emerald'
}) {
  const colorStyles = {
    blue: 'bg-blue-50 border-blue-200 text-blue-900',
    green: 'bg-green-50 border-green-200 text-green-900',
    purple: 'bg-purple-50 border-purple-200 text-purple-900',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-900',
  }

  return (
    <div className={`rounded-lg border ${colorStyles[color]} p-6`}>
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  )
}

function SelectItem({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) {
  return (
    <option value={value}>
      {children}
    </option>
  )
}

function AnalyticsCard({
  title,
  value,
  unit = '',
}: {
  title: string
  value: string | number
  unit?: string
}) {
  return (
    <Card className="p-6">
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="mt-2 text-2xl font-bold text-gray-900">
        {value} {unit}
      </p>
    </Card>
  )
}
