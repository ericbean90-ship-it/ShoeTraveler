import { Camera, Sparkles, Bell, Wallet } from "lucide-react";

const steps = [
  {
    icon: Camera,
    step: "01",
    title: "사진 한 장 찍기",
    description:
      "스마트폰으로 신발을 찍어 올립니다. 잘 찍지 않아도 됩니다. AI가 보정합니다.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "AI가 설명 완성",
    description:
      "브랜드·사이즈·상태를 자동으로 인식하고, 판매 설명까지 써줍니다.",
  },
  {
    icon: Bell,
    step: "03",
    title: "매칭 알림 수신",
    description:
      "조건이 맞는 구매자가 생기면 알림이 옵니다. 별도의 응대 없이 진행됩니다.",
  },
  {
    icon: Wallet,
    step: "04",
    title: "자동 정산 완료",
    description:
      "배송이 완료되면 수수료를 제하고 자동 입금됩니다. 아무것도 하지 않아도 됩니다.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            이용 방법
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-[family-name:var(--font-heading)] text-balance">
            올리기만 하면 팔립니다 — 4단계
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            사진 찍고 올리면 끝. 흥정도, 직거래도, 설명 쓰기도 필요 없습니다.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={index} className="relative group">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-border" />
              )}

              <div className="relative bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-center">
                {/* Step number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  {item.step}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 font-[family-name:var(--font-heading)]">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
