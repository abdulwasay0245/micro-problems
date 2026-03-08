'use client';
import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';

export default function ImageUpload({ onUpload }: { onUpload: (url: string) => void }) {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div>
      <CldUploadWidget
        uploadPreset="micro_problems"
        onSuccess={(result: any) => {
          const url = result.info.secure_url;
          setPreview(url);
          onUpload(url);
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:border-green-900 hover:text-green-900 transition"
          >
            {preview ? '🔄 Change Image' : '📷 Upload Image'}
          </button>
        )}
      </CldUploadWidget>

      {/* Preview */}
      {preview && (
        <div className="mt-3 relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-xl"
          />
          <span className="absolute top-2 right-2 bg-green-900 text-white text-xs px-2 py-1 rounded-full">
            ✅ Uploaded
          </span>
        </div>
      )}
    </div>
  );
}