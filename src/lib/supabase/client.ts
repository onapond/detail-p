'use client';

import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function createBrowserSupabaseClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

// Storage bucket name for product images
export const IMAGES_BUCKET = 'product-images';

// Upload image to Supabase Storage
export async function uploadImage(file: File, path: string): Promise<string | null> {
  const supabase = createBrowserSupabaseClient();
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

// Generate a deterministic storage path for a product image
export function getImageStoragePath(userId: string, productId: string, filename: string): string {
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const timestamp = Date.now();
  return `${userId}/${productId}/${timestamp}_${safeName}`;
}

// Upload multiple product images in parallel, return metadata array
export async function uploadProductImages(
  userId: string,
  productId: string,
  images: Array<{ file: File; isMain: boolean; orderIndex: number }>
): Promise<Array<{ storagePath: string; publicUrl: string; isMain: boolean; orderIndex: number }>> {
  const results = await Promise.all(
    images.map(async (img) => {
      const storagePath = getImageStoragePath(userId, productId, img.file.name);
      const publicUrl = await uploadImage(img.file, storagePath);
      if (!publicUrl) throw new Error(`Failed to upload image: ${img.file.name}`);
      return {
        storagePath,
        publicUrl,
        isMain: img.isMain,
        orderIndex: img.orderIndex,
      };
    })
  );
  return results;
}

// Delete image from Supabase Storage
export async function deleteImage(path: string): Promise<boolean> {
  const supabase = createBrowserSupabaseClient();
  const { error } = await supabase.storage
    .from(IMAGES_BUCKET)
    .remove([path]);

  if (error) {
    console.error('Error deleting image:', error);
    return false;
  }

  return true;
}
