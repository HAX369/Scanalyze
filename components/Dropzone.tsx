
import React, { useRef, useState } from 'react';

interface DropzoneProps {
  onUpload: (file: File) => void;
  disabled?: boolean;
}

const Dropzone: React.FC<DropzoneProps> = ({ onUpload, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onUpload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <div 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative border-2 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer
        ${isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-emerald-300'}
        ${disabled ? 'opacity-50 pointer-events-none' : ''}
      `}
      onClick={() => fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
      
      <div className="bg-emerald-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600 text-3xl">
        <i className="fa-solid fa-cloud-arrow-up"></i>
      </div>
      
      <h3 className="text-xl font-bold text-slate-800 mb-2">Click or drag image to upload</h3>
      <p className="text-slate-500 mb-8 max-w-xs mx-auto text-sm">
        Supports JPG, PNG, and HEIC labels. Ensure ingredients are clearly visible and well-lit.
      </p>
      
      <button className="px-8 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all inline-flex items-center space-x-2">
        <i className="fa-solid fa-camera"></i>
        <span>Take Photo</span>
      </button>
    </div>
  );
};

export default Dropzone;
