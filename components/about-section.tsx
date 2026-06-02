import { Recycle, Leaf } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image/Visual */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Main visual card */}
              <div className="col-span-2 bg-secondary rounded-3xl p-8 relative overflow-hidden">
                <div className="flex items-center justify-center gap-8">
                  <div className="text-center">
                    <div className="text-6xl mb-2">👶</div>
                    <p className="text-sm text-muted-foreground">0세~3세</p>
                  </div>
                  <div className="text-4xl">→</div>
                  <div className="text-center">
                    <div className="text-6xl mb-2">👟</div>
                    <p className="text-sm text-muted-foreground">전용 플랫폼</p>
                  </div>
                </div>
              </div>

              <div className="bg-background rounded-2xl p-6 border border-border">
                <Recycle className="w-8 h-8 text-primary mb-3" />
                <div className="text-lg font-bold text-foreground font-[family-name:var(--font-heading)]">
                  신발에게 두 번째 아이를
                </div>
                <p className="text-sm text-muted-foreground">
                  작아진 신발이 꼭 맞는 아이를 찾아갑니다
                </p>
              </div>

              <div className="bg-background rounded-2xl p-6 border border-border">
                <Leaf className="w-8 h-8 text-primary mb-3" />
                <div className="text-lg font-bold text-foreground font-[family-name:var(--font-heading)]">
                  더 깨끗한 지구를 선물하는 소비
                </div>
                <p className="text-sm text-muted-foreground">
                  1켤레 순환 = CO₂ 8.5kg 절감
                </p>
              </div>

              <div className="col-span-2 bg-background rounded-2xl p-6 border border-border">
                <span className="text-2xl mb-3 block">✈️</span>
                <div className="text-lg font-bold text-foreground font-[family-name:var(--font-heading)]">
                  신발 여권 — 여행 이력이 남습니다
                </div>
                <p className="text-sm text-muted-foreground">
                  어느 아이에게 갔는지, 얼마나 잘 돌봐졌는지 기록됩니다
                </p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              서비스 소개
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-[family-name:var(--font-heading)] text-balance">
              돌 전엔 두 달, 두 살엔 석 달 —
              <br />
              아이 신발은 늘 빨리 작아집니다
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                아이가 어릴수록 발이 빨리 자랍니다. 갓 돌이 지난 아이는 두 달이면
                사이즈가 바뀌고, 두세 살이 되어도 석 달을 버티기가 어렵습니다.
                밑창은 멀쩡한데, 꼭 맞는 기간은 너무 짧습니다.
              </p>
              <p>
                그렇다고 <strong className="text-foreground">당근마켓</strong>
                에 올리자니 — 사진 찍고, 흥정하고, 직거래까지. 바쁜 육아 중에 그
                수고를 감수하기란 쉽지 않습니다. 신발여행자는{" "}
                <strong className="text-foreground">사진 한 장이면 끝</strong>
                입니다. 팔리는 건 플랫폼이 합니다.
              </p>
              <p>
                내 아이가 신던 신발이 다른 아이에게 꼭 맞는 신발이 됩니다.
                가구당 연 20~30만원의 손실을 줄이고, 신발 한 켤레가 버려질 때마다
                나오는 9kg의 탄소도 함께 줄입니다.
              </p>
            </div>

            {/* Mission statement */}
            <div className="mt-8 p-6 bg-secondary rounded-2xl border-l-4 border-primary">
              <p className="text-foreground font-medium italic">
                &ldquo;한 아이의 발을 지키고 나면, 신발은 다음 아이를 찾아
                떠납니다. 우리는 그 여행을 돕습니다.&rdquo;
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                — 신발여행자 팀
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
