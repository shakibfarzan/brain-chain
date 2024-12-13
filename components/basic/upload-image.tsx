"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import clsx from "clsx";
import { Button } from "@nextui-org/button";

type Props = {
  initialPreview?: string;
  previewClassName?: string;
  onSave?: (file: string) => void;
  saveText?: string;
};

const UploadImage: React.FC<Props> = ({
  initialPreview,
  previewClassName,
  onSave,
  saveText,
}) => {
  const [preview, setPreview] = useState<string | null>(initialPreview ?? null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
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
      {preview && (
        <div className="mt-4 justify-center flex items-center gap-2">
          <Button variant="bordered" onClick={() => setPreview(null)}>
            Remove Image
          </Button>
          {onSave && (
            <Button onClick={() => onSave(preview)}>
              {saveText ?? "Save"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadImage;
