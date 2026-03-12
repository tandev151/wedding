import { NextResponse } from 'next/server'
import { env } from '@/config/env'
import type { RsvpPayload, RsvpResponse } from '@/features/rsvp/types'
import { buildRsvpResponse, getEventSummaryBySlug } from '@/features/rsvp/api/rsvpMockData'

let nextId = 1
const inMemoryRsvps: RsvpResponse[] = []

export async function POST(request: Request) {
  const body = (await request.json()) as RsvpPayload & { weddingSlug?: string }

  if (!env.useMockApi) {
    try {
      const response = await fetch(`${env.apiBaseUrl}/v1/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await response.json()
      return NextResponse.json(data, { status: response.status })
    } catch {
      return NextResponse.json({ message: 'Upstream API unavailable' }, { status: 502 })
    }
  }

  const summary = getEventSummaryBySlug(body.weddingSlug ?? '')
  if (!summary) {
    return NextResponse.json({ message: 'Wedding not found' }, { status: 404 })
  }

  const response: RsvpResponse = buildRsvpResponse(body, nextId++)
  inMemoryRsvps.push(response)

  return NextResponse.json(response, { status: 201 })
}
