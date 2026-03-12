"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { EventSummary } from "../../rsvp/types";
import styles from "./EventInfoSection.module.css";

function FloralDivider() {
  return (
    <svg className={styles['wd-floral']} width="220" height="32" viewBox="0 0 220 32" fill="none" aria-hidden="true">
      <line x1="0" y1="16" x2="91" y2="16" stroke="var(--c-border)" strokeWidth="0.8" />
      <path d="M95 16 C98 10, 104 6, 110 5 C116 6, 122 10, 125 16 C122 22, 116 26, 110 27 C104 26, 98 22, 95 16Z" stroke="var(--c-accent)" strokeWidth="0.8" fill="none" />
      <circle cx="110" cy="16" r="3" fill="var(--c-accent)" opacity="0.35" />
      <path d="M103 9 C106 6, 108 5, 110 5 C112 5, 114 6, 117 9" stroke="var(--c-accent)" strokeWidth="0.6" fill="none" opacity="0.6" />
      <path d="M103 23 C106 26, 108 27, 110 27 C112 27, 114 26, 117 23" stroke="var(--c-accent)" strokeWidth="0.6" fill="none" opacity="0.6" />
      <line x1="129" y1="16" x2="220" y2="16" stroke="var(--c-border)" strokeWidth="0.8" />
    </svg>
  );
}

function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    ref.current = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);

    return () => {
      if (ref.current) {
        clearInterval(ref.current);
      }
    };
  }, [target]);

  return timeLeft;
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className={styles['wd-box']}>
      <span className={styles['wd-box-num']}>{String(value).padStart(2, "0")}</span>
      <span className={styles['wd-box-label']}>{label}</span>
    </div>
  );
}

type VenueCardProps = {
  type: "Ceremony" | "Reception";
  time: string;
  venue: string;
  address: string;
  mapUrl: string;
};

function VenueCard({ type, time, venue, address, mapUrl }: VenueCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={styles['wd-venue']}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <p className={styles['wd-venue-type']}>{type}</p>
      <p className={styles['wd-venue-time']}>{time}</p>
      <h3 className={styles['wd-venue-name']}>{venue}</h3>
      <p className={styles['wd-venue-addr']}>{address}</p>
      <div className={styles['wd-venue-actions']}>
        <a className={styles['wd-venue-link']} href={mapUrl} target="_blank" rel="noreferrer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Xem bản đồ
        </a>
      </div>
    </motion.div>
  );
}

type EventInfoSectionProps = {
  summary: EventSummary | null;
};

export function EventInfoSection({ summary }: EventInfoSectionProps) {
  const target = summary?.eventDate ? new Date(summary.eventDate) : new Date("2026-10-24T11:30:00Z");
  const timeLeft = useCountdown(target);

  return (
    <section className={styles['wd-section']}>
      <div className="container">
        <FloralDivider />

        <div className="section-eyebrow" style={{ marginTop: "var(--sp-6)" }}>
          <span className="section-eyebrow-line" />
          <span className="section-eyebrow-text">Lịch trình</span>
          <span className="section-eyebrow-line" />
        </div>
        <h2 className="section-heading">The Wedding Day</h2>

        <div className={styles['wd-countdown']}>
          <CountdownBox value={timeLeft.days} label="Ngày" />
          <span className={styles['wd-sep']}>:</span>
          <CountdownBox value={timeLeft.hours} label="Giờ" />
          <span className={styles['wd-sep']}>:</span>
          <CountdownBox value={timeLeft.minutes} label="Phút" />
          <span className={styles['wd-sep']}>:</span>
          <CountdownBox value={timeLeft.seconds} label="Giây" />
        </div>

        <div className={styles['wd-venues']}>
          <VenueCard
            type="Ceremony"
            time={summary?.ceremonyTime ?? ''}
            venue={summary?.ceremonyVenueName ?? 'Lễ đường'}
            address={summary?.ceremonyVenueAddress ?? ''}
            mapUrl="https://maps.google.com"
          />
          <VenueCard
            type="Reception"
            time={summary?.receptionTime ?? ''}
            venue={summary?.venueName ?? 'Sảnh tiệc'}
            address={summary?.venueAddress ?? ''}
            mapUrl={summary?.mapUrl ?? 'https://maps.google.com'}
          />
        </div>

        <div className={styles['wd-stream']}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
          <span>Live Streaming — </span>
          <a href="#" className={styles['wd-stream-link']}>Xem trực tiếp tại đây</a>
        </div>
      </div>
    </section>
  );
}
