"use client";

import { Search, Plus, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { MemoCategory } from "@/lib/types/memo";

const categories = ["전체", "후기", "일상"] as const;

interface MemoHeaderProps {
  onCreateMemo: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: MemoCategory | "전체";
  onCategoryChange: (category: MemoCategory | "전체") => void;
  isLoggedIn: boolean;
}

export function MemoHeader({
  onCreateMemo,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  isLoggedIn,
}: MemoHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <MessageSquare className="w-5 h-5 text-primary" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-foreground tracking-tight">
                고객 게시판
              </h1>
              <p className="text-xs text-muted-foreground">
                신발여행자와 함께하는 이야기 · 후기와 일상
              </p>
            </div>
          </div>

          {isLoggedIn ? (
            <Button
              onClick={onCreateMemo}
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">글쓰기</span>
            </Button>
          ) : (
            <Button asChild className="rounded-xl">
              <Link href="/auth/login?redirect=/memo">로그인 후 글쓰기</Link>
            </Button>
          )}
        </div>

        <div className="pb-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="게시글 검색..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-background border-border rounded-xl h-11 focus-visible:ring-primary"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                  ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
