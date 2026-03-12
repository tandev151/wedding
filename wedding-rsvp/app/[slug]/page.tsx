import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { Navbar } from '@/features/landing/components/Navbar'
import { HeroSection } from '@/features/landing/components/HeroSection'
import { CoupleSection } from '@/features/landing/components/CoupleSection'
import { EventInfoSection } from '@/features/landing/components/EventInfoSection'
import { VideoSection } from '@/features/landing/components/VideoSection'
import { GalleryPreviewSection } from '@/features/landing/components/GalleryPreviewSection'
import { LoveStorySection } from '@/features/landing/components/LoveStorySection'
import { RsvpSection } from '@/features/landing/components/RsvpSection'
import { GiftSection } from '@/features/landing/components/GiftSection'
import { SiteFooter } from '@/features/landing/components/SiteFooter'
import { getEventSummaryServer } from '@/features/rsvp/api/rsvpServerApi'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const summary = await getEventSummaryServer(slug)
  if (!summary) return { title: 'Wedding Invitation' }
  return {
    title: `${summary.coupleName} — Wedding Invitation`,
    description:
      summary.heroMessage ??
      `Trân trọng kính mời bạn đến lễ cưới của ${summary.coupleName}`,
    openGraph: {
      title: `${summary.coupleName} — Wedding Invitation`,
      type: 'website',
    },
  }
}

export default async function WeddingPage({ params }: Props) {
  const { slug } = await params
  const summary = await getEventSummaryServer(slug)

  if (!summary) notFound()

  return (
    <div className="page-shell">
      <Navbar summary={summary} />
      <HeroSection ctaHref="#rsvp-section" summary={summary} />
      <CoupleSection summary={summary} />
      <EventInfoSection summary={summary} />
      <VideoSection summary={summary} />
      <GalleryPreviewSection summary={summary} />
      <LoveStorySection summary={summary} />
      <RsvpSection slug={slug} />
      <GiftSection summary={summary} />
      <SiteFooter summary={summary} />
    </div>
  )
}
