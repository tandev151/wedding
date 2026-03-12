'use server'

import { env } from '@/config/env'
import { buildRsvpResponse, getEventSummaryBySlug } from '@/features/rsvp/api/rsvpMockData'
import type { RsvpPayload, RsvpResponse } from '../types'

export type SubmitRsvpResult = {
  data: RsvpResponse | null
  error: string | null
}

export async function submitRsvpAction(
  slug: string,
  payload: RsvpPayload,
): Promise<SubmitRsvpResult> {
  if (env.useMockApi) {
    const summary = getEventSummaryBySlug(slug)
    if (!summary) return { data: null, error: 'Wedding not found' }
    return { data: buildRsvpResponse(payload), error: null }
  }

  try {
    const body: Record<string, unknown> = { ...payload, weddingSlug: slug }
    if (!body.email) delete body.email
    const res = await fetch(`${env.apiBaseUrl}/v1/rsvp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) return { data: null, error: 'Gửi RSVP thất bại' }
    return { data: (await res.json()) as RsvpResponse, error: null }
  } catch {
    return { data: null, error: 'Gửi RSVP thất bại. Vui lòng thử lại sau.' }
  }
}
