export interface CampaignSummary {
  spent: number
  revenue: number
}

export function totalSpend(campaigns: CampaignSummary[]): number {
  return campaigns.reduce((sum, c) => sum + (c.spent || 0), 0)
}

export function totalRevenue(campaigns: CampaignSummary[]): number {
  return campaigns.reduce((sum, c) => sum + (c.revenue || 0), 0)
}

export function averageROAS(spend: number, revenue: number): number {
  if (spend <= 0) return 0
  return revenue / spend
}

