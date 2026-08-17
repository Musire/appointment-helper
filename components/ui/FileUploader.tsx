"use client"

import { UploadCloud, X } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { Accept, useDropzone } from "react-dropzone"

type FileUploaderProps = {
  maxSize?: number
  accept?: Accept
  preview?: boolean
}

export default function FileUploader({
  maxSize = 2 * 1024 * 1024,
  accept = {
    "image/png": [],
    "image/jpeg": [],
    "image/webp": []
  },
  preview = true // Default to true
}: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    if (fileRejections.length > 0) {
      setError("Invalid file");
      return;
    }

    const selected = acceptedFiles[0];
    if (!selected) return;

    // 1. Update local state for preview
    setFile(selected);
    if (preview) setPreviewUrl(URL.createObjectURL(selected));

    // 2. CRITICAL: Sync the file to the actual HTML input so FormData can see it
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(selected);
    
    // Find the hidden input and set its files
    const input = document.querySelector('input[name="image"]') as HTMLInputElement;
    if (input) {
      input.files = dataTransfer.files;
    }
  }, [preview]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxSize,
    multiple: false,
    onDrop
  })

  function removeFile(e: React.MouseEvent) {
    e.stopPropagation()
    setFile(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
  }

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  return (
    <div className="w-full max-w-xl  ">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-xl p-8
          flex flex-col items-center justify-center gap-4
          transition-colors cursor-pointer 
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}
          ${file ? "border-solid" : ""}
        `}
      >
        <input {...getInputProps()} name="image" />

        {!file ? (
          <div className="flex flex-col items-center gap-2">
            <UploadCloud size={40} className="text-blue-400" />
            <p className="text-lg font-medium text-main">
              {isDragActive ? "Drop it here" : "Click or drag to upload"}
            </p>
            <p className="text-sm text-else">
              Max size: {(maxSize / 1024 / 1024).toFixed(0)}MB
            </p>
          </div>
        ) : (
          <div className="relative w-full flex flex-col items-center gap-3">
            {previewUrl && (
              <img
                src={previewUrl}
                alt="preview"
                className="max-h-48 rounded-lg object-contain shadow-sm"
              />
            )}
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
              <span className="text-xs truncate max-w-50 text-gray-600">{file.name}</span>
              <button
                type="button"
                onClick={removeFile}
                className="hover:text-error-dark transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-error-dark text-sm mt-2 text-center font-medium">
          {error}
        </p>
      )}
    </div>
  )
}
