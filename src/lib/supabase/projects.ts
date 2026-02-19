import { createServerSupabaseClient } from './server';
import type {
  Project,
  ProjectListItem,
  CreateProjectInput,
  SaveGenerationInput,
  ProjectImage,
  CopywritingResult,
} from '@/types';

/**
 * Create a new product record
 */
export async function createProduct(
  userId: string,
  input: CreateProjectInput
): Promise<{ id: string }> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('products')
    .insert({
      user_id: userId,
      name: input.name,
      display_name: input.displayName || input.name,
      category: input.category,
      analysis: input.analysis,
    })
    .select('id')
    .single();

  if (error) throw new Error(`Failed to create product: ${error.message}`);
  return { id: data.id };
}

/**
 * Get a full project by ID (product + generated_page + images)
 * Uses Supabase JOIN to fetch all data in a single query.
 */
export async function getProjectById(projectId: string): Promise<Project | null> {
  const supabase = await createServerSupabaseClient();

  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      generated_pages!generated_pages_product_id_fkey(
        id, template_id, copywriting, html_content, status, created_at, updated_at
      ),
      product_images!product_images_product_id_fkey(
        id, product_id, storage_path, public_url, is_main, order_index, created_at
      )
    `)
    .eq('id', projectId)
    .eq('is_deleted', false)
    .single();

  if (error || !product) return null;

  const pages = product.generated_pages as Array<{
    id: string; template_id: string; copywriting: CopywritingResult | null;
    html_content: string | null; status: 'draft' | 'published' | 'archived';
    created_at: string; updated_at: string;
  }> | null;

  // Pick the most recent generated page
  const latestPage = pages && pages.length > 0
    ? pages.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
    : null;

  const images = product.product_images as Array<{
    id: string; product_id: string; storage_path: string;
    public_url: string; is_main: boolean; order_index: number; created_at: string;
  }> | null;

  // Sort images by order_index
  const sortedImages = (images || []).sort((a, b) => a.order_index - b.order_index);

  return {
    id: product.id,
    userId: product.user_id,
    name: product.name,
    displayName: product.display_name,
    category: product.category,
    analysis: product.analysis,
    createdAt: product.created_at,
    updatedAt: product.updated_at,
    page: latestPage
      ? {
          id: latestPage.id,
          templateId: latestPage.template_id,
          copywriting: latestPage.copywriting,
          htmlContent: latestPage.html_content,
          status: latestPage.status,
          createdAt: latestPage.created_at,
          updatedAt: latestPage.updated_at,
        }
      : null,
    images: sortedImages.map((img) => ({
      id: img.id,
      productId: img.product_id,
      storagePath: img.storage_path,
      publicUrl: img.public_url,
      isMain: img.is_main,
      orderIndex: img.order_index,
      createdAt: img.created_at,
    })),
  };
}

/**
 * List projects with pagination (excludes html_content for performance)
 */
export async function listProjects(
  userId: string,
  page: number = 1,
  limit: number = 12
): Promise<{ items: ProjectListItem[]; total: number }> {
  const supabase = await createServerSupabaseClient();
  const offset = (page - 1) * limit;

  // Get total count
  const { count } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('is_deleted', false);

  // Get paginated products with latest page status and main image
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      id, name, display_name, category, created_at, updated_at,
      generated_pages!generated_pages_product_id_fkey(status),
      product_images!product_images_product_id_fkey(public_url, is_main)
    `)
    .eq('user_id', userId)
    .eq('is_deleted', false)
    .order('updated_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw new Error(`Failed to list projects: ${error.message}`);

  const items: ProjectListItem[] = (products || []).map((p) => {
    const pages = p.generated_pages as Array<{ status: string }> | null;
    const images = p.product_images as Array<{ public_url: string; is_main: boolean }> | null;
    const mainImage = images?.find((img) => img.is_main) || images?.[0];

    return {
      id: p.id,
      name: p.name,
      displayName: p.display_name,
      category: p.category,
      status: pages?.[0]?.status as ProjectListItem['status'] ?? null,
      thumbnailUrl: mainImage?.public_url || null,
      createdAt: p.created_at,
      updatedAt: p.updated_at,
    };
  });

  return { items, total: count || 0 };
}

