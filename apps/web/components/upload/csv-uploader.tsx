"use client"

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react'
import Papa from 'papaparse'

interface CSVUploaderProps {
  type: 'spend' | 'revenue' | 'comments'
  onFileSelect: (file: File, data: any[], type: 'spend' | 'revenue' | 'comments') => void
  acceptedColumns: string[]
}

export function CSVUploader({ type, onFileSelect, acceptedColumns }: CSVUploaderProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setIsProcessing(true)
    setError(null)

    try {
      // Parse CSV file
      const data = await new Promise<any[]>((resolve, reject) => {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (results: any) => {
            if (results.errors.length > 0) {
              reject(new Error(`CSV parsing error: ${results.errors[0].message}`))
            } else {
              resolve(results.data as any[])
            }
          },
          error: (error: any) => {
            reject(error)
          }
        })
      })

      if (data.length === 0) {
        throw new Error('CSV file is empty or has no valid data')
      }

      // Validate columns
      const fileColumns = Object.keys(data[0])
      const missingColumns = acceptedColumns.filter(col => !fileColumns.includes(col))
      
      if (missingColumns.length > 0) {
        setError(`Missing required columns: ${missingColumns.join(', ')}`)
        setIsProcessing(false)
        return
      }

      onFileSelect(file, data, type)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process CSV file')
    } finally {
      setIsProcessing(false)
    }
  }, [type, onFileSelect, acceptedColumns])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv']
    },
    multiple: false,
    disabled: isProcessing
  })

  const getTypeDescription = () => {
    switch (type) {
      case 'spend':
        return 'Upload your advertising spend data with columns for date, platform, campaign, spend, impressions, clicks, and conversions.'
      case 'revenue':
        return 'Import revenue data with columns for date, order ID, customer ID, revenue amount, product, and channel.'
      case 'comments':
        return 'Upload comment data with columns for date, platform, author, text content, content ID, likes, and replies.'
      default:
        return 'Upload your data file to get started.'
    }
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
          isDragActive
            ? 'border-brand-violet bg-brand-violet/5'
            : 'border-muted-foreground/25 hover:border-brand-violet hover:bg-brand-violet/5'
        } ${isProcessing ? 'pointer-events-none opacity-50' : ''}`}
      >
        <input {...getInputProps()} />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {isProcessing ? (
            <div className="space-y-2">
              <div className="w-16 h-16 mx-auto bg-brand-violet/10 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-brand-violet border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="text-sm text-muted-foreground">Processing CSV file...</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <p className="text-lg font-medium">
                  {isDragActive ? 'Drop your CSV file here' : 'Drag & drop your CSV file here'}
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse files
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500"
        >
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
        </motion.div>
      )}

      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-violet" />
              <span className="font-medium">Required Columns</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {getTypeDescription()}
            </p>
            <div className="flex flex-wrap gap-2">
              {acceptedColumns.map((column) => (
                <Badge key={column} variant="outline" className="text-xs">
                  {column}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
