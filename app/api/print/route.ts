import { NextRequest, NextResponse } from 'next/server'

// URL of the local Print Service that talks to the thermal printer.
// Can be overridden with PRINT_SERVICE_URL env var.
const PRINT_SERVICE_URL = process.env.PRINT_SERVICE_URL || 'http://localhost:5005'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { customer, service, price } = body ?? {}

    // Basic validation of the print payload.
    if (typeof customer !== 'string' || typeof service !== 'string' || typeof price !== 'number') {
      return NextResponse.json(
        { error: 'Invalid payload. Expected { customer: string, service: string, price: number }' },
        { status: 400 }
      )
    }

    // Forward the print job to the local print service.
    const res = await fetch(`${PRINT_SERVICE_URL}/print`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customer, service, price }),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error('[v0] Print service responded with error:', res.status, text)
      return NextResponse.json({ error: 'Print service error' }, { status: 502 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[v0] Error forwarding print job:', error)
    return NextResponse.json({ error: 'Failed to send print job' }, { status: 500 })
  }
}
