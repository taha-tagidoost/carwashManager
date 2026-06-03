'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

interface VehicleModel {
  id: string
  brand_id: string
  name: string
  created_at: string
}

interface VehicleBrand {
  id: string
  name: string
}

export function VehicleModelsSection() {
  const [models, setModels] = useState<VehicleModel[]>([])
  const [brands, setBrands] = useState<VehicleBrand[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBrandId, setSelectedBrandId] = useState('')
  const [newModelName, setNewModelName] = useState('')
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    fetchBrands()
  }, [])

  useEffect(() => {
    if (selectedBrandId) {
      fetchModels(selectedBrandId)
    }
  }, [selectedBrandId])

  const fetchBrands = async () => {
    try {
      const response = await fetch('/api/vehicle-brands')
      if (response.ok) {
        const data = await response.json()
        setBrands(data)
        if (data.length > 0) {
          setSelectedBrandId(data[0].id)
        }
      }
    } catch (error) {
      console.error('Error fetching brands:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchModels = async (brandId: string) => {
    try {
      const response = await fetch(`/api/vehicle-models?brand_id=${brandId}`)
      if (response.ok) {
        const data = await response.json()
        setModels(data)
      }
    } catch (error) {
      console.error('Error fetching models:', error)
    }
  }

  const handleAddModel = async () => {
    if (!newModelName.trim() || !selectedBrandId) return

    setAdding(true)
    try {
      const response = await fetch('/api/vehicle-models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand_id: selectedBrandId, name: newModelName }),
      })

      if (response.ok) {
        const newModel = await response.json()
        setModels([...models, newModel])
        setNewModelName('')
      }
    } catch (error) {
      console.error('Error adding model:', error)
    } finally {
      setAdding(false)
    }
  }

  const handleDeleteModel = async (id: string) => {
    if (!confirm('آیا می‌خواهید این مدل را حذف کنید؟')) return

    try {
      const response = await fetch(`/api/vehicle-models/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setModels(models.filter((m) => m.id !== id))
      }
    } catch (error) {
      console.error('Error deleting model:', error)
    }
  }

  return (
    <Card className="p-6 rounded-xl border border-[#3B2A66]/60 bg-[#1A1333]/70 backdrop-blur-sm">
      <h3 className="text-lg font-bold text-white mb-4">مدل‌های خودرو</h3>

      {loading ? (
        <div className="text-center py-8 text-gray-400">در حال بارگذاری...</div>
      ) : brands.length === 0 ? (
        <div className="text-center py-8 text-gray-400">لطفا ابتدا برندی اضافه کنید</div>
      ) : (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#E9D5FF] mb-2">
              انتخاب برند
            </label>
            <select
              value={selectedBrandId}
              onChange={(e) => setSelectedBrandId(e.target.value)}
              className="w-full bg-[#1C1638] border border-[#3B2A66] text-white rounded-lg px-3 py-2 focus:border-[#8B5CF6] focus:ring-[#8B5CF6]"
            >
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6 flex gap-2">
            <Input
              type="text"
              placeholder="نام مدل جدید..."
              value={newModelName}
              onChange={(e) => setNewModelName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddModel()}
              className="flex-1 bg-[#1C1638] border-[#3B2A66] text-white placeholder:text-[#8B78C7]"
            />
            <Button
              onClick={handleAddModel}
              disabled={adding || !newModelName.trim()}
              className="gap-2 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] hover:from-[#8B5CF6] hover:to-[#C084FC]"
            >
              {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              اضافه کردن
            </Button>
          </div>

          {models.length === 0 ? (
            <div className="text-center py-8 text-gray-400">هیچ مدلی برای این برند ثبت نشده است</div>
          ) : (
            <div className="space-y-2">
              {models.map((model) => (
                <div key={model.id} className="flex items-center justify-between p-3 rounded-lg bg-[#241A47] hover:bg-[#2A1D52] transition-colors">
                  <span className="text-white">{model.name}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteModel(model.id)}
                    className="text-red-400 hover:bg-red-900/50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </Card>
  )
}
