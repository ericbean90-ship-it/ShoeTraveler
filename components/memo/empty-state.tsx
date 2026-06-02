import { MessageSquare, PenLine, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  hasSearch: boolean;
  isLoggedIn: boolean;
  onCreateMemo: () => void;
}

export function EmptyState({
  hasSearch,
  isLoggedIn,
  onCreateMemo,
}: EmptyStateProps) {
  if (hasSearch) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
          <Search className="w-7 h-7 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          검색 결과가 없어요
        </h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          다른 검색어나 카테고리로 찾아보세요
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <MessageSquare className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        아직 게시글이 없어요
      </h3>
      <p className="text-muted-foreground text-sm max-w-sm mb-8 leading-relaxed">
        신발여행자 이용 후기나 일상 이야기를
        <br />
        공개 또는 비공개로 남겨 보세요.
      </p>
      {isLoggedIn ? (
        <Button
          onClick={onCreateMemo}
          size="lg"
          className="gap-2 bg-primary hover:bg-primary/90 rounded-xl shadow-md"
        >
          <PenLine className="w-4 h-4" />
          첫 글 작성하기
        </Button>
      ) : (
        <Button asChild size="lg" className="rounded-xl">
          <Link href="/auth/login?redirect=/memo">로그인 후 글쓰기</Link>
        </Button>
      )}
    </div>
  );
}
