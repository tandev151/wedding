'use client'

import { useState, useTransition } from 'react'
import type { AttendanceStatus, RsvpPayload, RsvpResponse } from '../../rsvp/types'
import { submitRsvpAction } from '../../rsvp/actions/submitRsvp'
import styles from './RsvpSection.module.css'

type RsvpSectionProps = {
  slug: string
}

export function RsvpSection({ slug }: RsvpSectionProps) {
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState<RsvpPayload>({
    fullName: '',
    phone: '',
    email: '',
    attending: 'yes',
    guestCount: 1,
    message: '',
  })
  const [lastResponse, setLastResponse] = useState<RsvpResponse | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const onFieldChange = (field: keyof RsvpPayload, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
    startTransition(async () => {
      const result = await submitRsvpAction(slug, formData)
      if (result.error) {
        setErrorMessage(result.error)
      } else {
        setLastResponse(result.data)
      }
    })
  }

  return (
    <section className={styles['rsvp-section']} id="rsvp-section">
      <div className={styles['rsvp-bg']} aria-hidden="true" />
      <div className={styles['rsvp-overlay']} aria-hidden="true" />

      <div className={styles['rsvp-inner']}>
        <div
          className="section-eyebrow"
          style={{ justifyContent: 'center', marginBottom: 'var(--sp-3)' }}
        >
          <span className="section-eyebrow-line" style={{ background: 'rgba(255,255,255,0.3)' }} />
          <span className="section-eyebrow-text" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Xác nhận tham dự
          </span>
          <span className="section-eyebrow-line" style={{ background: 'rgba(255,255,255,0.3)' }} />
        </div>
        <h2 className={styles['rsvp-heading']}>RSVP</h2>

        <form className={styles['rsvp-form']} onSubmit={onSubmit} noValidate>
          <div className={styles['rsvp-row']}>
            <label className={styles['rsvp-label']}>
              <span>Họ và tên</span>
              <input
                required
                className={styles['rsvp-input']}
                type="text"
                placeholder="Nguyễn Văn A"
                value={formData.fullName}
                onChange={(e) => onFieldChange('fullName', e.target.value)}
              />
            </label>
            <label className={styles['rsvp-label']}>
              <span>Số điện thoại</span>
              <input
                required
                className={styles['rsvp-input']}
                type="tel"
                placeholder="0901 234 567"
                value={formData.phone}
                onChange={(e) => onFieldChange('phone', e.target.value)}
              />
            </label>
          </div>

          <label className={styles['rsvp-label']}>
            <span>Email (tùy chọn)</span>
            <input
              className={styles['rsvp-input']}
              type="email"
              placeholder="example@email.com"
              value={formData.email ?? ''}
              onChange={(e) => onFieldChange('email', e.target.value)}
            />
          </label>

          <div className={styles['rsvp-row']}>
            <label className={styles['rsvp-label']}>
              <span>Tham dự</span>
              <select
                className={styles['rsvp-input']}
                value={formData.attending}
                onChange={(e) => onFieldChange('attending', e.target.value as AttendanceStatus)}
              >
                <option value="yes">Có tham dự</option>
                <option value="no">Không tham dự</option>
                <option value="maybe">Chưa chắc</option>
              </select>
            </label>
            <label className={styles['rsvp-label']}>
              <span>Số người đi cùng</span>
              <input
                className={styles['rsvp-input']}
                type="number"
                min={1}
                max={10}
                value={formData.guestCount}
                onChange={(e) => onFieldChange('guestCount', Number(e.target.value || 1))}
              />
            </label>
          </div>

          <label className={styles['rsvp-label']}>
            <span>Lời chúc</span>
            <textarea
              className={[styles['rsvp-input'], styles['rsvp-textarea']].join(' ')}
              rows={3}
              placeholder="Gửi lời chúc đến cô dâu chú rể..."
              value={formData.message ?? ''}
              onChange={(e) => onFieldChange('message', e.target.value)}
            />
          </label>

          <button className={styles['rsvp-btn']} type="submit" disabled={isPending}>
            {isPending ? 'Đang gửi...' : 'RSVP Now'}
          </button>
        </form>

        {errorMessage && <p className={styles['rsvp-error']}>{errorMessage}</p>}
        {lastResponse && (
          <p className={styles['rsvp-success']}>
            ✓ Đã ghi nhận RSVP của bạn. Chúng mình rất mong gặp bạn!
          </p>
        )}
      </div>
    </section>
  )
}
