import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: visitId } = await params
    const supabase = await createClient()

    const { error } = await supabase.from('visits').delete().eq('id', visitId)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Visit deleted' })
  } catch (error) {
    console.error('Error deleting visit:', error)
    return NextResponse.json({ error: 'Failed to delete visit' }, { status: 500 })
  }
}
