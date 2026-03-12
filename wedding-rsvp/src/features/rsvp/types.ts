export type AttendanceStatus = 'yes' | 'no' | 'maybe'

export interface GalleryPhoto {
  id: number
  imageUrl: string
  alt?: string | null
  order: number
}

export interface LoveStoryEvent {
  id: number
  dateLabel: string
  title: string
  description: string
  order: number
}

export interface EventSummary {
  coupleName: string
  monogram?: string | null
  heroMessage?: string | null
  eventDate: string

  ceremonyVenueName?: string | null
  ceremonyVenueAddress?: string | null
  ceremonyTime?: string | null

  venueName: string
  venueAddress: string
  receptionTime?: string | null
  dressCode: string
  mapUrl: string

  groomName?: string | null
  groomFullName?: string | null
  groomDescription?: string | null
  groomImageUrl?: string | null
  groomParents?: string | null
  groomBank?: string | null
  groomBankAccount?: string | null
  groomBankName?: string | null

  brideName?: string | null
  brideFullName?: string | null
  brideDescription?: string | null
  brideImageUrl?: string | null
  brideParents?: string | null
  brideBank?: string | null
  brideBankAccount?: string | null
  brideBankName?: string | null

  videoId?: string | null
  gallery: GalleryPhoto[]
  loveStory: LoveStoryEvent[]
}

export interface RsvpPayload {
  fullName: string
  phone: string
  email?: string
  attending: AttendanceStatus
  guestCount: number
  message?: string
}

export interface RsvpResponse {
  id: number
  requestId: string
  fullName: string
  phone: string
  attending: AttendanceStatus
  guestCount: number
  message?: string | null
  weddingId: number
  createdAt: string
}
