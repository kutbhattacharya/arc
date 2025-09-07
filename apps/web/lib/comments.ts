export type Sentiment = 'positive' | 'neutral' | 'negative'

export interface CommentItem {
  text: string
  author: string
  platform: string
  sentiment: Sentiment
}

export function filterComments(
  comments: CommentItem[],
  search: string,
  platform: string | 'all',
  sentiment: Sentiment | 'all'
) {
  const q = search.toLowerCase().trim()
  return comments.filter((c) => {
    const matchesSearch = !q || c.text.toLowerCase().includes(q) || c.author.toLowerCase().includes(q)
    const matchesPlatform = platform === 'all' || c.platform.toLowerCase() === platform
    const matchesSentiment = sentiment === 'all' || c.sentiment === sentiment
    return matchesSearch && matchesPlatform && matchesSentiment
  })
}

