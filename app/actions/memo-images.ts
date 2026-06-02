"use server";

import { createClient } from "@/lib/supabase/server";

const BUCKET = "memo-images";
const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export async function uploadMemoImage(
  formData: FormData
): Promise<{ url?: string; error?: string }> {
  const file = formData.get("file");
  const memoId = formData.get("memoId");

  if (!(file instanceof File) || typeof memoId !== "string" || !memoId) {
    return { error: "업로드 정보가 올바르지 않아요." };
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return { error: "JPG, PNG, WebP, GIF 형식만 올릴 수 있어요." };
  }

  if (file.size > MAX_SIZE_BYTES) {
    return { error: "사진 한 장은 5MB 이하여야 해요." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "로그인이 필요해요." };
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${user.id}/${memoId}/${crypto.randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage.from(BUCKET).upload(path, buffer, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || "image/jpeg",
  });

  if (error) {
    return { error: error.message };
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl };
}

export async function deleteMemoImagesAction(
  imageUrls: string[]
): Promise<{ error?: string }> {
  if (!imageUrls.length) return {};

  const supabase = await createClient();
  const paths = imageUrls
    .map((url) => {
      const marker = `/storage/v1/object/public/${BUCKET}/`;
      const idx = url.indexOf(marker);
      if (idx === -1) return null;
      return decodeURIComponent(url.slice(idx + marker.length));
    })
    .filter((p): p is string => Boolean(p));

  if (paths.length === 0) return {};

  const { error } = await supabase.storage.from(BUCKET).remove(paths);
  if (error) return { error: error.message };
  return {};
}
