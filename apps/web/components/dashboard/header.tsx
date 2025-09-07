"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Bell, User, Command } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export function Header() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="flex h-16 items-center justify-between px-6">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search comments, campaigns, trends..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <kbd className="px-2 py-1 text-xs bg-muted rounded border">⌘K</kbd>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="hidden sm:inline">Demo User</span>
          </Button>
        </div>
      </div>
    </motion.header>
  )
}
