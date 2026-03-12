import type { EventSummary } from '../../rsvp/types'
import styles from './Navbar.module.css'

type NavbarProps = {
  summary: EventSummary | null
}

export function Navbar({ summary }: NavbarProps) {
  return (
    <nav className={styles.navbar}>
      <span className={styles['navbar-couple']}>{summary?.coupleName ?? 'Wedding Invitation'}</span>
    </nav>
  )
}
