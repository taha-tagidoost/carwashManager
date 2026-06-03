'use client'

import { useState, useEffect } from 'react'
import { Gift, Trash2, Loader2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

interface Tip {
  id: string
  visit_id: string
  worker_id?: string | null
  amount: number
  created_at: string
}

interface Worker {
  id: string
  name: string
}

interface VisitTipsSectionProps {
  visitId: string
  workers: Worker[]
  initialTipAmount?: number
  onTipsChange?: (newTotal: number) => void
  editable?: boolean
}

export function VisitTipsSection({
  visitId,
  workers,
  initialTipAmount = 0,
  onTipsChange,
  editable = true,
}: VisitTipsSectionProps) {
  const [tips, setTips] = useState<Tip[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddTip, setShowAddTip] = useState(false)
  const [tipAmount, setTipAmount] = useState('')
  const [selectedWorker, setSelectedWorker] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchTips()
  }, [visitId])

  const fetchTips = async () => {
    try {
      const response = await fetch(`/api/tips?visit_id=${visitId}`)
      if (response.ok) {
        const data = await response.json()
        setTips(data)
      }
    } catch (error) {
      console.error('Error fetching tips:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTip = async () => {
    if (!tipAmount || parseFloat(tipAmount) <= 0) return

    setSubmitting(true)
    try {
      const response = await fetch('/api/tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visit_id: visitId,
          worker_id: selectedWorker || null,
          amount: parseFloat(tipAmount),
        }),
      })

      if (response.ok) {
        const newTip = await response.json()
        const updatedTips = [...tips, newTip]
        setTips(updatedTips)
        const totalTips = updatedTips.reduce((sum, t) => sum + t.amount, 0)
        if (onTipsChange) onTipsChange(totalTips)
        setTipAmount('')
        setSelectedWorker('')
        setShowAddTip(false)
      }
    } catch (error) {
      console.error('Error adding tip:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteTip = async (tipId: string) => {
    if (!confirm('آیا می‌خواهید این انعام را حذف کنید؟')) return

    try {
      const response = await fetch(`/api/tips/${tipId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        const updatedTips = tips.filter((t) => t.id !== tipId)
        setTips(updatedTips)
        const totalTips = updatedTips.reduce((sum, t) => sum + t.amount, 0)
        if (onTipsChange) onTipsChange(totalTips)
      }
    } catch (error) {
      console.error('Error deleting tip:', error)
    }
  }

  const totalTips = tips.reduce((sum, t) => sum + t.amount, 0)

  return (
    <Card className="p-6 rounded-xl border border-purple-600/50 bg-gradient-to-br from-violet-800/50 to-purple-800/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Gift className="h-5 w-5 text-yellow-400" />
          انعام‌ها
        </h3>
        <p className="text-2xl font-bold text-green-400">{totalTips.toLocaleString('fa-IR')}</p>
      </div>

      {loading ? (
        <div className="text-center py-4 text-gray-400">در حال بارگذاری...</div>
      ) : tips.length === 0 ? (
        <div className="text-center py-4 text-gray-400">هیچ انعامی ثبت نشده است</div>
      ) : (
        <div className="space-y-2 mb-4">
          {tips.map((tip) => {
            const workerName = workers.find((w) => w.id === tip.worker_id)?.name || 'نامشخص'
            return (
              <div key={tip.id} className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                <div>
                  <p className="text-sm text-white">{workerName}</p>
                  <p className="text-xs text-purple-300">
                    {new Date(tip.created_at).toLocaleDateString('fa-IR')}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-bold text-green-400">{tip.amount.toLocaleString('fa-IR')}</p>
                  {editable && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteTip(tip.id)}
                      className="text-red-400 hover:bg-red-900/50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {editable && (
        <>
          {showAddTip && (
            <div className="p-4 rounded-lg bg-black/30 mb-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  کارگر
                </label>
                <select
                  value={selectedWorker}
                  onChange={(e) => setSelectedWorker(e.target.value)}
                  className="w-full bg-purple-800/50 border border-purple-600 text-white rounded px-3 py-2"
                >
                  <option value="">انتخاب کنید (اختیاری)</option>
                  {workers.map((worker) => (
                    <option key={worker.id} value={worker.id}>
                      {worker.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  مبلغ انعام
                </label>
                <Input
                  type="number"
                  value={tipAmount}
                  onChange={(e) => setTipAmount(e.target.value)}
                  placeholder="0"
                  className="bg-purple-800/50 border-purple-600 text-white"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleAddTip}
                  disabled={submitting || !tipAmount}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-violet-600"
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      افزودن
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => {
                    setShowAddTip(false)
                    setTipAmount('')
                    setSelectedWorker('')
                  }}
                  variant="outline"
                  className="border-purple-600"
                >
                  لغو
                </Button>
              </div>
            </div>
          )}

          {!showAddTip && (
            <Button
              onClick={() => setShowAddTip(true)}
              variant="outline"
              size="sm"
              className="w-full gap-2 border-purple-600 text-purple-200 hover:bg-purple-800/50"
            >
              <Plus className="h-4 w-4" />
              افزودن انعام
            </Button>
          )}
        </>
      )}
    </Card>
  )
}
