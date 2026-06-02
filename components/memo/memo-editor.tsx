"use client";

import { useState, useEffect, useRef } from "react";
import type {
  Memo,
  MemoCategory,
  MemoSaveInput,
  MemoVisibility,
} from "@/lib/types/memo";
import { validateImageFiles } from "@/lib/memo-storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ArrowLeft,
  Save,
  Trash2,
  Star,
  Sparkles,
  ImagePlus,
  X,
  Lock,
  Globe,
} from "lucide-react";

const categories: {
  value: MemoCategory;
  label: string;
  icon: React.ReactNode;
}[] = [
  { value: "후기", label: "후기", icon: <Star className="w-4 h-4" /> },
  { value: "일상", label: "일상", icon: <Sparkles className="w-4 h-4" /> },
];

const visibilityOptions: {
  value: MemoVisibility;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "public",
    label: "공개",
    description: "모든 방문자가 볼 수 있어요",
    icon: <Globe className="w-4 h-4" />,
  },
  {
    value: "private",
    label: "비공개",
    description: "나만 볼 수 있어요",
    icon: <Lock className="w-4 h-4" />,
  },
];

interface PendingImage {
  id: string;
  file: File;
  previewUrl: string;
}

interface MemoEditorProps {
  memo: Memo | null;
  readOnly?: boolean;
  onSave: (input: MemoSaveInput) => void;
  onCancel: () => void;
  onDelete?: () => void;
  saving?: boolean;
}

export function MemoEditor({
  memo,
  readOnly = false,
  onSave,
  onCancel,
  onDelete,
  saving = false,
}: MemoEditorProps) {
  const [title, setTitle] = useState(memo?.title || "");
  const [content, setContent] = useState(memo?.content || "");
  const [category, setCategory] = useState<MemoCategory>(
    memo?.category || "일상"
  );
  const [visibility, setVisibility] = useState<MemoVisibility>(
    memo?.visibility ?? "public"
  );
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>(
    memo?.imageUrls ?? []
  );
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (memo) {
      setTitle(memo.title);
      setContent(memo.content);
      setCategory(memo.category);
      setVisibility(memo.visibility);
      setExistingImageUrls(memo.imageUrls ?? []);
    }
  }, [memo]);

  useEffect(() => {
    return () => {
      pendingImages.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    };
  }, [pendingImages]);

  const totalImages = existingImageUrls.length + pendingImages.length;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";

    if (files.length === 0) return;

    if (totalImages + files.length > 5) {
      setImageError("사진은 최대 5장까지 올릴 수 있어요.");
      return;
    }

    const validationError = validateImageFiles(files);
    if (validationError) {
      setImageError(validationError);
      return;
    }

    setImageError(null);
    setPendingImages((prev) => [
      ...prev,
      ...files.map((file) => ({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
      })),
    ]);
  };

  const removeExistingImage = (url: string) => {
    if (readOnly) return;
    setExistingImageUrls((prev) => prev.filter((u) => u !== url));
  };

  const removePendingImage = (id: string) => {
    if (readOnly) return;
    setPendingImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((img) => img.id !== id);
    });
  };

  const handleSave = () => {
    if (readOnly || !title.trim() || !content.trim()) return;
    onSave({
      title,
      content,
      category,
      visibility,
      existingImageUrls,
      newImages: pendingImages.map((img) => img.file),
    });
  };

  const isValid = title.trim() && content.trim();

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-border/60 shadow-sm bg-card">
        <CardHeader className="border-b border-border/50 pb-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onCancel}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">목록으로</span>
            </button>

            {!readOnly && (
              <div className="flex items-center gap-2">
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    disabled={saving}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  onClick={handleSave}
                  disabled={!isValid || saving}
                  className="gap-2 bg-primary hover:bg-primary/90 rounded-xl"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "저장 중..." : "저장하기"}
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              공개 설정
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {visibilityOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  disabled={readOnly || saving}
                  onClick={() => setVisibility(opt.value)}
                  className={`
                    flex flex-col items-start gap-1 p-4 rounded-xl text-left transition-all border
                    ${
                      visibility === opt.value
                        ? "border-primary bg-primary/5"
                        : "border-border bg-secondary/30 hover:bg-secondary/50"
                    }
                    ${readOnly ? "cursor-default opacity-90" : ""}
                  `}
                >
                  <span className="flex items-center gap-2 text-sm font-medium">
                    {opt.icon}
                    {opt.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {opt.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              카테고리
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  disabled={readOnly || saving}
                  onClick={() => setCategory(cat.value)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
                    ${
                      category === cat.value
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }
                    ${readOnly ? "cursor-default" : ""}
                  `}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">제목</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              readOnly={readOnly}
              className="h-12 text-lg bg-background border-border rounded-xl focus-visible:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">내용</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="신발여행자 이용 후기나 일상 이야기를 남겨 주세요"
              rows={10}
              readOnly={readOnly}
              className="bg-background border-border rounded-xl resize-none focus-visible:ring-primary leading-relaxed"
            />
          </div>

          {(totalImages > 0 || !readOnly) && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">
                  사진
                </label>
                {!readOnly && (
                  <span className="text-xs text-muted-foreground">
                    {totalImages}/5 · JPG, PNG, WebP, GIF · 5MB 이하
                  </span>
                )}
              </div>

              {totalImages > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {existingImageUrls.map((url) => (
                    <div
                      key={url}
                      className="relative aspect-square rounded-xl overflow-hidden border border-border/60 bg-muted"
                    >
                      <img
                        src={url}
                        alt="첨부 사진"
                        className="w-full h-full object-cover"
                      />
                      {!readOnly && (
                        <button
                          type="button"
                          onClick={() => removeExistingImage(url)}
                          disabled={saving}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/90 flex items-center justify-center shadow-sm hover:bg-background"
                          aria-label="사진 삭제"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {pendingImages.map((img) => (
                    <div
                      key={img.id}
                      className="relative aspect-square rounded-xl overflow-hidden border border-border/60 bg-muted"
                    >
                      <img
                        src={img.previewUrl}
                        alt="새 사진 미리보기"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePendingImage(img.id)}
                        disabled={saving}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/90 flex items-center justify-center shadow-sm hover:bg-background"
                        aria-label="사진 삭제"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {!readOnly && totalImages < 5 && (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-11 rounded-xl gap-2"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={saving}
                  >
                    <ImagePlus className="w-4 h-4" />
                    사진 추가하기
                  </Button>
                </>
              )}

              {imageError && (
                <p className="text-sm text-destructive">{imageError}</p>
              )}
            </div>
          )}

          {!readOnly && (
            <div className="text-right">
              <span className="text-xs text-muted-foreground">
                {content.length}자
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-sm w-full shadow-xl">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground">
                  게시글을 삭제할까요?
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  삭제된 글은 복구할 수 없어요
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 rounded-xl"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  취소
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1 rounded-xl"
                  onClick={() => {
                    onDelete?.();
                    setShowDeleteConfirm(false);
                  }}
                  disabled={saving}
                >
                  삭제
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
