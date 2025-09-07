"use client"

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Upload, FileText, DollarSign, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react'
import { CSVUploader } from '@/components/upload/csv-uploader'
import { ColumnMapper } from '@/components/upload/column-mapper'
import { DataPreview } from '@/components/upload/data-preview'
import { UploadProgress } from '@/components/upload/upload-progress'

type UploadType = 'spend' | 'revenue' | 'comments'
type UploadStep = 'select' | 'map' | 'preview' | 'upload' | 'complete'

interface UploadData {
  type: UploadType
  file: File | null
  data: any[]
  mappings: Record<string, string>
  errors: string[]
}

export default function UploadPage() {
  const [currentStep, setCurrentStep] = useState<UploadStep>('select')
  const [uploadData, setUploadData] = useState<UploadData>({
    type: 'spend',
    file: null,
    data: [],
    mappings: {},
    errors: []
  })
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileSelect = useCallback((file: File, data: any[], type: UploadType) => {
    setUploadData(prev => ({
      ...prev,
      file,
      data,
      type,
      mappings: {},
      errors: []
    }))
    setCurrentStep('map')
  }, [])

  const handleMappingComplete = useCallback((mappings: Record<string, string>) => {
    setUploadData(prev => ({
      ...prev,
      mappings
    }))
    setCurrentStep('preview')
  }, [])

  const handleUpload = useCallback(async () => {
    setIsUploading(true)
    setCurrentStep('upload')
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i)
      await new Promise(resolve => setTimeout(resolve, 200))
    }
    
    setIsUploading(false)
    setCurrentStep('complete')
  }, [])

  const resetUpload = useCallback(() => {
    setCurrentStep('select')
    setUploadData({
      type: 'spend',
      file: null,
      data: [],
      mappings: {},
      errors: []
    })
    setUploadProgress(0)
  }, [])

  const getStepIcon = (step: UploadStep) => {
    switch (step) {
      case 'select':
        return <Upload className="w-5 h-5" />
      case 'map':
        return <FileText className="w-5 h-5" />
      case 'preview':
        return <CheckCircle className="w-5 h-5" />
      case 'upload':
        return <AlertCircle className="w-5 h-5" />
      case 'complete':
        return <CheckCircle className="w-5 h-5" />
      default:
        return <Upload className="w-5 h-5" />
    }
  }

  const getStepTitle = (step: UploadStep) => {
    switch (step) {
      case 'select':
        return 'Select File & Type'
      case 'map':
        return 'Map Columns'
      case 'preview':
        return 'Preview Data'
      case 'upload':
        return 'Uploading...'
      case 'complete':
        return 'Upload Complete'
      default:
        return 'Upload'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-display font-bold">Data Upload</h1>
        <p className="text-muted-foreground text-lg">
          Import your data to unlock powerful insights
        </p>
      </motion.div>

      {/* Progress Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {['select', 'map', 'preview', 'upload', 'complete'].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                    currentStep === step 
                      ? 'bg-brand-violet/10 text-brand-violet' 
                      : 'text-muted-foreground'
                  }`}>
                    {getStepIcon(step as UploadStep)}
                    <span className="text-sm font-medium">
                      {getStepTitle(step as UploadStep)}
                    </span>
                  </div>
                  {index < 4 && (
                    <div className="w-8 h-px bg-border mx-2" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs value={uploadData.type} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="spend" className="gap-2">
              <DollarSign className="w-4 h-4" />
              Ad Spend
            </TabsTrigger>
            <TabsTrigger value="revenue" className="gap-2">
              <FileText className="w-4 h-4" />
              Revenue
            </TabsTrigger>
            <TabsTrigger value="comments" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Comments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="spend" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ad Spend Data</CardTitle>
                <CardDescription>
                  Upload your advertising spend data to track ROAS and optimize campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentStep === 'select' && (
                  <CSVUploader
                    type="spend"
                    onFileSelect={handleFileSelect}
                    acceptedColumns={['date', 'platform', 'campaign', 'spend', 'impressions', 'clicks', 'conversions']}
                  />
                )}
                {currentStep === 'map' && uploadData.file && (
                  <ColumnMapper
                    data={uploadData.data}
                    type="spend"
                    onMappingComplete={handleMappingComplete}
                  />
                )}
                {currentStep === 'preview' && (
                  <DataPreview
                    data={uploadData.data}
                    mappings={uploadData.mappings}
                    type="spend"
                    onUpload={handleUpload}
                    onBack={() => setCurrentStep('map')}
                  />
                )}
                {currentStep === 'upload' && (
                  <UploadProgress
                    progress={uploadProgress}
                    type="spend"
                  />
                )}
                {currentStep === 'complete' && (
                  <div className="text-center space-y-4">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                    <h3 className="text-xl font-semibold">Upload Complete!</h3>
                    <p className="text-muted-foreground">
                      Your ad spend data has been successfully imported and processed.
                    </p>
                    <Button onClick={resetUpload} className="gap-2">
                      <Upload className="w-4 h-4" />
                      Upload Another File
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Data</CardTitle>
                <CardDescription>
                  Import revenue data to calculate accurate ROAS and customer lifetime value
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentStep === 'select' && (
                  <CSVUploader
                    type="revenue"
                    onFileSelect={handleFileSelect}
                    acceptedColumns={['date', 'order_id', 'customer_id', 'revenue', 'product', 'channel']}
                  />
                )}
                {currentStep === 'map' && uploadData.file && (
                  <ColumnMapper
                    data={uploadData.data}
                    type="revenue"
                    onMappingComplete={handleMappingComplete}
                  />
                )}
                {currentStep === 'preview' && (
                  <DataPreview
                    data={uploadData.data}
                    mappings={uploadData.mappings}
                    type="revenue"
                    onUpload={handleUpload}
                    onBack={() => setCurrentStep('map')}
                  />
                )}
                {currentStep === 'upload' && (
                  <UploadProgress
                    progress={uploadProgress}
                    type="revenue"
                  />
                )}
                {currentStep === 'complete' && (
                  <div className="text-center space-y-4">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                    <h3 className="text-xl font-semibold">Upload Complete!</h3>
                    <p className="text-muted-foreground">
                      Your revenue data has been successfully imported and processed.
                    </p>
                    <Button onClick={resetUpload} className="gap-2">
                      <Upload className="w-4 h-4" />
                      Upload Another File
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Comments Data</CardTitle>
                <CardDescription>
                  Upload comment data for sentiment analysis and engagement insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentStep === 'select' && (
                  <CSVUploader
                    type="comments"
                    onFileSelect={handleFileSelect}
                    acceptedColumns={['date', 'platform', 'author', 'text', 'content_id', 'likes', 'replies']}
                  />
                )}
                {currentStep === 'map' && uploadData.file && (
                  <ColumnMapper
                    data={uploadData.data}
                    type="comments"
                    onMappingComplete={handleMappingComplete}
                  />
                )}
                {currentStep === 'preview' && (
                  <DataPreview
                    data={uploadData.data}
                    mappings={uploadData.mappings}
                    type="comments"
                    onUpload={handleUpload}
                    onBack={() => setCurrentStep('map')}
                  />
                )}
                {currentStep === 'upload' && (
                  <UploadProgress
                    progress={uploadProgress}
                    type="comments"
                  />
                )}
                {currentStep === 'complete' && (
                  <div className="text-center space-y-4">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                    <h3 className="text-xl font-semibold">Upload Complete!</h3>
                    <p className="text-muted-foreground">
                      Your comments data has been successfully imported and processed.
                    </p>
                    <Button onClick={resetUpload} className="gap-2">
                      <Upload className="w-4 h-4" />
                      Upload Another File
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
