import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-[family-name:var(--font-heading)] text-balance">
            서랍 속 신발, 이제 여행을 보낼 시간입니다
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
            사진 한 장이면 됩니다. 흥정도, 직거래도, 설명 쓰기도 필요 없어요.
            <br />
            신발여행자가 다음 아이를 찾아드립니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 bg-white text-primary hover:bg-white/90"
            >
              신발 보내러 가기
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          <div className="pt-8 border-t border-primary-foreground/20">
            <p className="text-primary-foreground/60 text-sm mb-4">
              구매자로 시작하고 싶으신가요?
            </p>
            <Button
              variant="link"
              className="text-primary-foreground gap-2 hover:text-primary-foreground/80"
            >
              신발 둘러보기
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
