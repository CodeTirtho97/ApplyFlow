// Storage helper functions for file uploads/downloads
import { createClient } from '@/lib/supabase/client'

const BUCKET_NAME = 'resumes'
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

/**
 * Upload a resume file to Supabase Storage
 */
export async function uploadResume(file: File, userId: string): Promise<string> {
  // Validate file type
  if (file.type !== 'application/pdf') {
    throw new Error('Only PDF files are allowed')
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size must be less than 5MB')
  }

  const supabase = createClient()

  // Generate unique filename: userId/timestamp_originalname
  const timestamp = Date.now()
  const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const filePath = `${userId}/${timestamp}_${sanitizedFilename}`

  // Upload to storage
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    console.error('Upload error:', error)
    throw new Error(`Failed to upload file: ${error.message}`)
  }

  // Get public URL (even though bucket is private, we need the path)
  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path)

  return urlData.publicUrl
}

/**
 * Download a resume file from Supabase Storage
 */
export async function downloadResume(filePath: string): Promise<Blob> {
  const supabase = createClient()

  // Extract the path from full URL if needed
  const path = filePath.includes('resumes/')
    ? filePath.split('resumes/')[1]
    : filePath

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .download(path)

  if (error) {
    console.error('Download error:', error)
    throw new Error(`Failed to download file: ${error.message}`)
  }

  return data
}

/**
 * Delete a resume file from Supabase Storage
 */
export async function deleteResumeFile(filePath: string): Promise<void> {
  const supabase = createClient()

  // Extract the path from full URL if needed
  const path = filePath.includes('resumes/')
    ? filePath.split('resumes/')[1]
    : filePath

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([path])

  if (error) {
    console.error('Delete error:', error)
    throw new Error(`Failed to delete file: ${error.message}`)
  }
}

/**
 * Trigger browser download for a blob
 */
export function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
