"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

interface HeaderAuthProps {
  variant?: "desktop" | "mobile";
}

export function HeaderAuth({ variant = "desktop" }: HeaderAuthProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isDesktop = variant === "desktop";

  if (loading) {
    return isDesktop ? (
      <div className="hidden md:flex items-center gap-3">
        <div className="h-8 w-16 bg-muted animate-pulse rounded-md" />
      </div>
    ) : null;
  }

  if (user) {
    return isDesktop ? (
      <div className="hidden md:flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/memo">고객 게시판</Link>
        </Button>
        <form action={signOut}>
          <Button variant="outline" size="sm" type="submit">
            로그아웃
          </Button>
        </form>
      </div>
    ) : (
      <div className="flex flex-col gap-2 w-full">
        <Button variant="ghost" className="w-full justify-center" asChild>
          <Link href="/memo">고객 게시판</Link>
        </Button>
        <form action={signOut} className="w-full">
          <Button variant="outline" className="w-full" type="submit">
            로그아웃
          </Button>
        </form>
      </div>
    );
  }

  return isDesktop ? (
    <div className="hidden md:flex items-center gap-3">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/auth/login">로그인</Link>
      </Button>
      <Button size="sm" asChild>
        <Link href="/auth/signup">회원가입</Link>
      </Button>
    </div>
  ) : (
    <div className="flex flex-col gap-2 w-full">
      <Button variant="ghost" className="w-full justify-center" asChild>
        <Link href="/auth/login">로그인</Link>
      </Button>
      <Button className="w-full" asChild>
        <Link href="/auth/signup">회원가입</Link>
      </Button>
    </div>
  );
}
