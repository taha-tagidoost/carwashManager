'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThermalReceipt } from '@/components/thermal-receipt'
import { ArrowLeft, Printer, Loader2 } from 'lucide-react'

interface Visit {
  id: string
  customer_id: string
  visit_date: string
  total_amount: number
  created_at: string
}

interface Customer {
  id: string
  full_name: string
}

interface VisitService {
  id: string
  service_name_snapshot: string
  quantity: number
}

export default function ReceiptPage() {
  const params = useParams()
  const visitId = params.id as string

  const [visit, setVisit] = useState<Visit | null>(null)
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [items, setItems] = useState<VisitService[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [visitRes, itemsRes] = await Promise.all([
          fetch(`/api/visits/${visitId}`),
          fetch(`/api/visit-services?visit_id=${visitId}`),
        ])

        if (visitRes.ok) {
          const v: Visit = await visitRes.json()
          setVisit(v)
          if (v.customer_id) {
            const custRes = await fetch(`/api/customers/${v.customer_id}`)
            if (custRes.ok) setCustomer(await custRes.json())
          }
        }
        if (itemsRes.ok) setItems(await itemsRes.json())
      } catch (error) {
        console.error('Error loading receipt:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [visitId])

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
      </main>
    )
  }

  if (!visit) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-100">
        <p className="text-gray-600">صورتحساب یافت نشد</p>
        <Link href="/">
          <Button variant="outline">بازگشت</Button>
        </Link>
      </main>
    )
  }

  const serviceLabel = items
    .map((item) => (item.quantity > 1 ? `${item.service_name_snapshot} x${item.quantity}` : item.service_name_snapshot))
    .join('، ')

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      {/* Toolbar (hidden when printing) */}
      <div className="mx-auto mb-6 flex max-w-md items-center justify-between px-4 print:hidden">
        <Link href={`/customers/${visit.customer_id}`}>
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            بازگشت
          </Button>
        </Link>
        <Button onClick={() => window.print()} size="sm" className="gap-2">
          <Printer className="h-4 w-4" />
          چاپ
        </Button>
      </div>

      {/* Receipt preview */}
      <div className="mx-auto w-fit bg-white shadow-lg print:shadow-none">
        <ThermalReceipt
          orderId={visit.id.slice(0, 8).toUpperCase()}
          customer={customer?.full_name ?? ''}
          service={serviceLabel}
          price={visit.total_amount}
          date={visit.visit_date}
        />
      </div>
    </main>
  )
}
