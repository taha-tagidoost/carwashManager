'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

interface VehicleBrand {
  id: string
  name: string
  created_at: string
}

export function VehicleBrandsSection() {
  const [brands, setBrands] = useState<VehicleBrand[]>([])
  const [loading, setLoading] = useState(true)
  const [newBrandName, setNewBrandName] = useState('')
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    fetchBrands()
  }, [])

  const fetchBrands = async () => {
    try {
      const response = await fetch('/api/vehicle-brands')
      if (response.ok) {
        const data = await response.json()
        setBrands(data)
      }
    } catch (error) {
      console.error('Error fetching brands:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddBrand = async () => {
    if (!newBrandName.trim()) return

    setAdding(true)
    try {
      const response = await fetch('/api/vehicle-brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newBrandName }),
      })

      if (response.ok) {
        const newBrand = await response.json()
        setBrands([...brands, newBrand])
        setNewBrandName('')
      }
    } catch (error) {
      console.error('Error adding brand:', error)
    } finally {
      setAdding(false)
    }
  }

  const handleDeleteBrand = async (id: string) => {
    if (!confirm('آیا می‌خواهید این برند را حذف کنید؟')) return

    try {
      const response = await fetch(`/api/vehicle-brands/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setBrands(brands.filter((b) => b.id !== id))
      }
    } catch (error) {
      console.error('Error deleting brand:', error)
    }
  }

  return (
    <Card className="p-6 rounded-xl border border-[#3B2A66]/60 bg-[#1A1333]/70 backdrop-blur-sm">
      <h3 className="text-lg font-bold text-white mb-4">برندهای خودرو</h3>

      <div className="mb-6 flex gap-2">
        <Input
          type="text"
          placeholder="نام برند جدید..."
          value={newBrandName}
          onChange={(e) => setNewBrandName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddBrand()}
          className="flex-1 bg-[#1C1638] border-[#3B2A66] text-white placeholder:text-[#8B78C7]"
        />
        <Button
          onClick={handleAddBrand}
          disabled={adding || !newBrandName.trim()}
          className="gap-2 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] hover:from-[#8B5CF6] hover:to-[#C084FC]"
        >
          {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          اضافه کردن
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-400">در حال بارگذاری...</div>
      ) : brands.length === 0 ? (
        <div className="text-center py-8 text-gray-400">هیچ برندی ثبت نشده است</div>
      ) : (
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center justify-between p-3 rounded-lg bg-[#241A47] hover:bg-[#2A1D52] transition-colors">
              <span className="text-white">{brand.name}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDeleteBrand(brand.id)}
                className="text-red-400 hover:bg-red-900/50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
