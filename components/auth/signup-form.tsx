"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signUp } from "@/app/actions/auth";
import type { AuthActionResult } from "@/lib/auth-errors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BrandLogo } from "@/components/brand-logo";

export function SignUpForm() {
  const [state, formAction, pending] = useActionState(
    async (_prev: AuthActionResult | null, formData: FormData) => {
      return (await signUp(formData)) ?? null;
    },
    null
  );

  if (state?.success) {
    return (
      <Card className="w-full max-w-md border-border/60 shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <BrandLogo />
          </div>
          <div>
            <CardTitle className="text-2xl font-[family-name:var(--font-heading)]">
              이메일을 확인해 주세요
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-foreground bg-primary/10 px-4 py-3 rounded-lg leading-relaxed">
            {state.message}
          </p>
          <Button className="w-full h-11 rounded-xl" asChild>
            <Link href="/auth/login">로그인 페이지로</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md border-border/60 shadow-lg">
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          <BrandLogo />
        </div>
        <div>
          <CardTitle className="text-2xl font-[family-name:var(--font-heading)]">
            회원가입
          </CardTitle>
          <CardDescription className="mt-2">
            아이의 소중한 순간을 기록할 계정을 만들어요
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@gmail.com"
              required
              autoComplete="email"
              className="h-11 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="6자 이상 입력하세요"
              required
              autoComplete="new-password"
              minLength={6}
              className="h-11 rounded-xl"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
              {state.error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full h-11 rounded-xl"
            disabled={pending}
          >
            {pending ? "가입 중..." : "회원가입"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          이미 계정이 있으신가요?{" "}
          <Link
            href="/auth/login"
            className="text-primary font-medium hover:underline"
          >
            로그인
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
