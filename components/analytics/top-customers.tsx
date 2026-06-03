'use client'

import { Card } from '@/components/ui/card'
import { Crown, Users } from 'lucide-react'

interface TopCustomer {
  name: string
  total: number
  visits: number
}

interface TopCustomersProps {
  customers: TopCustomer[]
}

export function TopCustomers({ customers }: TopCustomersProps) {
  return (
    <Card className="p-6 rounded-xl border border-purple-600/50 bg-gradient-to-br from-violet-800/50 to-purple-800/50 backdrop-blur-sm shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Crown className="h-5 w-5 text-yellow-400" />
        <h3 className="text-lg font-bold text-white">مشتریان برتر</h3>
      </div>

      <div className="space-y-3">
        {customers.length === 0 ? (
          <p className="text-center text-gray-400 py-8">هیچ مشتری‌ای در این دوره</p>
        ) : (
          customers.map((customer, idx) => (
            <div key={idx} className="flex items-start justify-between p-3 rounded-lg bg-black/20 hover:bg-black/30 transition-colors">
              <div className="flex-1">
                <p className="font-medium text-white">{customer.name}</p>
                <p className="text-xs text-purple-300 flex items-center gap-1 mt-1">
                  <Users className="h-3 w-3" />
                  {customer.visits} مراجعه
                </p>
              </div>
              <p className="font-bold text-green-400">{customer.total.toLocaleString('fa-IR')}</p>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