/**
 * Update a product record
 */
export async function updateProduct(
  projectId: string,
  updates: { displayName?: string; analysis?: Record<string, unknown> }
): Promise<void> {
  const supabase = await createServerSupabaseClient();

  const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (updates.displayName !== undefined) updateData.display_name = updates.displayName;
  if (updates.analysis !== undefined) updateData.analysis = updates.analysis;

  const { error } = await supabase
    .from('products')
    .update(updateData)
    .eq('id', projectId);

  if (error) throw new Error(`Failed to update product: ${error.message}`);
}

/**
 * Soft delete a product
 */
export async function softDeleteProduct(projectId: string): Promise<void> {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from('products')
    .update({
      is_deleted: true,
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', projectId);

  if (error) throw new Error(`Failed to delete product: ${error.message}`);
}

/**
 * Save (upsert) a generated page for a product
 */
export async function saveGeneratedPage(
  userId: string,
  productId: string,
  input: SaveGenerationInput
): Promise<{ id: string }> {
  const supabase = await createServerSupabaseClient();

  // Check if a page already exists for this product
  const { data: existing } = await supabase
    .from('generated_pages')
    .select('id')
    .eq('product_id', productId)
    .limit(1)
    .single();

  if (existing) {
    // Update existing page
    const { error } = await supabase
      .from('generated_pages')
      .update({
        template_id: input.templateId,
        copywriting: input.copywriting,
        html_content: input.htmlContent,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existing.id);

    if (error) throw new Error(`Failed to update generated page: ${error.message}`);
    return { id: existing.id };
  } else {
    // Insert new page
    const { data, error } = await supabase
      .from('generated_pages')
      .insert({
        user_id: userId,
        product_id: productId,
        template_id: input.templateId,
        copywriting: input.copywriting,
        html_content: input.htmlContent,
      })
      .select('id')
      .single();

    if (error) throw new Error(`Failed to save generated page: ${error.message}`);
    return { id: data.id };
  }
}

/**
 * Save product images metadata
 */
export async function saveProductImages(
  productId: string,
  images: Array<{ storagePath: string; publicUrl: string; isMain: boolean; orderIndex: number }>
): Promise<void> {
  const supabase = await createServerSupabaseClient();

  const rows = images.map((img) => ({
    product_id: productId,
    storage_path: img.storagePath,
    public_url: img.publicUrl,
    is_main: img.isMain,
    order_index: img.orderIndex,
  }));

  const { error } = await supabase.from('product_images').insert(rows);

  if (error) throw new Error(`Failed to save product images: ${error.message}`);
}

/**
 * Delete product images (DB records + Storage files)
 */
export async function deleteProductImages(productId: string): Promise<void> {
  const supabase = await createServerSupabaseClient();

  // Get existing image paths
  const { data: images } = await supabase
    .from('product_images')
    .select('storage_path')
    .eq('product_id', productId);

  if (images && images.length > 0) {
    // Delete from Storage
    const paths = images.map((img) => img.storage_path);
    await supabase.storage.from('product-images').remove(paths);

    // Delete DB records
    await supabase.from('product_images').delete().eq('product_id', productId);
  }
}

/**
 * Log a generation action for analytics
 */
export async function logGenerationAction(
  userId: string,
  action: string,
  metadata?: Record<string, unknown>,
  productId?: string,
  pageId?: string
): Promise<void> {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.from('generation_history').insert({
    user_id: userId,
    action,
    metadata: metadata || null,
    product_id: productId || null,
    page_id: pageId || null,
  });

  if (error) {
    // Log but don't throw — history logging is non-critical
    console.error('Failed to log generation action:', error.message);
  }
}
