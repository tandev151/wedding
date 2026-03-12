"use client";

import { useState } from 'react'
import type { EventSummary } from '../../rsvp/types'
import styles from './HeroSection.module.css'

type HeroSectionProps = {
  ctaHref: string
  summary: EventSummary | null
}

function FloralOrnamentLight() {
  return (
    <svg className={styles['hero-ornament']} width="180" height="28" viewBox="0 0 180 28" fill="none" aria-hidden="true">
      <line x1="0" y1="14" x2="64" y2="14" stroke="rgba(255,255,255,0.45)" strokeWidth="0.7" />
      <path
        d="M68 14 C70 9, 75 5, 80 4 C85 5, 90 9, 92 14 C90 19, 85 23, 80 24 C75 23, 70 19, 68 14Z"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="0.7"
        fill="none"
      />
      <circle cx="80" cy="14" r="2.5" fill="rgba(255,255,255,0.35)" />
      <path d="M74 9 C76 7, 78 6, 80 6 C82 6, 84 7, 86 9" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" fill="none" />
      <path d="M74 19 C76 21, 78 22, 80 22 C82 22, 84 21, 86 19" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" fill="none" />
      <line x1="92" y1="14" x2="180" y2="14" stroke="rgba(255,255,255,0.45)" strokeWidth="0.7" />
    </svg>
  )
}

function formatEventDate(isoDate: string): string {
  const d = new Date(isoDate)
  return d.toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function HeroSection({ ctaHref, summary }: HeroSectionProps) {
  const [guestName, setGuestName] = useState('')

  const dateLabel = summary?.eventDate ? formatEventDate(summary.eventDate) : ''
  const coupleName = summary?.coupleName ?? ''
  const heroMessage = summary?.heroMessage ?? 'Trân trọng kính mời bạn đến chung vui trong ngày trọng đại của chúng mình'

  return (
    <section className={styles.hero}>
      <div className={styles['hero-bg']} />
      <div className={styles['hero-overlay']} />
      <div className={styles['hero-content']}>
        {dateLabel && <p className={styles['hero-eyebrow']}>{dateLabel}</p>}
        <FloralOrnamentLight />
        <h1 className={styles['hero-title']}>
          Wedding
          <br />
          Invitation
        </h1>
        <p className={styles['hero-subtitle']}>
          {heroMessage}
        </p>

        <div className={styles['hero-fields']}>
          <div className={styles['hero-field']}>
            <span className={styles['hero-field-label']}>Your Name</span>
            <input
              className={styles['hero-input']}
              type="text"
              placeholder="Tên của bạn"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
          </div>
          <div className={styles['hero-field']}>
            <span className={styles['hero-field-label']}>Couple Name</span>
            <input className={styles['hero-input']} type="text" value={coupleName} readOnly />
          </div>
        </div>

        <a className={styles['hero-cta']} href={ctaHref}>
          Xác nhận tham dự
        </a>
      </div>
    </section>
  )
}
