"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArrowLeft, Upload, CheckCircle, AlertTriangle } from 'lucide-react'

interface DataPreviewProps {
  data: any[]
  mappings: Record<string, string>
  type: 'spend' | 'revenue' | 'comments'
  onUpload: () => void
  onBack: () => void
}

export function DataPreview({ data, mappings, type, onUpload, onBack }: DataPreviewProps) {
  const [previewRows] = useState(5)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  // Transform data based on mappings
  const transformedData = data.slice(0, previewRows).map(row => {
    const transformed: Record<string, any> = {}
    Object.entries(mappings).forEach(([requiredCol, fileCol]) => {
      if (fileCol && row[fileCol] !== undefined) {
        transformed[requiredCol] = row[fileCol]
      }
    })
    return transformed
  })

  // Get column headers for display
  const displayColumns = Object.keys(mappings).filter(col => mappings[col])

  const validateData = () => {
    const errors: string[] = []
    
    // Check for required fields
    const requiredFields = type === 'spend' ? ['date', 'platform', 'spend'] :
                          type === 'revenue' ? ['date', 'revenue'] :
                          ['date', 'platform', 'author', 'text']
    
    requiredFields.forEach(field => {
      if (!mappings[field]) {
        errors.push(`Required field "${field}" is not mapped`)
      }
    })

    // Check data quality
    transformedData.forEach((row, index) => {
      if (type === 'spend' && mappings.spend) {
        const spend = parseFloat(row.spend)
        if (isNaN(spend) || spend < 0) {
          errors.push(`Row ${index + 1}: Invalid spend value "${row.spend}"`)
        }
      }
      
      if (type === 'revenue' && mappings.revenue) {
        const revenue = parseFloat(row.revenue)
        if (isNaN(revenue) || revenue < 0) {
          errors.push(`Row ${index + 1}: Invalid revenue value "${row.revenue}"`)
        }
      }
      
      if (mappings.date) {
        const date = new Date(row.date)
        if (isNaN(date.getTime())) {
          errors.push(`Row ${index + 1}: Invalid date format "${row.date}"`)
        }
      }
    })

    setValidationErrors(errors)
    return errors.length === 0
  }

  const handleUpload = () => {
    if (validateData()) {
      onUpload()
    }
  }

  const getTypeDescription = () => {
    switch (type) {
      case 'spend':
        return 'Ad spend data will be used to calculate ROAS and optimize campaign performance.'
      case 'revenue':
        return 'Revenue data will be used to calculate customer lifetime value and attribution.'
      case 'comments':
        return 'Comment data will be analyzed for sentiment and engagement insights.'
      default:
        return 'Data will be processed and analyzed.'
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Preview</CardTitle>
          <CardDescription>
            Review your data before uploading. Showing first {previewRows} rows.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Data Summary */}
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-violet">{data.length}</div>
                <div className="text-sm text-muted-foreground">Total Rows</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-cyan">{displayColumns.length}</div>
                <div className="text-sm text-muted-foreground">Mapped Columns</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">
                  {validationErrors.length === 0 ? '✓' : '⚠'}
                </div>
                <div className="text-sm text-muted-foreground">Validation</div>
              </div>
            </div>

            {/* Data Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    {displayColumns.map((column) => (
                      <TableHead key={column} className="font-medium">
                        {column}
                        <Badge variant="outline" className="ml-2 text-xs">
                          {mappings[column]}
                        </Badge>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transformedData.map((row, index) => (
                    <TableRow key={index}>
                      {displayColumns.map((column) => (
                        <TableCell key={column} className="text-sm">
                          {row[column] || '-'}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Type Description */}
            <div className="p-4 bg-brand-violet/5 border border-brand-violet/20 rounded-lg">
              <p className="text-sm text-brand-violet">
                {getTypeDescription()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2 text-red-500 font-medium">
            <AlertTriangle className="w-4 h-4" />
            <span>Data Validation Errors</span>
          </div>
          {validationErrors.map((error, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Mapping
        </Button>
        <Button 
          onClick={handleUpload} 
          disabled={validationErrors.length > 0}
          className="gap-2"
        >
          <Upload className="w-4 h-4" />
          Upload Data
        </Button>
      </div>
    </div>
  )
}
