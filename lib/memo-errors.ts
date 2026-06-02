// 메모 CRUD Supabase 에러 한국어 변환
import type { PostgrestError } from "@supabase/supabase-js";

export function formatMemoError(error: PostgrestError, action: string): string {
  if (error.code === "PGRST205") {
    return "게시판 기능이 아직 DB에 설정되지 않았어요. Supabase SQL Editor에서 memos 테이블 마이그레이션을 실행해 주세요.";
  }
  if (error.code === "PGRST204" && error.message.includes("visibility")) {
    return "공개 설정 기능이 아직 DB에 설정되지 않았어요. Supabase SQL Editor에서 memo_public_board 마이그레이션을 실행해 주세요.";
  }
  if (error.code === "PGRST204" && error.message.includes("image_urls")) {
    return "사진 기능이 아직 DB에 설정되지 않았어요. Supabase SQL Editor에서 add_memo_images 마이그레이션을 실행해 주세요.";
  }
  if (error.code === "42501") {
    return "게시글을 저장할 권한이 없어요. 다시 로그인해 주세요.";
  }
  if (error.code === "PGRST116") {
    return `${action} 후 결과를 불러오지 못했어요.`;
  }

  return `${action}에 실패했어요. (${error.message})`;
}
