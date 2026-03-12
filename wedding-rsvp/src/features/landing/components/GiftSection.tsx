"use client";

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { EventSummary } from '../../rsvp/types'
import styles from './GiftSection.module.css'

type GiftSectionProps = {
  summary: EventSummary | null
}

type BankInfo = {
  bank: string
  accountNumber: string
  accountName: string
}

function GiftIcon() {
  return (
    <svg className={styles['gift-icon']} width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function BankCard({ info }: { info: BankInfo }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(info.accountNumber.replace(/\s/g, ''))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={styles['gift-bank-card']}>
      <div className={styles['gift-bank-top']}>
        <span className={styles['gift-bank-name']}>{info.bank}</span>
        <button type="button" className={styles['gift-copy-btn']} onClick={copy} aria-label="Sao chép số tài khoản">
          <CopyIcon />
          {copied ? 'Đã sao chép' : 'Sao chép'}
        </button>
      </div>
      <p className={styles['gift-account-number']}>{info.accountNumber}</p>
      <p className={styles['gift-account-holder']}>{info.accountName}</p>
    </div>
  )
}

export function GiftSection({ summary }: GiftSectionProps) {
  const shouldReduceMotion = useReducedMotion()

  const brideBank: BankInfo | null = summary?.brideBank
    ? { bank: summary.brideBank, accountNumber: summary.brideBankAccount ?? '', accountName: summary.brideBankName ?? '' }
    : null

  const groomBank: BankInfo | null = summary?.groomBank
    ? { bank: summary.groomBank, accountNumber: summary.groomBankAccount ?? '', accountName: summary.groomBankName ?? '' }
    : null

  if (!brideBank && !groomBank) return null

  return (
    <section className={styles['gift-section']}>
      <div className="container">
        <motion.div
          className={styles['gift-inner']}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <GiftIcon />

          <div className="section-eyebrow" style={{ marginTop: 'var(--sp-4)' }}>
            <span className="section-eyebrow-line" />
            <span className="section-eyebrow-text">Mừng cưới</span>
            <span className="section-eyebrow-line" />
          </div>
          <h2 className="section-heading">Send Your Gift</h2>

          <p className={styles['gift-desc']}>
            Sự hiện diện của bạn là món quà ý nghĩa nhất với chúng mình. Nếu bạn muốn gửi thêm lời chúc mừng bằng phong bì,
            vui lòng chuyển khoản theo thông tin bên dưới.
          </p>

          <div className={styles['gift-banks']}>
            {brideBank && (
              <div>
                <p className={styles['gift-person-label']}>Cô dâu — {summary?.brideName}</p>
                <BankCard info={brideBank} />
              </div>
            )}
            {groomBank && (
              <div>
                <p className={styles['gift-person-label']}>Chú rể — {summary?.groomName}</p>
                <BankCard info={groomBank} />
              </div>
            )}
          </div>

          <div className={styles['gift-note']}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M8 22s-3-1.5-3-7 3-9 7-9 7 3 7 9-3 7-3 7" />
              <circle cx="12" cy="6" r="2" />
            </svg>
            <span>Nội dung chuyển khoản: <em>Họ tên + Mừng cưới {summary?.coupleName}</em></span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
