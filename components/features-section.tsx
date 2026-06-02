import {
  Sparkles,
  Shuffle,
  Wallet,
  BookOpen,
  Leaf,
  Gift,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Sparkles,
    title: "AI가 대신 써줍니다",
    description:
      "사진 한 장만 올리면 브랜드·사이즈·상태 설명을 AI가 자동으로 완성합니다. 타이핑 없이 등록 완료.",
  },
  {
    icon: Shuffle,
    title: "자동으로 매칭됩니다",
    description:
      "사이즈·브랜드·지역 조건이 맞는 구매자가 생기면 알림이 갑니다. 기다리기만 하면 됩니다.",
  },
  {
    icon: Wallet,
    title: "팔린 다음에 정산됩니다",
    description:
      "사전 입금 없음. 거래가 성사될 때 수수료를 차감하고 자동 정산됩니다.",
  },
  {
    icon: BookOpen,
    title: "신발 여권이 만들어집니다",
    description:
      "신발마다 고유 ID 부여. 거래마다 스탬프가 쌓여 이 신발의 여행 이력이 됩니다.",
  },
  {
    icon: Leaf,
    title: "지구에 미안하지 않은 소비",
    description:
      "신발 1켤레 순환 시 CO₂ 8.5kg 절감. 아이들에게 더 깨끗한 환경을 선물합니다.",
  },
  {
    icon: Gift,
    title: "구매자는 수수료 없음",
    description:
      "파는 분만 15% 수수료. 사는 분은 새 신발보다 훨씬 저렴하게, 부담 없이 구매합니다.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            주요 기능
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-[family-name:var(--font-heading)] text-balance">
            신발여행자가 특별한 이유
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            팔기 어려워서 포기했던 그 신발, 이제 올리기만 하세요.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 bg-background"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 font-[family-name:var(--font-heading)]">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
