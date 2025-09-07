"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type Connections = {
  youtube: boolean
  instagram: boolean
  googleAds: boolean
  metaAds: boolean
}

const defaultConnections: Connections = {
  youtube: true,
  instagram: true,
  googleAds: true,
  metaAds: false,
}

function loadConnections(): Connections {
  if (typeof window === 'undefined') return defaultConnections
  try {
    const raw = localStorage.getItem('arc:connections')
    return raw ? { ...defaultConnections, ...JSON.parse(raw) } : defaultConnections
  } catch { return defaultConnections }
}

export default function SettingsPage() {
  const [connections, setConnections] = useState<Connections>(defaultConnections)

  useEffect(() => { setConnections(loadConnections()) }, [])
  useEffect(() => { localStorage.setItem('arc:connections', JSON.stringify(connections)) }, [connections])

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-display font-bold">Settings</h1>
        <p className="text-muted-foreground text-lg">Manage connections, workspace, and preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Connected Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: 'youtube', label: 'YouTube' },
              { key: 'instagram', label: 'Instagram' },
              { key: 'googleAds', label: 'Google Ads' },
              { key: 'metaAds', label: 'Meta Ads' },
            ].map((c) => (
              <div key={c.key} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div className="font-medium">{c.label}</div>
                <Button
                  size="sm"
                  variant={(connections as any)[c.key] ? 'default' : 'outline'}
                  onClick={() => setConnections({ ...connections, [c.key]: !(connections as any)[c.key] } as any)}
                >
                  {(connections as any)[c.key] ? 'Connected' : 'Connect'}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workspace</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">Name: <span className="font-medium">Arc Science Channel</span></div>
            <Button variant="outline" size="sm">Rename</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
