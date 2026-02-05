import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Storage bucket name for product images
export const IMAGES_BUCKET = 'product-images';

// Upload image to Supabase Storage
export async function uploadImage(file: File, path: string): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from(IMAGES_BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }

  const { data: urlData } = supabase.storage
    .from(IMAGES_BUCKET)
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

// Delete image from Supabase Storage
export async function deleteImage(path: string): Promise<boolean> {
  const { error } = await supabase.storage
    .from(IMAGES_BUCKET)
    .remove([path]);

  if (error) {
    console.error('Error deleting image:', error);
    return false;
  }

  return true;
}
