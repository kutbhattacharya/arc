import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatNumber(
  num: number,
  options: {
    notation?: "standard" | "scientific" | "engineering" | "compact"
    minimumFractionDigits?: number
    maximumFractionDigits?: number
  } = {}
) {
  return new Intl.NumberFormat("en-US", options).format(num)
}

export function formatPercentage(
  value: number,
  options: {
    minimumFractionDigits?: number
    maximumFractionDigits?: number
  } = {}
) {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: options.minimumFractionDigits ?? 1,
    maximumFractionDigits: options.maximumFractionDigits ?? 2,
  }).format(value / 100)
}

export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {}
) {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }
  
  return new Intl.DateTimeFormat("en-US", {
    ...defaultOptions,
    ...options,
  }).format(new Date(date))
}

export function formatRelativeTime(date: Date | string) {
  const now = new Date()
  const targetDate = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000)

  if (diffInSeconds < 60) return "just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  
  return formatDate(targetDate)
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

export function generateId(prefix?: string) {
  const id = Math.random().toString(36).substr(2, 9)
  return prefix ? `${prefix}_${id}` : id
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      if (!immediate) func(...args)
    }
    
    const callNow = immediate && !timeout
    
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    
    if (callNow) func(...args)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return function executedFunction(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function kebabToTitle(str: string) {
  return str
    .split('-')
    .map(word => capitalizeFirst(word))
    .join(' ')
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function getSentimentColor(sentiment: string) {
  switch (sentiment.toLowerCase()) {
    case 'pos':
    case 'positive':
      return 'text-sentiment-positive'
    case 'neg':
    case 'negative':
      return 'text-sentiment-negative'
    default:
      return 'text-sentiment-neutral'
  }
}

export function getSentimentBadgeVariant(sentiment: string) {
  switch (sentiment.toLowerCase()) {
    case 'pos':
    case 'positive':
      return 'default'
    case 'neg': 
    case 'negative':
      return 'destructive'
    default:
      return 'secondary'
  }
}

export function calculateROAS(revenue: number, spend: number) {
  if (spend === 0) return 0
  return revenue / spend
}

export function calculateCAC(spend: number, conversions: number) {
  if (conversions === 0) return 0
  return spend / conversions
}

export function calculateCTR(clicks: number, impressions: number) {
  if (impressions === 0) return 0
  return (clicks / impressions) * 100
}

export function formatMetricDelta(current: number, previous: number) {
  if (previous === 0) return { value: 0, isPositive: true, isZero: true }
  
  const delta = ((current - previous) / previous) * 100
  return {
    value: Math.abs(delta),
    isPositive: delta >= 0,
    isZero: Math.abs(delta) < 0.01,
  }
}


