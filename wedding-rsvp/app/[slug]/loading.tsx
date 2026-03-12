export default function Loading() {
  return (
    <div
      style={{
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--c-bg)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1rem',
          color: 'var(--c-text-light)',
          letterSpacing: '0.1em',
        }}
      >
        Đang tải...
      </p>
    </div>
  )
}
