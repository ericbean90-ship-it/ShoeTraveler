// 메모 사진 클라이언트 헬퍼 (검증·서버 업로드 호출)
import { uploadMemoImage, deleteMemoImagesAction } from "@/app/actions/memo-images";

const MAX_IMAGES = 5;
const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export function validateImageFiles(files: File[] | undefined): string | null {
  const list = files ?? [];
  if (list.length > MAX_IMAGES) {
    return `사진은 최대 ${MAX_IMAGES}장까지 올릴 수 있어요.`;
  }
  for (const file of list) {
    if (!ALLOWED_TYPES.has(file.type)) {
      return "JPG, PNG, WebP, GIF 형식만 올릴 수 있어요.";
    }
    if (file.size > MAX_SIZE_BYTES) {
      return "사진 한 장은 5MB 이하여야 해요.";
    }
  }
  return null;
}

export async function uploadMemoImages(
  memoId: string,
  files: File[]
): Promise<string[]> {
  const urls: string[] = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("memoId", memoId);

    const result = await uploadMemoImage(formData);
    if (result.error || !result.url) {
      throw new Error(result.error ?? "사진 업로드에 실패했어요.");
    }
    urls.push(result.url);
  }

  return urls;
}

export async function deleteMemoImages(
  imageUrls: string[] | undefined
): Promise<{ error?: string }> {
  const list = imageUrls ?? [];
  if (list.length === 0) return {};
  return deleteMemoImagesAction(list);
}
