import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "김지현",
    role: "14개월 아이 엄마",
    content:
      "아이가 하루가 다르게 자라서 신발 사이즈가 금방 안 맞더라고요. 신발여행자 덕분에 합리적인 가격에 좋은 신발을 구할 수 있어서 너무 좋아요!",
    rating: 5,
    avatar: "👩",
  },
  {
    name: "이준호",
    role: "쌍둥이 아빠",
    content:
      "쌍둥이라 신발 비용이 두 배인데, 여기서 깨끗한 중고 신발을 구하니 정말 경제적이에요. 거래도 안전하고 배송도 빨라서 만족합니다.",
    rating: 5,
    avatar: "👨",
  },
  {
    name: "박소연",
    role: "24개월 아이 엄마",
    content:
      "사진 찍어 올렸더니 설명도 AI가 써줬어요. 그냥 올려놨는데 다음날 팔렸습니다. 당근마켓이랑 비교가 안 되게 편했어요.",
    rating: 5,
    avatar: "👩‍🦰",
  },
  {
    name: "최민수",
    role: "8개월 아이 아빠",
    content:
      "품질 검수가 꼼꼼해서 믿고 구매할 수 있어요. 사진이랑 실물이 똑같아서 놀랐습니다. 앞으로 계속 이용할 예정이에요!",
    rating: 5,
    avatar: "👨‍🦱",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            이용 후기
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-[family-name:var(--font-heading)] text-balance">
            부모님들의 생생한 후기
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            이미 많은 가족들이 신발여행자와 함께하고 있어요.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-border hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-accent text-accent"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground mb-6 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
