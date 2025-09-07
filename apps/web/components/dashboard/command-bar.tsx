"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Command, Search, TrendingUp, MessageSquare, Target, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const commands = [
  {
    id: 'search-comments',
    title: 'Search Comments',
    description: 'Find comments by content, author, or sentiment',
    icon: MessageSquare,
    shortcut: '⌘C'
  },
  {
    id: 'view-trends',
    title: 'View Trends',
    description: 'See trending topics and keywords',
    icon: TrendingUp,
    shortcut: '⌘T'
  },
  {
    id: 'manage-campaigns',
    title: 'Manage Campaigns',
    description: 'View and edit your ad campaigns',
    icon: Target,
    shortcut: '⌘M'
  },
  {
    id: 'get-recommendations',
    title: 'Get Recommendations',
    description: 'Generate AI-powered insights',
    icon: Lightbulb,
    shortcut: '⌘R'
  }
]

export function CommandBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === 'k') {
          e.preventDefault()
          setIsOpen(true)
        }
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const filteredCommands = commands.filter(command =>
    command.title.toLowerCase().includes(query.toLowerCase()) ||
    command.description.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-1/2 top-1/4 transform -translate-x-1/2 w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Type a command or search..."
                  value={query}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                  className="border-0 shadow-none focus-visible:ring-0 text-lg"
                  autoFocus
                />
                <kbd className="px-2 py-1 text-xs bg-muted rounded border">ESC</kbd>
              </div>

              {/* Commands List */}
              <div className="max-h-96 overflow-y-auto">
                {filteredCommands.length > 0 ? (
                  <div className="p-2">
                    {filteredCommands.map((command, index) => (
                      <motion.div
                        key={command.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => {
                          // Handle command execution
                          console.log('Executing command:', command.id)
                          setIsOpen(false)
                        }}
                      >
                        <div className="p-2 rounded-lg bg-muted/50">
                          <command.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{command.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {command.description}
                          </div>
                        </div>
                        <kbd className="px-2 py-1 text-xs bg-muted rounded border">
                          {command.shortcut}
                        </kbd>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <Command className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No commands found</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border bg-muted/20">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Press ↑↓ to navigate, Enter to select</span>
                  <span>Arc Command Palette</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
