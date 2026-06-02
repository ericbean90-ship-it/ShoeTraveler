import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

interface LoginPageProps {
  searchParams: Promise<{ redirect?: string; error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const redirectTo = params.redirect ?? "/memo";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background">
      <Link
        href="/"
        className="mb-8 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← 신발여행자 홈으로
      </Link>
      {params.error === "auth_callback_failed" ? (
        <p className="mb-4 text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-lg max-w-md text-center leading-relaxed">
          이메일 인증 링크 처리에 실패했어요. 같은 브라우저에서 다시 시도하거나,
          아래에서 로그인해 주세요.
        </p>
      ) : params.error ? (
        <p className="mb-4 text-sm text-destructive">
          로그인에 실패했어요. 다시 시도해 주세요.
        </p>
      ) : null}
      <LoginForm redirectTo={redirectTo} />
    </div>
  );
}
