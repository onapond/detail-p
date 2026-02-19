import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // setAll is called from Server Component where cookies can't be set.
          // This is safe to ignore if middleware handles refresh.
        }
      },
    },
  });
}

// Storage bucket name for product images
export const IMAGES_BUCKET = 'product-images';

// Generate a deterministic storage path for a product image
export function getImageStoragePath(userId: string, productId: string, filename: string): string {
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const timestamp = Date.now();
  return `${userId}/${productId}/${timestamp}_${safeName}`;
}

// Upload image to Supabase Storage (server-side)
export async function uploadImage(file: File, path: string): Promise<string | null> {
  const supabase = await createServerSupabaseClient();
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

// Upload multiple product images in parallel, return metadata array (server-side)
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

// Delete image from Supabase Storage (server-side)
export async function deleteImage(path: string): Promise<boolean> {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.storage
    .from(IMAGES_BUCKET)
    .remove([path]);

  if (error) {
    console.error('Error deleting image:', error);
    return false;
  }

  return true;
}
