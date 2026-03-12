'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { EventSummary } from '../../rsvp/types'
import styles from './CoupleSection.module.css'
import Image from 'next/image'

type CoupleSectionProps = {
  summary: EventSummary | null
}

function SocialIcon({ label }: { label: string }) {
  if (label === 'Facebook')
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-label="Facebook">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    )
  if (label === 'Instagram')
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-label="Instagram"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    )
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-label="Twitter">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.7 5.5 4.3 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

type PersonCardProps = {
  role: string
  name: string
  description: string
  imageUrl: string
  reversed?: boolean
}

function PersonCard({ role, name, description, imageUrl, reversed }: PersonCardProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.article
      className={[styles['couple-card'], reversed ? styles['couple-card--reversed'] : '']
        .filter(Boolean)
        .join(' ')}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className={styles['couple-photo-wrap']}>
        <Image className={styles['couple-photo']} src={imageUrl} alt={`Ảnh ${role} ${name}`} fill />
      </div>
      <div className={styles['couple-info']}>
        <p className={styles['couple-role']}>{role}</p>
        <h3 className={styles['couple-name']}>{name}</h3>
        <p className={styles['couple-desc']}>{description}</p>
        <ul className={styles['couple-social']}>
          {(['Facebook', 'Instagram', 'Twitter'] as const).map((label) => (
            <li key={label}>
              <a href="#" className={styles['couple-social-link']} aria-label={label}>
                <SocialIcon label={label} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

export function CoupleSection({ summary }: CoupleSectionProps) {
  const bride = {
    role: 'Cô dâu',
    name: summary?.brideName ?? 'Cô dâu',
    description: summary?.brideDescription ?? '',
    imageUrl: summary?.brideImageUrl ?? 'https://picsum.photos/seed/wdg-bride-01/500/700',
  }

  const groom = {
    role: 'Chú rể',
    name: summary?.groomName ?? 'Chú rể',
    description: summary?.groomDescription ?? '',
    imageUrl: summary?.groomImageUrl ?? 'https://picsum.photos/seed/wdg-groom-01/500/700',
  }

  return (
    <section className={styles['couple-section']}>
      <div className="container">
        <div className={styles['couple-grid']}>
          <PersonCard {...bride} />
          <PersonCard {...groom} reversed />
        </div>
      </div>
    </section>
  )
}
