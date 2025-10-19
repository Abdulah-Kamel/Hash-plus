"use client"

import {useCallback, useState} from "react"
import { Upload, File, Trash2, FileText, Image, Video, Music } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function UploadDropzone() {
    const [uploadedFiles, setUploadedFiles] = useState([])
    
    const onDrop = useCallback((acceptedFiles) => {
        console.log("Uploaded files:", acceptedFiles)
        const newFiles = acceptedFiles.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            file,
            name: file.name,
            size: file.size,
            type: file.type
        }))
        setUploadedFiles(prev => [...prev, ...newFiles])
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
    })

    const removeFile = (fileId) => {
        setUploadedFiles(prev => prev.filter(file => file.id !== fileId))
    }

    const getFileIcon = (fileType) => {
        if (fileType.startsWith('image/')) return <Image className="w-8 h-8" />
        if (fileType.startsWith('video/')) return <Video className="w-8 h-8" />
        if (fileType.startsWith('audio/')) return <Music className="w-8 h-8" />
        if (fileType.includes('pdf') || fileType.includes('document')) return <FileText className="w-8 h-8" />
        return <File className="w-8 h-8" />
    }

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    return (
        <div className="space-y-4">
            {/* Upload Dropzone */}
            <div
                {...getRootProps()}
                className={cn(
                    "flex flex-col items-center justify-center w-full h-32 cursor-pointer rounded-2xl border-2 border-dashed transition",
                    isDragActive
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/20 hover:border-primary/40"
                )}
            >
                <input {...getInputProps()} />
                <Upload className="w-6 h-6 mb-2 text-muted-foreground" />
                <p className="text-muted-foreground text-sm font-medium">
                    ارفق الملف هنا
                </p>
            </div>

            {/* Uploaded Files Display */}
            {uploadedFiles.length > 0 && (
                <div className="space-y-3">
                    {uploadedFiles.map((fileItem) => (
                        <div
                            key={fileItem.id}
                            className="flex items-center justify-between p-4 bg-teal-50/70 rounded-xl border"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 text-primary">
                                    {getFileIcon(fileItem.type)}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {fileItem.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {formatFileSize(fileItem.size)}
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(fileItem.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
