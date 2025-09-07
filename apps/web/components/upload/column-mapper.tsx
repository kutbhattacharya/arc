"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle, ArrowRight } from 'lucide-react'

interface ColumnMapperProps {
  data: any[]
  type: 'spend' | 'revenue' | 'comments'
  onMappingComplete: (mappings: Record<string, string>) => void
}

const requiredColumns = {
  spend: ['date', 'platform', 'spend'],
  revenue: ['date', 'revenue'],
  comments: ['date', 'platform', 'author', 'text']
}

const optionalColumns = {
  spend: ['campaign', 'impressions', 'clicks', 'conversions'],
  revenue: ['order_id', 'customer_id', 'product', 'channel'],
  comments: ['content_id', 'likes', 'replies']
}

export function ColumnMapper({ data, type, onMappingComplete }: ColumnMapperProps) {
  const [mappings, setMappings] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<string[]>([])

  const fileColumns = data.length > 0 ? Object.keys(data[0]) : []
  const required = requiredColumns[type]
  const optional = optionalColumns[type]

  useEffect(() => {
    // Auto-map columns with exact matches
    const autoMappings: Record<string, string> = {}
    fileColumns.forEach(fileCol => {
      const lowerFileCol = fileCol.toLowerCase()
      const exactMatch = [...required, ...optional].find(reqCol => 
        reqCol.toLowerCase() === lowerFileCol
      )
      if (exactMatch) {
        autoMappings[exactMatch] = fileCol
      }
    })
    setMappings(autoMappings)
  }, [fileColumns, type])

  const handleMappingChange = (requiredColumn: string, fileColumn: string) => {
    setMappings(prev => ({
      ...prev,
      [requiredColumn]: fileColumn
    }))
  }

  const validateMappings = () => {
    const newErrors: string[] = []
    
    // Check required columns
    required.forEach(reqCol => {
      if (!mappings[reqCol]) {
        newErrors.push(`Required column "${reqCol}" is not mapped`)
      }
    })

    // Check for duplicate mappings
    const mappedColumns = Object.values(mappings)
    const duplicates = mappedColumns.filter((col, index) => mappedColumns.indexOf(col) !== index)
    if (duplicates.length > 0) {
      newErrors.push('Each file column can only be mapped to one required column')
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleContinue = () => {
    if (validateMappings()) {
      onMappingComplete(mappings)
    }
  }

  const getColumnDescription = (column: string) => {
    const descriptions: Record<string, string> = {
      date: 'Date of the record (YYYY-MM-DD format)',
      platform: 'Advertising platform (Google Ads, Meta Ads, etc.)',
      spend: 'Amount spent in dollars',
      campaign: 'Campaign name or ID',
      impressions: 'Number of impressions',
      clicks: 'Number of clicks',
      conversions: 'Number of conversions',
      revenue: 'Revenue amount in dollars',
      order_id: 'Unique order identifier',
      customer_id: 'Customer identifier',
      product: 'Product name or category',
      channel: 'Sales channel',
      author: 'Comment author name or username',
      text: 'Comment text content',
      content_id: 'ID of the content being commented on',
      likes: 'Number of likes',
      replies: 'Number of replies'
    }
    return descriptions[column] || 'Column data'
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Map Columns</CardTitle>
          <CardDescription>
            Match your CSV columns to the required data fields
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Required Columns */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              Required Columns
              <Badge variant="destructive" className="text-xs">Required</Badge>
            </h4>
            <div className="space-y-3">
              {required.map((column) => (
                <div key={column} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium">{column}</div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <Select
                    value={mappings[column] || ''}
                    onValueChange={(value: string) => handleMappingChange(column, value)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select column..." />
                    </SelectTrigger>
                    <SelectContent>
                      {fileColumns.map((fileCol) => (
                        <SelectItem key={fileCol} value={fileCol}>
                          {fileCol}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="w-6 h-6 flex items-center justify-center">
                    {mappings[column] ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Optional Columns */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              Optional Columns
              <Badge variant="outline" className="text-xs">Optional</Badge>
            </h4>
            <div className="space-y-3">
              {optional.map((column) => (
                <div key={column} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium">{column}</div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <Select
                    value={mappings[column] || ''}
                    onValueChange={(value: string) => handleMappingChange(column, value)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select column..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {fileColumns.map((fileCol) => (
                        <SelectItem key={fileCol} value={fileCol}>
                          {fileCol}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="w-6 h-6 flex items-center justify-center">
                    {mappings[column] ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-muted" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column Descriptions */}
          <div className="pt-4 border-t border-border">
            <h4 className="font-medium mb-3">Column Descriptions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[...required, ...optional].map((column) => (
                <div key={column} className="text-sm">
                  <span className="font-medium">{column}:</span>
                  <span className="text-muted-foreground ml-2">
                    {getColumnDescription(column)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Errors */}
      {errors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          {errors.map((error, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex justify-end">
        <Button onClick={handleContinue} disabled={errors.length > 0}>
          Continue to Preview
        </Button>
      </div>
    </div>
  )
}
