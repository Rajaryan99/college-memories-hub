
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PhotoUploadProps {
  category: string;
  onPhotoUploaded: (url: string) => void;
}

export const PhotoUpload = ({ category, onPhotoUploaded }: PhotoUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const uploadPhoto = async (file: File) => {
    try {
      setUploading(true);
      console.log('Starting upload for file:', file.name, 'to category:', category);
      
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${category}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      console.log('Generated filename:', fileName);
      
      // Upload file to Supabase storage
      const { data, error } = await supabase.storage
        .from('college_memories')
        .upload(fileName, file);

      if (error) {
        console.error('Storage upload error:', error);
        throw error;
      }

      console.log('File uploaded successfully:', data);

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('college_memories')
        .getPublicUrl(data.path);

      console.log('Generated public URL:', publicUrl);

      onPhotoUploaded(publicUrl);
      
      toast({
        title: "Success!",
        description: "Photo uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast({
        title: "Error",
        description: "Failed to upload photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name, file.type, file.size);
      uploadPhoto(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      console.log('File dropped:', file.name, file.type, file.size);
      uploadPhoto(file);
    }
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
        dragActive 
          ? 'border-purple-500 bg-purple-50' 
          : 'border-gray-300 hover:border-purple-400'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="space-y-4">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div>
          <p className="text-lg font-medium text-gray-700">
            Upload photos for {category}
          </p>
          <p className="text-sm text-gray-500">
            Drag and drop or click to select (JPG, PNG, GIF)
          </p>
        </div>
        <div>
          <Input
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
            id={`file-upload-${category}`}
          />
          <Button
            onClick={() => document.getElementById(`file-upload-${category}`)?.click()}
            disabled={uploading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {uploading ? 'Uploading...' : 'Choose Photo'}
          </Button>
        </div>
      </div>
    </div>
  );
};
