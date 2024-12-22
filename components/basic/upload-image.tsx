"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FileRejection, useDropzone } from "react-dropzone";
import clsx from "clsx";
import { Button } from "@nextui-org/button";

type Props = {
  initialPreview?: string;
  previewClassName?: string;
  onSave?: (file: File | null) => Promise<void> | void;
  saveText?: string;
};

const UploadImage: React.FC<Props> = ({
  initialPreview,
  previewClassName,
  onSave,
  saveText,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [fileState, setFileState] = useState<File | null>(null);
  const [shouldShowSave, setShouldShowSave] = useState(false);

  useEffect(
    function initializePreview() {
      setPreview(initialPreview ?? null);
    },
    [initialPreview],
  );

  const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length) {
      const error = rejectedFiles[0].errors?.[0];

      alert(error?.message);
    } else {
      const file = acceptedFiles[0];

      if (onSave) setShouldShowSave(true);
      setFileState(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
    maxSize: 3 * 1000 * 1000,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className={clsx("relative mx-auto", previewClassName)}>
            <Image
              fill
              alt="Image preview"
              className="rounded-full object-cover"
              src={preview}
            />
          </div>
        ) : (
          <div className="text-gray-500">
            {isDragActive ? (
              <p>Drop the image here ...</p>
            ) : (
              <p>Drag & drop an image here, or click to select one</p>
            )}
          </div>
        )}
      </div>
      <div className="mt-4 justify-center flex items-center gap-2 w-full">
        {preview && (
          <Button
            className="w-5/12"
            variant="bordered"
            onPress={() => {
              setPreview(null);
              setFileState(null);
              setShouldShowSave(true);
            }}
          >
            Remove Image
          </Button>
        )}
        {shouldShowSave && (
          <Button
            className="w-5/12"
            color="primary"
            isLoading={isUploading}
            onPress={async () => {
              setIsUploading(true);
              await onSave?.(fileState);
              setIsUploading(false);
              setShouldShowSave(false);
              // need snackbar
            }}
          >
            {saveText ?? "Save"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
