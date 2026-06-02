import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>친환경 중고 신발 거래 플랫폼</span>
            </div>

            <h1 className="text-xl sm:text-[1.35rem] md:text-2xl lg:text-[1.625rem] font-bold text-foreground leading-relaxed mb-6 font-[family-name:var(--font-heading)]">
              거의 새 신발, 버리거나 쌓아두지 마세요.
              <br />
              아이에게 헐렁한 신발 신기지도 마세요.
              <br />
              지금 신발을 여행보내고,
              <br />
              딱 맞는 여행자를 맞이하세요. 그리고,
              <br />
              <span className="text-primary">
                우리 아이에게 깨끗한 환경을 선물하세요.
              </span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              사진 한 장만 올리면 됩니다. 매칭, 정산, 이력 관리까지 — 나머지는
              신발여행자가 합니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="gap-2">
                신발 보내러 가기
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline">
                서비스 둘러보기
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
              <div className="text-center lg:text-left">
                <div className="text-2xl mb-1">🧺</div>
                <div className="font-bold text-foreground text-sm md:text-base font-[family-name:var(--font-heading)]">
                  올리면 알아서 팔린다
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  사진 한 장이면 AI가 설명까지 써줍니다
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl mb-1">✈️</div>
                <div className="font-bold text-foreground text-sm md:text-base font-[family-name:var(--font-heading)]">
                  신발이 여행을 떠납니다
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  이제 다른 아이를 찾는 여행을 보내세요
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl mb-1">🌱</div>
                <div className="font-bold text-foreground text-sm md:text-base font-[family-name:var(--font-heading)]">
                  더 깨끗한 지구를 선물합니다
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  신발 1켤레 순환 = CO₂ 8.5kg 절감
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative">
            <div className="relative bg-card rounded-3xl p-8 shadow-xl border border-border">
              {/* Phone mockup */}
              <div className="aspect-[3/4] bg-secondary rounded-2xl overflow-hidden relative">
                {/* App preview illustration */}
                <div className="absolute inset-0 flex flex-col">
                  {/* Status bar */}
                  <div className="h-8 bg-primary/10 flex items-center justify-center">
                    <div className="w-20 h-1 bg-foreground/20 rounded-full" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 space-y-4">
                    {/* Search bar */}
                    <div className="bg-card rounded-xl p-3 shadow-sm border border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-muted" />
                        <div className="h-3 bg-muted rounded flex-1" />
                      </div>
                    </div>

                    {/* Product cards */}
                    <div className="grid grid-cols-2 gap-3">
                      {[1, 2, 3, 4].map((item) => (
                        <div
                          key={item}
                          className="bg-card rounded-xl p-3 shadow-sm border border-border"
                        >
                          <div className="aspect-square bg-accent/30 rounded-lg mb-2 flex items-center justify-center text-2xl">
                            👟
                          </div>
                          <div className="h-2 bg-muted rounded w-3/4 mb-1" />
                          <div className="h-2 bg-primary/30 rounded w-1/2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                🌱 친환경
              </div>
              <div className="absolute -bottom-4 -left-4 bg-card text-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-border">
                💰 최대 70% 절약
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
