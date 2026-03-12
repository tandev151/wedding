"use client";

import { motion, useReducedMotion } from 'framer-motion'
import type { EventSummary } from '../../rsvp/types'
import styles from './LoveStorySection.module.css'

type LoveStorySectionProps = {
  summary: EventSummary | null
}

function EnvelopeIcon() {
  return (
    <svg className={styles['ls-icon']} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

export function LoveStorySection({ summary }: LoveStorySectionProps) {
  const shouldReduceMotion = useReducedMotion()
  const timeline = summary?.loveStory ?? []

  if (timeline.length === 0) return null

  return (
    <section className={styles['ls-section']}>
      <div className="container">
        <div className={styles['ls-header']}>
          <EnvelopeIcon />
          <div className="section-eyebrow" style={{ marginTop: 'var(--sp-4)' }}>
            <span className="section-eyebrow-line" />
            <span className="section-eyebrow-text">Timeline</span>
            <span className="section-eyebrow-line" />
          </div>
          <h2 className="section-heading" style={{ marginBottom: 0 }}>
            Our Love Story
          </h2>
        </div>

        <div className={styles['ls-timeline']}>
          <div className={styles['ls-line']} aria-hidden="true" />

          {timeline.map((item, i) => (
            <motion.div
              key={item.id}
              className={[styles['ls-row'], i % 2 === 0 ? styles['ls-row--left'] : styles['ls-row--right']].join(' ')}
              initial={shouldReduceMotion ? false : { opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.04 }}
            >
              <article className={styles['ls-card']}>
                <p className={styles['ls-card-date']}>{item.dateLabel}</p>
                <h3 className={styles['ls-card-title']}>{item.title}</h3>
                <p className={styles['ls-card-desc']}>{item.description}</p>
              </article>
              <div className={styles['ls-dot']} aria-hidden="true" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
