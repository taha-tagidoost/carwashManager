"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Search,
  Phone,
  Car,
  Trash2,
  Loader2,
  Settings,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface Customer {
  id: string;
  full_name: string;
  phone: string;
  license_plate: string;
  car_brand: string;
  car_model: string;
  created_at: string;
  updated_at: string;
}

export default function DashboardPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalCustomers: 0, totalVisits: 0 });
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalTips: 0,
    thisMonthRevenue: 0,
    thisWeekRevenue: 0,
    todayRevenue: 0,
    topServices: [],
    topCustomers: [],
  });

  const fetchCustomers = useCallback(async () => {
    try {
      const response = await fetch("/api/customers");
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
        setFilteredCustomers(data);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch("/api/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }, []);

  const fetchAnalytics = useCallback(async () => {
    try {
      const response = await fetch("/api/analytics");
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
    fetchStats();
    fetchAnalytics();
  }, [fetchCustomers, fetchStats, fetchAnalytics]);

  useEffect(() => {
    let filtered = customers;

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (customer) =>
          customer.full_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          customer.phone.includes(searchQuery) ||
          customer.license_plate.includes(searchQuery) ||
          customer.car_brand.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredCustomers(filtered);
  }, [searchQuery, customers]);

  const handleDelete = async (id: string) => {
    if (!confirm("آیا می‌خواهید این مشتری را حذف کنید؟")) return;

    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchCustomers();
        await fetchStats();
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setCarBrandFilter("all");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0A0714] via-[#140D26] to-[#1A1035]">
      {/* Header */}
      <div className="border-b border-[#3D246C]/50 bg-gradient-to-r from-[#16102E] to-[#24154A] shadow-lg backdrop-blur-md bg-opacity-95">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">
                مدیریت شستشوی خودرو
              </h1>
              <p className="text-[#C4B5FD] mt-1">
                سیستم مدیریت حرفه‌ای مشتریان و سرویس‌ها
              </p>
            </div>
            <Link href="/settings">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-purple-800 text-purple-100"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Statistics Cards - Premium Design */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            title="درآمد امروز"
            value={analytics.todayRevenue.toLocaleString()}
            icon="💰"
          />
          <StatCard
            title="درآمد این هفته"
            value={analytics.thisWeekRevenue.toLocaleString()}
            icon="📊"
          />
          <StatCard
            title="درآمد این ماه"
            value={analytics.thisMonthRevenue.toLocaleString()}
            icon="📈"
          />
          <StatCard
            title="مجموع انعام"
            value={analytics.totalTips.toLocaleString()}
            icon="🎁"
          />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
          <MetricCard title="تعداد مشتریان" value={stats.totalCustomers} />
          <MetricCard title="تعداد مراجعات" value={stats.totalVisits} />
          <MetricCard
            title="درآمد کل"
            value={`${(analytics.totalRevenue / 1000000).toFixed(1)}M`}
          />
        </div>

        {/* Top Services & Customers */}
        {analytics.topServices.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 ">
            <Card className=" p-6 rounded-xl border border-purple-600/50 bg-gradient-to-br from-violet-800/50 to-purple-800/50 backdrop-blur-sm p-6 shadow-lg">
              <h2 className="text-lg font-bold text-white mb-4 bg">
                سرویس‌های محبوب
              </h2>
              <div className="space-y-2">
                {analytics.topServices.map((service: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-white">{service.name}</span>
                    <span className="font-medium text-white">
                      {service.count} سفارش
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 rounded-xl border border-purple-600/50 bg-gradient-to-br from-violet-800/50 to-purple-800/50 backdrop-blur-sm p-6 shadow-lg">
              <h2 className="text-lg font-bold text-white mb-4">
                مشتریان برتر
              </h2>
              <div className="space-y-2">
                {analytics.topCustomers.map((customer: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-white">{customer.name}</span>
                    <span className="font-medium text-white">
                      {customer.total.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Actions and Search */}
        <div className="mb-8 space-y-4 rounded-xl border border-[#3B2A66]/60 bg-[#1A1333]/70 backdrop-blur-sm p-6 shadow-lg">
          <div className="flex flex-wrap gap-3 mb-4">
            <Link href="/customers/new">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] hover:from-[#8B5CF6] hover:to-[#C084FC]"
              >
                <Plus className="h-5 w-5" />
                مشتری جدید
              </Button>
            </Link>
            <Link href="/settings">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-[#6D4AFF] text-[#000000] hover:bg-[#2A1D52] hover:text-[#ffffff]"
              >
                <Settings className="h-5 w-5" />
                تنظیمات
              </Button>
            </Link>
          </div>

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-[#E9D5FF] mb-2">
              جستجو
            </label>
            <div className="relative">
              <Search className="absolute right-3 top-3 size-5 text-[#A78BFA]" />
              <Input
                type="text"
                placeholder="جستجو نام، شماره، یا پلاک..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 bg-[#1C1638] border-[#3B2A66] text-white placeholder:text-[#8B78C7] focus:border-[#8B5CF6] focus:ring-[#8B5CF6]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-[#C4B5FD]">
              {filteredCustomers.length} از {customers.length} مشتری
            </p>
            {searchQuery && (
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
                className="text-[#E9D5FF] border-[#6D4AFF] hover:bg-[#2A1D52]"
              >
                پاک کردن جستجو
              </Button>
            )}
          </div>
        </div>

        {/* Customer List */}
        <div className="space-y-3">
          {loading ? (
            <div className="p-8 text-center flex items-center justify-center gap-2 rounded-lg border border-[#3B2A66]/60 bg-[#1A1333]/60">
              <Loader2 className="h-5 w-5 animate-spin text-[#C4B5FD]" />
              <span className="text-purple-200">در حال بارگذاری...</span>
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="p-8 text-center rounded-lg border border-[#3B2A66]/60 bg-[#1A1333]/60">
              <p className="text-purple-200">
                {customers.length === 0
                  ? "هیچ مشتری ثبت نشده است"
                  : "نتیجه‌ای برای جستجو پیدا نشد"}
              </p>
              {customers.length === 0 && (
                <Link href="/customers/new" className="mt-4 inline-block">
                  <Button className="bg-gradient-to-r from-purple-600 to-violet-600">
                    <Plus className="h-4 w-4 ml-2" />
                    اولین مشتری را اضافه کنید
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            filteredCustomers.map((customer) => (
              <Link key={customer.id} href={`/customers/${customer.id}`}>
                <div className="p-4 rounded-lg border border-[#3B2A66]/60 bg-[#1A1333]/60 backdrop-blur-sm hover:bg-[#241A47]/80 transition-all hover:shadow-lg hover:ring-1 hover:ring-[#8B5CF6] cursor-pointer group">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <h3 className="font-bold text-white group-hover:text-[#E9D5FF]">
                        {customer.full_name}
                      </h3>
                      <div className="mt-2 flex items-center gap-2 text-sm text-[#A78BFA]">
                        <Phone className="h-4 w-4" />
                        {customer.phone}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-[#A78BFA]">پلاک خودرو</p>
                      <p className="font-mono text-[#E9D5FF]">
                        {customer.license_plate}
                      </p>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm text-[#A78BFA]">خودرو</p>
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4" />
                          <span className="text-purple-100">
                            {customer.car_brand} {customer.car_model}
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(customer.id);
                        }}
                        className="text-red-400 hover:bg-red-900/50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
  icon = "📊",
}: {
  title: string;
  value: string | number;
  icon?: string;
}) {
  return (
    <div className="rounded-xl border border-purple-600/50 bg-gradient-to-br from-purple-800/50 to-violet-800/50 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-purple-200">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-purple-600/50 bg-gradient-to-br from-violet-800/50 to-purple-800/50 backdrop-blur-sm p-6 shadow-lg">
      <p className="text-sm font-medium text-purple-200">{title}</p>
      <p className="mt-3 text-4xl font-bold text-white">{value}</p>
    </div>
  );
}
