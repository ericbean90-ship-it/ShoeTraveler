// 채용정보 페이지 — 마케팅 담당자 공고
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, MapPin, Clock, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "채용정보 | 신발여행자",
  description:
    "신발여행자와 함께할 마케팅 담당자를 모집합니다. 맘카페 운영 경력을 보유한 분을 환영합니다.",
};

const qualifications = [
  "마케팅·브랜드·콘텐츠 기획 관련 실무 경력 2년 이상",
  "맘카페 운영자 경력 (커뮤니티 운영 및 회원 소통 경험)",
  "SNS(인스타그램, 블로그 등) 채널 운영 및 콘텐츠 제작 경험",
  "육아·유아용품 시장에 대한 이해와 관심",
  "데이터 기반 마케팅 성과 분석 및 개선 경험",
  "원활한 커뮤니케이션 능력 및 팀 협업 경험",
];

const preferred = [
  "유아·육아 관련 스타트업 또는 이커머스 마케팅 경험",
  "인플루언서·커뮤니티 마케팅 캠페인 기획·운영 경험",
  "카피라이팅 및 기획서 작성 역량",
];

const responsibilities = [
  "브랜드 마케팅 전략 수립 및 실행",
  "맘카페·육아 커뮤니티 채널 운영 및 고객 소통",
  "SNS 콘텐츠 기획·제작 및 프로모션 캠페인 운영",
  "마케팅 성과 분석 및 개선안 도출",
];

export default function CareersPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="py-12 lg:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            홈으로 돌아가기
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground font-[family-name:var(--font-heading)] mb-3">
            채용정보
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            신발여행자와 함께 아이 신발의 두 번째 여행을 만들 동료를
            찾습니다.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                  <Briefcase className="w-3.5 h-3.5" />
                  채용 중
                </span>
              </div>
              <CardTitle className="text-2xl font-[family-name:var(--font-heading)]">
                마케팅 담당자
              </CardTitle>
              <CardDescription className="text-base">
                브랜드 마케팅 및 육아 커뮤니티 채널 운영을 담당합니다.
              </CardDescription>
              <div className="flex flex-wrap gap-4 pt-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  서울 강남 (재택·유연 근무 협의)
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  정규직
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3 font-[family-name:var(--font-heading)]">
                  주요 업무
                </h2>
                <ul className="space-y-2">
                  {responsibilities.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-muted-foreground text-sm leading-relaxed"
                    >
                      <span className="text-primary mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3 font-[family-name:var(--font-heading)]">
                  자격 요건
                </h2>
                <ul className="space-y-2">
                  {qualifications.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-muted-foreground text-sm leading-relaxed"
                    >
                      <span className="text-primary mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3 font-[family-name:var(--font-heading)]">
                  우대 사항
                </h2>
                <ul className="space-y-2">
                  {preferred.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-muted-foreground text-sm leading-relaxed"
                    >
                      <span className="text-primary mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  이력서와 포트폴리오를{" "}
                  <a
                    href="mailto:careers@kkomabalsik.com"
                    className="text-primary hover:underline"
                  >
                    careers@kkomabalsik.com
                  </a>
                  으로 보내주세요.
                </p>
                <Button asChild>
                  <a href="mailto:careers@kkomabalsik.com">지원하기</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  );
}
