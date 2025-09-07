"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Upload, Database, Brain, CheckCircle } from 'lucide-react'

interface UploadProgressProps {
  progress: number
  type: 'spend' | 'revenue' | 'comments'
}

export function UploadProgress({ progress, type }: UploadProgressProps) {
  const getTypeIcon = () => {
    switch (type) {
      case 'spend':
        return <Database className="w-6 h-6" />
      case 'revenue':
        return <Database className="w-6 h-6" />
      case 'comments':
        return <Brain className="w-6 h-6" />
      default:
        return <Upload className="w-6 h-6" />
    }
  }

  const getTypeDescription = () => {
    switch (type) {
      case 'spend':
        return 'Processing ad spend data and calculating ROAS metrics...'
      case 'revenue':
        return 'Importing revenue data and updating customer lifetime value...'
      case 'comments':
        return 'Analyzing comment sentiment and extracting topic insights...'
      default:
        return 'Processing your data...'
    }
  }

  const getProgressSteps = () => {
    const steps = [
      { name: 'Validating Data', progress: 20 },
      { name: 'Processing Records', progress: 60 },
      { name: 'Running Analysis', progress: 90 },
      { name: 'Finalizing', progress: 100 }
    ]
    
    return steps.map((step, index) => {
      const isCompleted = progress >= step.progress
      const isCurrent = progress >= (index === 0 ? 0 : steps[index - 1].progress) && progress < step.progress
      
      return {
        ...step,
        isCompleted,
        isCurrent
      }
    })
  }

  const steps = getProgressSteps()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {getTypeIcon()}
            Uploading {type} Data
          </CardTitle>
          <CardDescription>
            {getTypeDescription()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Upload Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Progress Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors">
                  {step.isCompleted ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : step.isCurrent ? (
                    <div className="w-4 h-4 border-2 border-brand-violet border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-muted" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{step.name}</div>
                  {step.isCurrent && (
                    <div className="text-xs text-muted-foreground">
                      Processing...
                    </div>
                  )}
                </div>
                {step.isCompleted && (
                  <Badge variant="outline" className="text-green-500 border-green-500/20">
                    Complete
                  </Badge>
                )}
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">
                <strong>What's happening:</strong>
              </p>
              <ul className="space-y-1 text-xs">
                <li>• Data is being validated and cleaned</li>
                <li>• Records are being imported into the database</li>
                <li>• AI analysis is running in the background</li>
                <li>• Insights and recommendations are being generated</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
