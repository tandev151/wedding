import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        fontFamily: 'var(--font-sans)',
        color: 'var(--c-text)',
        background: 'var(--c-bg)',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--c-text-light)' }}>
        404
      </p>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 600 }}>
        Trang không tồn tại
      </h1>
      <p style={{ color: 'var(--c-text-muted)', maxWidth: '40ch' }}>
        Thiệp mời này không tồn tại hoặc đã hết hiệu lực.
      </p>
      <Link
        href="/"
        style={{
          marginTop: '1rem',
          padding: '0.75rem 2rem',
          background: 'var(--c-accent)',
          color: '#fff',
          borderRadius: '0.25rem',
          fontSize: '0.85rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
        }}
      >
        Về trang chủ
      </Link>
    </div>
  )
}
