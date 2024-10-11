// ImageUploader.tsx
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
  onUpload: (imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file: File) => {
        const reader = new FileReader();

        reader.onload = () => {
          const binaryStr = reader.result as string;
          onUpload(binaryStr);
        };
        reader.readAsDataURL(file);
      });
    },
    [onUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="p-4 border-dashed border-2 border-gray-400 text-center cursor-pointer mb-4"
    >
      <input {...getInputProps()} />
      <p>Drag 'n' drop an image here, or click to select one</p>
    </div>
  );
};

export default ImageUploader;
