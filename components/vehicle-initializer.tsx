'use client'

import { useEffect } from 'react'

export function VehicleInitializer() {
  useEffect(() => {
    const initializeVehicles = async () => {
      try {
        // Check if vehicles are already in database
        const response = await fetch('/api/vehicle-brands')
        if (response.ok) {
          const brands = await response.json()
          if (brands && brands.length === 0) {
            // Seed vehicles if none exist
            await fetch('/api/seed-vehicles', { method: 'POST' })
          }
        }
      } catch (error) {
        console.error('[v0] Error initializing vehicles:', error)
        // Silently fail - vehicles can be seeded manually from settings
      }
    }

    initializeVehicles()
  }, [])

  return null
}
