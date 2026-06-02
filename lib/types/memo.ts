// 고객 게시판 메모 타입 정의
export type MemoCategory = "후기" | "일상";
export type MemoVisibility = "private" | "public";

export interface Memo {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  category: MemoCategory;
  visibility: MemoVisibility;
  imageUrls: string[];
}

export interface MemoRow {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: MemoCategory;
  visibility: MemoVisibility;
  image_urls: string[];
  created_at: string;
  updated_at: string;
}

export interface MemoSaveInput {
  title: string;
  content: string;
  category: MemoCategory;
  visibility: MemoVisibility;
  existingImageUrls: string[];
  newImages: File[];
}

export function rowToMemo(row: MemoRow): Memo {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    content: row.content,
    category: row.category,
    visibility: row.visibility ?? "private",
    imageUrls: row.image_urls ?? [],
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}
