// Server-only — accessed via process.env in Next.js
export const env = {
  apiBaseUrl: (process.env.API_BASE_URL ?? 'http://localhost:3000').replace(/\/$/, ''),
  useMockApi: (process.env.API_MODE ?? 'mock') !== 'real',
} as const
