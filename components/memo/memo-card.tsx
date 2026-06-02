import type { Memo } from "@/lib/types/memo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, Sparkles, Star, Lock, Globe } from "lucide-react";

const categoryConfig: Record<
  Memo["category"],
  { icon: React.ReactNode; color: string; bg: string }
> = {
  후기: {
    icon: <Star className="w-3.5 h-3.5" />,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  일상: {
    icon: <Sparkles className="w-3.5 h-3.5" />,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
};

interface MemoCardProps {
  memo: Memo;
  onClick: () => void;
  isOwner?: boolean;
}

export function MemoCard({ memo, onClick, isOwner = false }: MemoCardProps) {
  const config = categoryConfig[memo.category];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <Card
      className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-border/60 bg-card overflow-hidden relative"
      onClick={onClick}
    >
      {memo.imageUrls?.length ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={memo.imageUrls[0]}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {memo.imageUrls.length > 1 ? (
            <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-background/90 text-xs font-medium shadow-sm">
              +{memo.imageUrls.length - 1}
            </span>
          ) : null}
        </div>
      ) : null}
      <CardHeader className="pb-2 space-y-3">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color} ${config.bg}`}
          >
            {config.icon}
            {memo.category}
          </span>
          {memo.visibility === "private" && isOwner ? (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-muted-foreground bg-muted">
              <Lock className="w-3 h-3" />
              비공개
            </span>
          ) : memo.visibility === "public" ? (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-primary bg-primary/10">
              <Globe className="w-3 h-3" />
              공개
            </span>
          ) : null}
        </div>
        <h3 className="font-semibold text-foreground text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {memo.title}
        </h3>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {memo.content}
        </p>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-2 border-t border-border/50">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formatDate(memo.createdAt)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
