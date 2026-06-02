"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signIn } from "@/app/actions/auth";
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

interface LoginFormProps {
  redirectTo?: string;
}

export function LoginForm({ redirectTo = "/memo" }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(
    async (_prev: AuthActionResult | null, formData: FormData) => {
      return (await signIn(formData)) ?? null;
    },
    null
  );

  return (
    <Card className="w-full max-w-md border-border/60 shadow-lg">
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          <BrandLogo />
        </div>
        <div>
          <CardTitle className="text-2xl font-[family-name:var(--font-heading)]">
            로그인
          </CardTitle>
          <CardDescription className="mt-2">
            신발여행자 계정으로 아이의 이야기를 기록해요
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="redirect" value={redirectTo} />

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
              placeholder="비밀번호를 입력하세요"
              required
              autoComplete="current-password"
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
            {pending ? "로그인 중..." : "로그인"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          아직 계정이 없으신가요?{" "}
          <Link
            href="/auth/signup"
            className="text-primary font-medium hover:underline"
          >
            회원가입
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
