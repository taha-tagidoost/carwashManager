'use client'

import { QrCode } from 'lucide-react'

export interface ReceiptData {
  orderId: string
  customer: string
  service: string
  price: number
  date: string | Date
}

const DashedLine = () => (
  <div className="my-2 border-t border-dashed border-black" aria-hidden="true" />
)

export function ThermalReceipt({ orderId, customer, service, price, date }: ReceiptData) {
  const d = typeof date === 'string' ? new Date(date) : date
  const dateStr = d.toLocaleDateString('fa-IR')
  const timeStr = d.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="receipt mx-auto w-[80mm] max-w-full bg-white px-3 py-4 font-mono text-[13px] leading-snug text-black">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-lg font-bold tracking-widest">CAR WASH</h1>
        <p className="text-[11px] tracking-wide">کارواش</p>
      </div>

      <DashedLine />

      {/* Meta */}
      <div className="space-y-1">
        <Row label="Order ID" value={orderId} />
        <Row label="Date" value={dateStr} />
        <Row label="Time" value={timeStr} />
      </div>

      <DashedLine />

      {/* Body */}
      <div className="space-y-1">
        <Row label="Customer" value={customer || '-'} />
        <Row label="Service" value={service || '-'} />
      </div>

      <DashedLine />

      {/* Total */}
      <div className="flex items-center justify-between text-[15px] font-bold">
        <span>TOTAL</span>
        <span>{price.toLocaleString()} تومان</span>
      </div>

      <DashedLine />

      {/* QR placeholder (future feature) */}
      <div className="flex flex-col items-center py-2">
        <div className="flex h-24 w-24 items-center justify-center border border-dashed border-black">
          <QrCode className="h-10 w-10" strokeWidth={1} aria-hidden="true" />
        </div>
        <p className="mt-1 text-[10px]">Scan for details</p>
      </div>

      <DashedLine />

      {/* Footer */}
      <div className="text-center text-[11px]">
        <p>Thank you for your visit!</p>
        <p>با تشکر از مراجعه شما</p>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <span className="shrink-0 font-semibold">{label}:</span>
      <span className="text-right break-words">{value}</span>
    </div>
  )
}
