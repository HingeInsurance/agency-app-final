'use client'

import { useState, useRef } from 'react'
import { Upload, X, FileText, Image as ImageIcon, CheckCircle } from 'lucide-react'

interface Step4FileUploadProps {
  file: File | null
  onChange: (file: File | null) => void
  error?: string
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']

export default function Step4FileUpload({
  file,
  onChange,
  error,
}: Step4FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="w-6 h-6" />
    } else if (file.type === 'application/pdf') {
      return <FileText className="w-6 h-6" />
    }
    return <FileText className="w-6 h-6" />
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const validateFile = (fileToValidate: File): boolean => {
    setUploadError(null)

    if (!ALLOWED_TYPES.includes(fileToValidate.type)) {
      setUploadError(
        'Invalid file type. Please upload JPG, PNG, WebP, or PDF files.'
      )
      return false
    }

    if (fileToValidate.size > MAX_FILE_SIZE) {
      setUploadError(
        `File size exceeds ${formatFileSize(MAX_FILE_SIZE)} limit.`
      )
      return false
    }

    return true
  }

  const handleFileChange = (selectedFile: File) => {
    if (validateFile(selectedFile)) {
      onChange(selectedFile)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFileChange(e.target.files[0])
    }
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files?.[0]) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  return (
    <div className="space-y-4">
      {/* Step Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Upload your declarations page
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          This helps us provide you with a more accurate quote
        </p>
      </div>

      {/* File Upload Area */}
      <div className="mt-6">
        {!file ? (
          // Empty State
          <label
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`block p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 text-center ${
              isDragging
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 hover:bg-muted/30'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleInputChange}
              accept=".jpg,.jpeg,.png,.webp,.pdf"
              className="hidden"
              aria-label="Upload declarations page"
              aria-describedby="file-help-text"
            />

            <div className="flex flex-col items-center justify-center gap-3">
              <div
                className={`p-3 rounded-lg ${
                  isDragging
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <Upload className="w-8 h-8" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  Drag and drop your file here
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  or click to browse
                </p>
              </div>
              <p className="text-xs text-muted-foreground pt-2">
                Supported formats: JPG, PNG, WebP, PDF (Max 5 MB)
              </p>
            </div>
          </label>
        ) : (
          // File Selected State
          <div className="p-6 rounded-xl border-2 border-success bg-success/5 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="flex-shrink-0 p-3 bg-success/20 rounded-lg text-success">
                  {getFileIcon(file)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground truncate">
                      {file.name}
                    </p>
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatFileSize(file.size)} •{' '}
                    {file.type === 'application/pdf'
                      ? 'PDF'
                      : 'Image'}
                  </p>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => {
                  onChange(null)
                  setUploadError(null)
                }}
                className="flex-shrink-0 p-2 hover:bg-success/20 rounded-lg transition-colors duration-200 text-muted-foreground hover:text-foreground"
                aria-label="Remove file"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Replace Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full px-4 py-2 text-sm font-medium border border-success text-success hover:bg-success/10 rounded-lg transition-all duration-200"
              type="button"
            >
              Replace File
            </button>
          </div>
        )}
      </div>

      {/* Error Messages */}
      {uploadError && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive font-medium">{uploadError}</p>
        </div>
      )}

      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive font-medium">{error}</p>
        </div>
      )}

      {/* File Info */}
      <div className="p-4 bg-muted/50 rounded-lg border border-border/50 space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          What to Upload
        </p>
        <ul
          id="file-help-text"
          className="space-y-1 text-xs text-muted-foreground"
        >
          <li>• Your current insurance declarations page</li>
          <li>• Policy number and coverage details clearly visible</li>
          <li>• Clear photo or scanned copy</li>
          <li>• Or a PDF of your complete policy</li>
        </ul>
      </div>

      {/* Optional Note */}
      <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
        <p className="text-xs text-accent font-medium">
          💡 Tip: Having your declarations page helps us provide more accurate
          quotes faster.
        </p>
      </div>
    </div>
  )
}
