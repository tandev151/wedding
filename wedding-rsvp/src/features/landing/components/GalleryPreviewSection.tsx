"use client";

import { motion, useReducedMotion } from 'framer-motion'
import type { EventSummary } from '../../rsvp/types'
import styles from './GalleryPreviewSection.module.css'

type GalleryPreviewSectionProps = {
  summary: EventSummary | null
}

export function GalleryPreviewSection({ summary }: GalleryPreviewSectionProps) {
  const shouldReduceMotion = useReducedMotion()
  const items = summary?.gallery ?? []

  if (items.length === 0) return null

  return (
    <section className={styles['moments-section']}>
      <div className="container">
        <div className="section-eyebrow">
          <span className="section-eyebrow-line" />
          <span className="section-eyebrow-text">Gallery</span>
          <span className="section-eyebrow-line" />
        </div>
        <h2 className="section-heading">Our Moments</h2>

        <div className={styles['moments-mosaic']}>
          {items.map((item, i) => (
            <motion.figure
              key={item.id}
              className={[styles['moments-item'], styles[`moments-item--${i + 1}`]].join(' ')}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.06 }}
            >
              <img
                src={item.imageUrl}
                alt={item.alt ?? ''}
                loading="lazy"
                decoding="async"
              />
            </motion.figure>
          ))}
        </div>

        <blockquote className={styles['moments-quote']}>
          <p>&ldquo;A happy marriage is a long conversation which always seems too short.&rdquo;</p>
          <cite>— André Maurois</cite>
        </blockquote>
      </div>
    </section>
  )
}
