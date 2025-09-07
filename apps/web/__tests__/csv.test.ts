import { validateColumns } from '@/lib/csv'

describe('csv utils', () => {
  it('detects missing columns', () => {
    const row = { date: '2024-01-01', platform: 'GOOGLE_ADS', spend: 100 }
    const missing = validateColumns(row, ['date', 'platform', 'spend', 'impressions'])
    expect(missing).toEqual(['impressions'])
  })
})

