'use client'

import type { ReactNode } from 'react'
import styles from './HomePage.module.css'

const IconEnvelope = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="2,4 12,13 22,4" />
  </svg>
)

const IconGuests = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="9" cy="7" r="3" />
    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    <circle cx="17" cy="9" r="2" />
    <path d="M21 21v-1.5a3 3 0 0 0-2-2.83" />
  </svg>
)

const IconDiamond = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 3h12l4 6-10 13L2 9Z" />
    <path d="M2 9h20" />
    <path d="M6 3l4 6m8-6l-4 6" />
  </svg>
)

const IconLink = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
)

interface Feature {
  icon: ReactNode
  title: string
  desc: string
}

const FEATURES: Feature[] = [
  {
    icon: <IconEnvelope />,
    title: 'Trang RSVP trực tuyến',
    desc: 'Khách mời xác nhận tham dự dễ dàng, không cần gọi điện.',
  },
  {
    icon: <IconGuests />,
    title: 'Quản lý danh sách khách',
    desc: 'Theo dõi số lượng khách, lời chúc và phản hồi theo thời gian thực.',
  },
  {
    icon: <IconDiamond />,
    title: 'Thiết kế sang trọng',
    desc: 'Giao diện đẹp, tối ưu trên điện thoại — không cần biết code.',
  },
  {
    icon: <IconLink />,
    title: 'Đường dẫn riêng',
    desc: 'Mỗi cặp đôi có một URL riêng: yourwedding.vn/ten-cua-ban.',
  },
]

export function HomePage() {
  return (
    <div className={styles['hp-shell']}>
      <header className={styles['hp-nav']}>
        <span className={styles['hp-logo']}>WeddingPage</span>
        <a className={styles['hp-nav-cta']} href="#trial">
          Dùng thử miễn phí
        </a>
      </header>

      <section className={styles['hp-hero']}>
        <p className={styles['hp-eyebrow']}>Dành cho các cặp đôi Việt Nam</p>
        <h1 className={styles['hp-heading']}>
          Trang web đám cưới
          <br />
          <span className={styles['hp-accent']}>đẹp &amp; dễ dùng</span>
        </h1>
        <p className={styles['hp-sub']}>
          Tạo trang mời cưới online trong vài phút. Khách mời RSVP trực tiếp, bạn quản lý danh
          sách ngay trên trình duyệt.
        </p>
        <a className={styles['hp-btn-primary']} href="#trial">
          Đăng ký dùng thử — Miễn phí
        </a>
      </section>

      <section className={styles['hp-features']}>
        <div className={styles['hp-features-grid']}>
          {FEATURES.map((f) => (
            <div key={f.title} className={styles['hp-feature-card']}>
              <span className={styles['hp-feature-icon']}>{f.icon}</span>
              <h3 className={styles['hp-feature-title']}>{f.title}</h3>
              <p className={styles['hp-feature-desc']}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles['hp-cta']} id="trial">
        <h2 className={styles['hp-cta-heading']}>Sẵn sàng tạo trang cưới của bạn?</h2>
        <p className={styles['hp-cta-sub']}>Dùng thử 30 ngày miễn phí. Không cần thẻ tín dụng.</p>
        <form
          className={styles['hp-form']}
          onSubmit={(e) => {
            e.preventDefault()
            alert('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ sớm nhất.')
          }}
        >
          <input
            className={styles['hp-input']}
            type="email"
            required
            placeholder="Email của bạn"
          />
          <button className={styles['hp-btn-primary']} type="submit">
            Đăng ký ngay
          </button>
        </form>
      </section>

      <footer className={styles['hp-footer']}>
        © {new Date().getFullYear()} WeddingPage · Tạo với ❤️ tại Việt Nam
      </footer>
    </div>
  )
}
