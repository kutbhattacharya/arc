import { averageROAS, totalRevenue, totalSpend } from '@/lib/metrics'

describe('metrics utils', () => {
  const data = [
    { spent: 100, revenue: 250 },
    { spent: 50, revenue: 100 },
    { spent: 0, revenue: 0 },
  ]

  it('computes total spend', () => {
    expect(totalSpend(data)).toBe(150)
  })

  it('computes total revenue', () => {
    expect(totalRevenue(data)).toBe(350)
  })

  it('computes average ROAS', () => {
    expect(averageROAS(150, 350)).toBeCloseTo(2.333, 2)
    expect(averageROAS(0, 100)).toBe(0)
  })
})

