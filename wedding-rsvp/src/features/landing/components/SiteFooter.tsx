import type { EventSummary } from '../../rsvp/types'
import styles from './SiteFooter.module.css'

type SiteFooterProps = {
  summary: EventSummary | null
}

function FloralDivider() {
  return (
    <svg className={styles['footer-floral']} width="260" height="36" viewBox="0 0 260 36" fill="none" aria-hidden="true">
      <line x1="0" y1="18" x2="106" y2="18" stroke="var(--c-border)" strokeWidth="0.8" />
      <path d="M110 18 C114 11, 122 6, 130 5 C138 6, 146 11, 150 18 C146 25, 138 30, 130 29 C122 30, 114 25, 110 18Z" stroke="var(--c-border)" strokeWidth="0.8" fill="none" />
      <circle cx="130" cy="18" r="3.5" fill="var(--c-border)" />
      <path d="M122 10 C125 7, 127 5, 130 5 C133 5, 135 7, 138 10" stroke="var(--c-border)" strokeWidth="0.7" fill="none" />
      <path d="M122 26 C125 29, 127 30, 130 30 C133 30, 135 29, 138 26" stroke="var(--c-border)" strokeWidth="0.7" fill="none" />
      <line x1="154" y1="18" x2="260" y2="18" stroke="var(--c-border)" strokeWidth="0.8" />
    </svg>
  )
}

export function SiteFooter({ summary }: SiteFooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles['footer-monogram-wrap']}>
          <span className={styles['footer-monogram']}>{summary?.monogram ?? summary?.coupleName ?? ''}</span>
        </div>

        <p className={styles['footer-tagline']}>With love, the families of the bride and groom</p>

        <div className={styles['footer-couple']}>
          <div className={[styles['footer-person'], styles['footer-person--groom']].join(' ')}>
            <p className={styles['footer-person-role']}>Chú rể</p>
            <p className={styles['footer-person-name']}>{summary?.groomName ?? ''}</p>
            <p className={styles['footer-person-full']}>{summary?.groomFullName ?? ''}</p>
            {summary?.groomParents && (
              <p className={styles['footer-person-date']}>Con trai của: {summary.groomParents}</p>
            )}
          </div>

          <div className={styles['footer-divider-vert']} aria-hidden="true" />

          <div className={[styles['footer-person'], styles['footer-person--bride']].join(' ')}>
            <p className={styles['footer-person-role']}>Cô dâu</p>
            <p className={styles['footer-person-name']}>{summary?.brideName ?? ''}</p>
            <p className={styles['footer-person-full']}>{summary?.brideFullName ?? ''}</p>
            {summary?.brideParents && (
              <p className={styles['footer-person-date']}>Con gái của: {summary.brideParents}</p>
            )}
          </div>
        </div>

        <FloralDivider />

        <div className={styles['footer-bottom']}>
          <p className={styles['footer-copyright']}>
            © {year} {summary?.coupleName ?? ''} — Wedding Invitation
          </p>
          <p className={styles['footer-made']}>Made with ♡</p>
        </div>
      </div>
    </footer>
  )
}
