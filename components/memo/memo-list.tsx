import type { Memo } from "@/lib/types/memo";
import { MemoCard } from "./memo-card";

interface MemoListProps {
  memos: Memo[];
  currentUserId: string | null;
  onSelectMemo: (memo: Memo) => void;
}

export function MemoList({ memos, currentUserId, onSelectMemo }: MemoListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          총{" "}
          <span className="font-medium text-foreground">{memos.length}</span>
          개의 게시글
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {memos.map((memo) => (
          <MemoCard
            key={memo.id}
            memo={memo}
            isOwner={currentUserId === memo.userId}
            onClick={() => onSelectMemo(memo)}
          />
        ))}
      </div>
    </div>
  );
}
