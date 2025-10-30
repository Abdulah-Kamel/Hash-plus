"use client";

import { useCallback, useState } from "react";
import { Image } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";

export default function ProfileImageInput() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    console.log("Uploaded files:", acceptedFiles);
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    // Replace the existing file since multiple is false
    setUploadedFiles(newFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center w-full h-48 cursor-pointer rounded-2xl border-2 border-dashed transition bg-gray-50/50",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-primary/60 hover:bg-primary/5"
        )}
      >
        <input {...getInputProps()} />

        <div className="relative mb-4">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
            <div className="w-12 h-12 bg-orange-200 rounded-xl flex items-center justify-center">
              <Image className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="text-center space-y-1">
          <p className="text-gray-900 text-base font-medium">
            Click or Drag & Drop
          </p>
          {uploadedFiles.length > 0 ? (
            <div className="space-y-1">
              <p className="text-gray-900 text-sm font-medium truncate max-w-64">
                {uploadedFiles[0].name}
              </p>
              <p className="text-gray-500 text-xs">
                {formatFileSize(uploadedFiles[0].size)}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              SVG, PNG, JPG (max. 800×400)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
