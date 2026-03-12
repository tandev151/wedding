"use client";

import { motion, useReducedMotion } from 'framer-motion'
import type { EventSummary } from '../../rsvp/types'
import styles from './VideoSection.module.css'

type VideoSectionProps = {
  summary: EventSummary | null
}

export function VideoSection({ summary }: VideoSectionProps) {
  const shouldReduceMotion = useReducedMotion()
  const videoId = summary?.videoId

  if (!videoId) return null

  return (
    <section className={styles['video-section']}>
      <div className="container">
        <div className="section-eyebrow">
          <span className="section-eyebrow-line" />
          <span className="section-eyebrow-text">Khoảnh khắc của chúng mình</span>
          <span className="section-eyebrow-line" />
        </div>

        <motion.div
          className={styles['video-frame']}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <iframe
            className={styles['video-embed']}
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
            title="Wedding video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  )
}
