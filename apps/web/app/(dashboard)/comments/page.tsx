"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, Download, MessageSquare, Heart, TrendingUp } from 'lucide-react'
import { CommentCard } from '@/components/comments/comment-card'
import { SentimentChart } from '@/components/comments/sentiment-chart'
import { TopicCloud } from '@/components/comments/topic-cloud'

// Mock data
const mockComments = [
  {
    id: '1',
    platform: 'YouTube',
    author: 'ScienceFan123',
    text: 'This is absolutely brilliant! Love the way you explain complex concepts. The visualizations are top-notch.',
    publishedAt: new Date(),
    sentiment: 'positive' as const,
    confidence: 0.92,
    likeCount: 45,
    replyCount: 3,
    topicTags: ['physics', 'education', 'visualization'],
    contentTitle: 'The Physics of Black Holes Explained'
  },
  {
    id: '2',
    platform: 'Instagram',
    author: 'curious_mind',
    text: 'When is the next video coming out? I can\'t wait to see more content like this!',
    publishedAt: new Date(Date.now() - 3600000),
    sentiment: 'neutral' as const,
    confidence: 0.78,
    likeCount: 12,
    replyCount: 1,
    topicTags: ['question', 'timing', 'expectation'],
    contentTitle: 'Behind the scenes of our quantum computing episode'
  },
  {
    id: '3',
    platform: 'YouTube',
    author: 'QuantumEnthusiast',
    text: 'Finally someone who gets it right. Can\'t wait for the next video! This channel is a gem.',
    publishedAt: new Date(Date.now() - 7200000),
    sentiment: 'positive' as const,
    confidence: 0.89,
    likeCount: 32,
    replyCount: 2,
    topicTags: ['quantum', 'technology', 'appreciation'],
    contentTitle: 'Why Quantum Computing Will Change Everything'
  },
  {
    id: '4',
    platform: 'YouTube',
    author: 'SkepticUser',
    text: 'I think you\'re oversimplifying this. The math behind quantum entanglement is much more complex.',
    publishedAt: new Date(Date.now() - 10800000),
    sentiment: 'negative' as const,
    confidence: 0.85,
    likeCount: 8,
    replyCount: 5,
    topicTags: ['criticism', 'complexity', 'mathematics'],
    contentTitle: 'Why Quantum Computing Will Change Everything'
  }
]

const sentimentStats = {
  positive: 65,
  neutral: 25,
  negative: 10
}

const topTopics = [
  { name: 'physics', count: 45, sentiment: 'positive' as const },
  { name: 'quantum', count: 32, sentiment: 'positive' as const },
  { name: 'education', count: 28, sentiment: 'positive' as const },
  { name: 'technology', count: 24, sentiment: 'neutral' as const },
  { name: 'science', count: 22, sentiment: 'positive' as const },
  { name: 'visualization', count: 18, sentiment: 'positive' as const },
  { name: 'question', count: 15, sentiment: 'neutral' as const },
  { name: 'criticism', count: 12, sentiment: 'negative' as const }
]

export default function CommentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [selectedSentiment, setSelectedSentiment] = useState('all')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredComments = mockComments.filter(comment => {
    const matchesSearch = comment.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comment.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPlatform = selectedPlatform === 'all' || comment.platform.toLowerCase() === selectedPlatform
    const matchesSentiment = selectedSentiment === 'all' || comment.sentiment === selectedSentiment
    
    return matchesSearch && matchesPlatform && matchesSentiment
  })

  if (!mounted) {
    return <div className="space-y-6">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-display font-bold">Comments Explorer</h1>
        <p className="text-muted-foreground text-lg">
          Dive deep into audience sentiment and engagement patterns
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-brand-violet" />
              <div>
                <div className="text-2xl font-bold">{mockComments.length}</div>
                <div className="text-sm text-muted-foreground">Total Comments</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold">{sentimentStats.positive}%</div>
                <div className="text-sm text-muted-foreground">Positive</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-cyan" />
              <div>
                <div className="text-2xl font-bold">8.5x</div>
                <div className="text-sm text-muted-foreground">Engagement Velocity</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-brand-purple" />
              <div>
                <div className="text-2xl font-bold">{topTopics.length}</div>
                <div className="text-sm text-muted-foreground">Topics Identified</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search comments, authors, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="youtube">YouTube</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={selectedSentiment} onValueChange={setSelectedSentiment}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Sentiment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sentiment</SelectItem>
            <SelectItem value="positive">Positive</SelectItem>
            <SelectItem value="neutral">Neutral</SelectItem>
            <SelectItem value="negative">Negative</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          More Filters
        </Button>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Comments List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Comments ({filteredComments.length})
            </h2>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
          
          <div className="space-y-3">
            {filteredComments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <CommentCard {...comment} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Analytics Sidebar */}
        <div className="space-y-6">
          {/* Sentiment Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sentiment Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <SentimentChart data={sentimentStats} />
            </CardContent>
          </Card>

          {/* Top Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Topics</CardTitle>
              <CardDescription>
                Most discussed topics in comments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TopicCloud topics={topTopics} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
