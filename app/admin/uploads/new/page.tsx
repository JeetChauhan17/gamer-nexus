"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { UploadIcon, AlertCircleIcon, CheckCircleIcon, XIcon } from "lucide-react"
import Link from "next/link"

export default function UploadFilesPage() {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleUpload = () => {
    if (files.length === 0) {
      setUploadError("Please select at least one file to upload")
      return
    }

    setUploading(true)
    setUploadError(null)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setUploading(false)
        setUploadComplete(true)
      }
    }, 300)

    // In a real implementation, this would be where you'd upload to Backblaze B2
    // using their API or an SDK
  }

  const resetUpload = () => {
    setFiles([])
    setUploadProgress(0)
    setUploadComplete(false)
    setUploadError(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Upload Files</h1>
          <p className="text-muted-foreground">Upload game files and assets to Backblaze B2</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin">Back to Dashboard</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>File Upload</CardTitle>
              <CardDescription>Select files to upload to your Backblaze B2 bucket</CardDescription>
            </CardHeader>
            <CardContent>
              {uploadComplete ? (
                <div className="bg-muted rounded-lg p-6 text-center">
                  <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Upload Complete!</h3>
                  <p className="text-muted-foreground mb-4">
                    Your files have been successfully uploaded to Backblaze B2.
                  </p>
                  <Button onClick={resetUpload}>Upload More Files</Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {uploadError && (
                    <Alert variant="destructive">
                      <AlertCircleIcon className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{uploadError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <UploadIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Drag and drop files here</h3>
                    <p className="text-sm text-muted-foreground mb-4">or click to browse your computer</p>
                    <Input
                      id="file-upload"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={uploading}
                    />
                    <Button asChild variant="outline" disabled={uploading}>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        Browse Files
                      </label>
                    </Button>
                  </div>

                  {files.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Selected Files ({files.length})</h3>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                            <div className="flex items-center">
                              <div className="ml-2">
                                <p className="text-sm font-medium">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                const newFiles = [...files]
                                newFiles.splice(index, 1)
                                setFiles(newFiles)
                              }}
                              disabled={uploading}
                            >
                              <XIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {uploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetUpload} disabled={uploading || files.length === 0}>
                Clear
              </Button>
              <Button onClick={handleUpload} disabled={uploading || files.length === 0}>
                {uploading ? "Uploading..." : "Upload to B2"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Upload Settings</CardTitle>
              <CardDescription>Configure settings for your file uploads</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="game">Associated Game</Label>
                <Select defaultValue="none">
                  <SelectTrigger id="game">
                    <SelectValue placeholder="Select a game" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (General Upload)</SelectItem>
                    <SelectItem value="elden-ring">Elden Ring</SelectItem>
                    <SelectItem value="cyberpunk-2077">Cyberpunk 2077</SelectItem>
                    <SelectItem value="zelda">The Legend of Zelda: Tears of the Kingdom</SelectItem>
                    <SelectItem value="baldurs-gate-3">Baldur's Gate 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">File Category</Label>
                <Select defaultValue="general">
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="screenshots">Screenshots</SelectItem>
                    <SelectItem value="videos">Videos</SelectItem>
                    <SelectItem value="documents">Documents</SelectItem>
                    <SelectItem value="game-files">Game Files</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="access">Access Level</Label>
                <Select defaultValue="public">
                  <SelectTrigger id="access">
                    <SelectValue placeholder="Select access level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public (Anyone can access)</SelectItem>
                    <SelectItem value="registered">Registered Users Only</SelectItem>
                    <SelectItem value="admin">Admin Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea id="description" placeholder="Add a description for these files" rows={3} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Backblaze B2 Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium">Bucket</div>
                <div className="text-sm text-muted-foreground">gamewiki-assets</div>
              </div>
              <div>
                <div className="text-sm font-medium">Storage Used</div>
                <div className="text-sm text-muted-foreground">256 GB of 1 TB</div>
              </div>
              <div>
                <div className="text-sm font-medium">Files Stored</div>
                <div className="text-sm text-muted-foreground">12,458 files</div>
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/admin/uploads">View All Files</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
