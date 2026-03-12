import { NextResponse } from 'next/server'
import { env } from '@/config/env'
import { getEventSummaryBySlug } from '@/features/rsvp/api/rsvpMockData'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug') ?? ''

  if (env.useMockApi) {
    const data = getEventSummaryBySlug(slug)
    if (!data) {
      return NextResponse.json({ message: 'Wedding not found' }, { status: 404 })
    }
    return NextResponse.json(data)
  }

  try {
    const response = await fetch(
      `${env.apiBaseUrl}/v1/event-summary?slug=${encodeURIComponent(slug)}`,
      { cache: 'no-store' },
    )
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch {
    return NextResponse.json({ message: 'Upstream API unavailable' }, { status: 502 })
  }
}
