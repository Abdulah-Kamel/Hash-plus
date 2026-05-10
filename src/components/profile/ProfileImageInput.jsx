"use client";

import { useCallback, useState, useEffect } from "react";
import { Image, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { updateProfileImage, removeProfileImage, getProfileImage } from "@/actions/profileActions";
import { toast } from "sonner";

export default function ProfileImageInput({ currentImageUrl, onImageChange }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Sync with external image URL
  useEffect(() => {
    if (currentImageUrl) {
      setPreviewUrl(currentImageUrl);
    }
  }, [currentImageUrl]);

  // Load current image on mount if not provided
  useEffect(() => {
    if (!currentImageUrl) {
      getProfileImage().then((res) => {
        if (res.success && res.data?.url) {
          setPreviewUrl(res.data.url);
        }
      });
    }
  }, [currentImageUrl]);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    setUploadedFiles(newFiles);

    // Create a preview URL for the selected file
    if (acceptedFiles[0]) {
      const url = URL.createObjectURL(acceptedFiles[0]);
      setPreviewUrl(url);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/svg+xml": [".svg"],
    },
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleUpload = async () => {
    if (uploadedFiles.length === 0) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("profileImage", uploadedFiles[0].file);

      const res = await updateProfileImage(formData);
      if (res.success) {
        toast.success("تم رفع الصورة بنجاح");
        const newUrl = res.data?.profileImageUrl || res.data?.url || previewUrl;
        setPreviewUrl(newUrl);
        setUploadedFiles([]);
        onImageChange?.(newUrl);
      } else {
        toast.error(res.error || "فشل رفع الصورة");
      }
    } catch {
      toast.error("حدث خطأ أثناء رفع الصورة");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    setIsDeleting(true);
    try {
      const res = await removeProfileImage();
      if (res.success) {
        toast.success("تم حذف الصورة بنجاح");
        setPreviewUrl(null);
        setUploadedFiles([]);
        onImageChange?.(null);
      } else {
        toast.error(res.error || "فشل حذف الصورة");
      }
    } catch {
      toast.error("حدث خطأ أثناء حذف الصورة");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center w-full h-38 cursor-pointer rounded-2xl border-2 border-dashed transition bg-gray-50/50 overflow-hidden",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-primary/60 hover:bg-primary/5"
        )}
      >
        <input {...getInputProps()} />

        {previewUrl && !uploadedFiles.length ? (
          // Show current profile image as preview
          <div className="w-full h-full flex items-center justify-center p-4">
            <img
              src={previewUrl}
              alt="صورة الملف الشخصي"
              className="max-h-28 max-w-full object-contain rounded-xl"
            />
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 justify-center">
        <Button
          onClick={handleUpload}
          disabled={uploadedFiles.length === 0 || isUploading}
          className="flex items-center gap-2 px-3 py-6 cursor-pointer bg-primary hover:bg-primary/90 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>جاري الرفع...</span>
            </>
          ) : (
            <span>ارفع صورة</span>
          )}
        </Button>

        <Button
          onClick={handleRemove}
          disabled={(!previewUrl && uploadedFiles.length === 0) || isDeleting}
          variant="outline"
          className="flex items-center gap-2 px-3 py-6 cursor-pointer border-red-300 text-red-600 hover:text-red-600 hover:bg-red-50 hover:border-red-400 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>جاري الحذف...</span>
            </>
          ) : (
            <span>حذف الصورة</span>
          )}
        </Button>
      </div>
    </div>
  );
}
