// Supabase Auth 에러 메시지 한국어 변환
export function formatAuthError(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("email not confirmed")) {
    return "이메일 인증이 완료되지 않았어요. 가입 시 받은 메일의 확인 링크를 눌러 주세요.";
  }
  if (lower.includes("invalid login credentials")) {
    return "이메일 또는 비밀번호가 맞지 않아요.";
  }
  if (lower.includes("user already registered")) {
    return "이미 가입된 이메일이에요. 로그인해 주세요.";
  }
  if (lower.includes("email address") && lower.includes("invalid")) {
    return "유효한 이메일 주소를 입력해 주세요. (Gmail, Naver 등 실제 사용하는 이메일)";
  }
  if (lower.includes("password") && lower.includes("least")) {
    return "비밀번호는 6자 이상이어야 해요.";
  }

  return message;
}

export type AuthActionResult = {
  error?: string;
  success?: boolean;
  message?: string;
};
