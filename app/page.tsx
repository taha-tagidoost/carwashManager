'use client';

import { useState, useMemo } from 'react';
import { CustomerCard } from '@/components/customer-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockCustomers } from '@/lib/mock-data';
import { Search, Users, Filter } from 'lucide-react';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');
  const [carBrandFilter, setCarBrandFilter] = useState('all');

  // Get unique car brands
  const carBrands = useMemo(() => {
    const brands = new Set(mockCustomers.map((c) => c.vehicle.brand));
    return Array.from(brands).sort();
  }, []);

  // Filter customers
  const filteredCustomers = useMemo(() => {
    return mockCustomers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.vehicle.licensePlate.includes(searchQuery);

      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;

      const matchesBrand =
        carBrandFilter === 'all' || customer.vehicle.brand === carBrandFilter;

      return matchesSearch && matchesStatus && matchesBrand;
    });
  }, [searchQuery, statusFilter, carBrandFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = mockCustomers.length;
    const active = mockCustomers.filter((c) => c.status === 'active').length;
    const inactive = mockCustomers.filter((c) => c.status === 'inactive').length;
    const pending = mockCustomers.filter((c) => c.status === 'pending').length;

    return { total, active, inactive, pending };
  }, []);

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCarBrandFilter('all');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Users className="size-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">مشتریان</h1>
          </div>
          <p className="text-gray-600">مدیریت اطلاعات مشتریان و خودروهای آنها</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            title="کل مشتریان"
            value={stats.total}
            icon="👥"
            color="blue"
          />
          <StatCard
            title="فعال"
            value={stats.active}
            icon="✓"
            color="green"
          />
          <StatCard
            title="غیرفعال"
            value={stats.inactive}
            icon="✗"
            color="gray"
          />
          <StatCard
            title="در انتظار"
            value={stats.pending}
            icon="⏳"
            color="yellow"
          />
        </div>

        {/* Filters Section */}
        <div className="mb-8 space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="size-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">فیلترها</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Search Input */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                جستجو
              </label>
              <div className="relative">
                <Search className="absolute right-3 top-3 size-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="نام، شماره، ایمیل، پلاک..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                وضعیت
              </label>
              <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه</SelectItem>
                  <SelectItem value="active">فعال</SelectItem>
                  <SelectItem value="inactive">غیرفعال</SelectItem>
                  <SelectItem value="pending">در انتظار</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Car Brand Filter */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                برند خودرو
              </label>
              <Select value={carBrandFilter} onValueChange={(value) => setCarBrandFilter(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه</SelectItem>
                  {carBrands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              {filteredCustomers.length} از {mockCustomers.length} مشتری
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="text-gray-700"
            >
              پاک کردن فیلترها
            </Button>
          </div>
        </div>

        {/* Customer Grid */}
        <div>
          {filteredCustomers.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCustomers.map((customer) => (
                <CustomerCard key={customer.id} customer={customer} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
              <Users className="mx-auto size-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">نتیجه ای یافت نشد</h3>
              <p className="text-gray-600">
                با توجه به فیلترهای انتخاب شده، هیچ مشتری یافت نشد.
              </p>
              {(searchQuery || statusFilter !== 'all' || carBrandFilter !== 'all') && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  className="mt-4 text-gray-700"
                >
                  پاک کردن فیلترها
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: string;
  color: 'blue' | 'green' | 'gray' | 'yellow';
}) {
  const colorStyles = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    gray: 'bg-gray-50 border-gray-200',
    yellow: 'bg-yellow-50 border-yellow-200',
  };

  const textColorStyles = {
    blue: 'text-blue-900',
    green: 'text-green-900',
    gray: 'text-gray-900',
    yellow: 'text-yellow-900',
  };

  return (
    <div className={`rounded-lg border ${colorStyles[color]} p-6`}>
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm font-medium ${textColorStyles[color]}`}>{title}</p>
          <p className={`mt-2 text-3xl font-bold ${textColorStyles[color]}`}>{value}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}
