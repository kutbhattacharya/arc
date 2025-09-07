"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar as CalendarIcon, Plus } from 'lucide-react'

type PlannedPost = { id: string; title: string; date: string; channel: string }

const initial: PlannedPost[] = [
  { id: 'p1', title: 'AI ethics explainer', date: '2024-01-25', channel: 'YouTube' },
  { id: 'p2', title: 'Quantum Q&A', date: '2024-01-28', channel: 'Instagram' },
]

export default function PlannerPage() {
  const [posts, setPosts] = useState<PlannedPost[]>(initial)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [channel, setChannel] = useState('YouTube')

  const addPost = () => {
    if (!title || !date) return
    setPosts((p) => [...p, { id: Math.random().toString(36).slice(2), title, date, channel }])
    setTitle(''); setDate('')
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-display font-bold">Content Planner</h1>
        <p className="text-muted-foreground text-lg">Drag-drop coming soon. For now, schedule quick drops.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CalendarIcon className="w-4 h-4" /> New Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input placeholder="Date (YYYY-MM-DD)" value={date} onChange={(e) => setDate(e.target.value)} />
            <Input placeholder="Channel" value={channel} onChange={(e) => setChannel(e.target.value)} />
            <Button onClick={addPost} className="w-full"><Plus className="w-4 h-4 mr-1" /> Schedule</Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming posts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {posts.sort((a,b)=>a.date.localeCompare(b.date)).map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div>
                  <div className="font-medium">{p.title}</div>
                  <div className="text-xs text-muted-foreground">{p.channel} • {new Date(p.date).toDateString()}</div>
                </div>
                <Button size="sm" variant="outline" onClick={() => setPosts(posts.filter(x => x.id !== p.id))}>Remove</Button>
              </div>
            ))}
            {posts.length === 0 && (
              <div className="text-sm text-muted-foreground">No posts yet. Add one to get started.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

