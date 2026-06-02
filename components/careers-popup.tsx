// 첫 화면 채용공고 팝업 — 하루 보지 않기 지원
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const STORAGE_KEY = "careers-popup-hidden-until";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function shouldShowPopup(): boolean {
  if (typeof window === "undefined") return false;

  const hiddenUntil = localStorage.getItem(STORAGE_KEY);
  if (!hiddenUntil) return true;

  return Date.now() > Number(hiddenUntil);
}

export function CareersPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(shouldShowPopup());
  }, []);

  const hideForOneDay = () => {
    localStorage.setItem(STORAGE_KEY, String(Date.now() + ONE_DAY_MS));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
              <Briefcase className="w-3.5 h-3.5" />
              채용 공고
            </span>
          </div>
          <DialogTitle className="text-xl font-[family-name:var(--font-heading)]">
            마케팅 담당자 채용
          </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-3 text-sm text-muted-foreground text-left pt-1">
              <p>
                신발여행자에서 브랜드 마케팅과 육아 커뮤니티 채널 운영을
                담당할 <strong className="text-foreground">마케팅 담당자</strong>
                를 모집합니다.
              </p>
              <ul className="space-y-1.5">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  정규직 · 서울 강남 (재택·유연 근무 협의)
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  마케팅 실무 2년 이상, SNS·콘텐츠 기획 경험
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <strong className="text-foreground">맘카페 운영자 경력</strong>{" "}
                  보유자 우대
                </li>
              </ul>
              <p className="text-xs pt-1 border-t border-border">
                자세한 업무 내용·자격 요건·지원 방법은{" "}
                <Link href="/careers" className="text-primary hover:underline">
                  채용정보
                </Link>
                페이지를 참고해 주세요.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col sm:flex-col gap-2">
          <Button asChild className="w-full">
            <Link href="/careers" onClick={() => setOpen(false)}>
              채용정보 보기
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full text-muted-foreground"
            onClick={hideForOneDay}
          >
            하루 보지 않기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
