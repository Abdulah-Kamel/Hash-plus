"use client";

import { useCallback, useState } from "react";
import { Image, Upload, Trash2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

  const handleUpload = () => {
    if (uploadedFiles.length > 0) {
      // Handle the actual upload logic here
      console.log("Uploading file:", uploadedFiles[0]);
      // You can add your upload API call here
    }
  };

  const handleRemove = () => {
    setUploadedFiles([]);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center w-full h-38 cursor-pointer rounded-2xl border-2 border-dashed transition bg-gray-50/50",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-primary/60 hover:bg-primary/5"
        )}
      >
        <input {...getInputProps()} />

        <div className="relative mb-4">
          <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center">
            <div className="w-10 h-10 bg-orange-200 rounded-xl flex items-center justify-center">
              <Image className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="text-center space-y-1">
          <p className="text-gray-900 text-xs font-medium">
            Click or Drag & Drop
          </p>
          {uploadedFiles.length > 0 ? (
            <div className="space-y-1">
              <p className="text-gray-900 text-xs font-medium truncate max-w-48">
                {uploadedFiles[0].name}
              </p>
              <p className="text-gray-500 text-xs">
                {formatFileSize(uploadedFiles[0].size)}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 text-xs">
              SVG, PNG, JPG (max. 800×400)
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 justify-center">
        <Button
          onClick={handleUpload}
          disabled={uploadedFiles.length === 0}
          className="flex items-center gap-2 px-3 py-6 cursor-pointer bg-primary hover:bg-primary/90 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>ارفق الصورة</span>
        </Button>

        <Button
          onClick={handleRemove}
          disabled={uploadedFiles.length === 0}
          variant="outline"
          className="flex items-center gap-2 px-3 py-6 cursor-pointer border-red-300 text-red-600 hover:text-red-600 hover:bg-red-50 hover:border-red-400 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>حذف الصورة</span>
        </Button>
      </div>
    </div>
  );
}
