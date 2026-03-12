import { env } from '@/config/env'
import type { EventSummary } from '../types'
import { getEventSummaryBySlug } from './rsvpMockData'

export async function getEventSummaryServer(slug: string): Promise<EventSummary | null> {
  if (!slug) return null

  if (env.useMockApi) {
    return getEventSummaryBySlug(slug)
  }
  console.log(`Fetching event summary for slug: ${slug} from API...`)
  try {
    const response = await fetch(
      `${env.apiBaseUrl}/v1/event-summary?slug=${encodeURIComponent(slug)}`,
      { next: { revalidate: 60 } },
    )
    if (!response.ok) return null
    return (await response.json()) as EventSummary
  } catch {
    return null
  }
}
