import { filterComments, type CommentItem } from '@/lib/comments'

describe('comments filtering', () => {
  const comments: CommentItem[] = [
    { text: 'Love this physics video', author: 'alice', platform: 'youtube', sentiment: 'positive' },
    { text: 'Too simple imo', author: 'bob', platform: 'youtube', sentiment: 'negative' },
    { text: 'When is next drop?', author: 'carol', platform: 'instagram', sentiment: 'neutral' },
  ]

  it('filters by search', () => {
    const out = filterComments(comments, 'physics', 'all', 'all')
    expect(out).toHaveLength(1)
    expect(out[0].author).toBe('alice')
  })

  it('filters by platform', () => {
    const out = filterComments(comments, '', 'instagram', 'all')
    expect(out).toHaveLength(1)
    expect(out[0].author).toBe('carol')
  })

  it('filters by sentiment', () => {
    const out = filterComments(comments, '', 'all', 'negative')
    expect(out).toHaveLength(1)
    expect(out[0].author).toBe('bob')
  })
})

