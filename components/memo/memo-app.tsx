"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { MemoHeader } from "@/components/memo/memo-header";
import { MemoList } from "@/components/memo/memo-list";
import { MemoEditor } from "@/components/memo/memo-editor";
import { EmptyState } from "@/components/memo/empty-state";
import {
  type Memo,
  type MemoCategory,
  type MemoRow,
  type MemoSaveInput,
  rowToMemo,
} from "@/lib/types/memo";
import { formatMemoError } from "@/lib/memo-errors";
import {
  deleteMemoImages,
  uploadMemoImages,
  validateImageFiles,
} from "@/lib/memo-storage";

export function MemoApp() {
  const router = useRouter();
  const [memos, setMemos] = useState<Memo[]>([]);
  const [selectedMemo, setSelectedMemo] = useState<Memo | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    MemoCategory | "전체"
  >("전체");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setCurrentUserId(user?.id ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUserId(session?.user?.id ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const fetchMemos = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from("memos")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(formatMemoError(fetchError, "게시글 불러오기"));
      setLoading(false);
      return;
    }

    setMemos((data as MemoRow[]).map(rowToMemo));
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchMemos();
  }, [fetchMemos]);

  const filteredMemos = memos.filter((memo) => {
    const matchesSearch =
      memo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memo.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "전체" || memo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateMemo = () => {
    if (!currentUserId) {
      router.push("/auth/login?redirect=/memo");
      return;
    }
    setSelectedMemo(null);
    setIsCreating(true);
  };

  const handleSelectMemo = (memo: Memo) => {
    setSelectedMemo(memo);
    setIsCreating(false);
  };

  const isOwner =
    isCreating || !selectedMemo || selectedMemo.userId === currentUserId;

  const handleSaveMemo = async (input: MemoSaveInput) => {
    setSaving(true);
    setError(null);

    const imageValidation = validateImageFiles(input.newImages);
    if (imageValidation) {
      setError(imageValidation);
      setSaving(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("로그인이 필요해요.");
      setSaving(false);
      return;
    }

    try {
      if (selectedMemo) {
        const removedUrls = (selectedMemo.imageUrls ?? []).filter(
          (url) => !(input.existingImageUrls ?? []).includes(url)
        );

        const memoId = selectedMemo.id;
        let imageUrls = [...(input.existingImageUrls ?? [])];

        if (input.newImages.length > 0) {
          const uploaded = await uploadMemoImages(memoId, input.newImages);
          imageUrls = [...imageUrls, ...uploaded];
        }

        const { data, error: updateError } = await supabase
          .from("memos")
          .update({
            title: input.title,
            content: input.content,
            category: input.category,
            visibility: input.visibility,
            image_urls: imageUrls,
          })
          .eq("id", memoId)
          .select()
          .single();

        if (updateError) {
          setError(formatMemoError(updateError, "수정"));
          setSaving(false);
          return;
        }

        if (removedUrls.length > 0) {
          const { error: storageError } = await deleteMemoImages(removedUrls);
          if (storageError) {
            setError(
              `수정은 저장됐지만 일부 사진 삭제에 실패했어요. (${storageError})`
            );
          }
        }

        setMemos((prev) =>
          prev.map((m) =>
            m.id === selectedMemo.id ? rowToMemo(data as MemoRow) : m
          )
        );
      } else {
        const { data, error: insertError } = await supabase
          .from("memos")
          .insert({
            title: input.title,
            content: input.content,
            category: input.category,
            visibility: input.visibility,
            user_id: user.id,
            image_urls: [],
          })
          .select()
          .single();

        if (insertError) {
          setError(formatMemoError(insertError, "저장"));
          setSaving(false);
          return;
        }

        let savedMemo = rowToMemo(data as MemoRow);

        if (input.newImages.length > 0) {
          const uploaded = await uploadMemoImages(
            savedMemo.id,
            input.newImages
          );

          const { data: updated, error: imageUpdateError } = await supabase
            .from("memos")
            .update({ image_urls: uploaded })
            .eq("id", savedMemo.id)
            .select()
            .single();

          if (imageUpdateError) {
            setError(formatMemoError(imageUpdateError, "사진 저장"));
            setSaving(false);
            return;
          }

          savedMemo = rowToMemo(updated as MemoRow);
        }

        setMemos((prev) => [savedMemo, ...prev]);
      }

      setSelectedMemo(null);
      setIsCreating(false);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했어요.";
      setError(`사진 업로드에 실패했어요. (${message})`);
    }

    setSaving(false);
  };

  const handleDeleteMemo = async (id: string) => {
    setSaving(true);
    setError(null);

    const target = memos.find((m) => m.id === id);

    try {
      const { error: deleteError } = await supabase
        .from("memos")
        .delete()
        .eq("id", id);

      if (deleteError) {
        setError(formatMemoError(deleteError, "삭제"));
        return;
      }

      setMemos((prev) => prev.filter((m) => m.id !== id));
      setSelectedMemo(null);
      setIsCreating(false);

      if ((target?.imageUrls?.length ?? 0) > 0) {
        const { error: storageError } = await deleteMemoImages(
          target!.imageUrls
        );
        if (storageError) {
          setError(
            `게시글은 삭제됐지만 사진 정리에 실패했어요. (${storageError})`
          );
        }
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했어요.";
      setError(`삭제 중 문제가 발생했어요. (${message})`);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setSelectedMemo(null);
    setIsCreating(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MemoHeader
        onCreateMemo={handleCreateMemo}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        isLoggedIn={Boolean(currentUserId)}
      />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {error && (
          <p className="mb-4 text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-lg">
            {error}
          </p>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-muted-foreground">불러오는 중...</p>
          </div>
        ) : isCreating || selectedMemo ? (
          <MemoEditor
            memo={isCreating ? null : selectedMemo}
            readOnly={Boolean(selectedMemo && !isOwner)}
            onSave={handleSaveMemo}
            onCancel={handleCancel}
            onDelete={
              selectedMemo && isOwner
                ? () => handleDeleteMemo(selectedMemo.id)
                : undefined
            }
            saving={saving}
          />
        ) : filteredMemos.length > 0 ? (
          <MemoList
            memos={filteredMemos}
            currentUserId={currentUserId}
            onSelectMemo={handleSelectMemo}
          />
        ) : (
          <EmptyState
            hasSearch={searchQuery !== "" || selectedCategory !== "전체"}
            isLoggedIn={Boolean(currentUserId)}
            onCreateMemo={handleCreateMemo}
          />
        )}
      </main>
    </div>
  );
}
