import Link from "next/link";
import { Instagram, Youtube, MessageCircle } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

const footerLinks = {
  서비스: [
    { label: "신발 찾기", href: "#" },
    { label: "신발 보내기", href: "#" },
    { label: "신발 여권이란?", href: "#" },
    { label: "수수료 안내", href: "#" },
  ],
  고객지원: [
    { label: "자주 묻는 질문", href: "#" },
    { label: "1:1 문의", href: "#" },
    { label: "거래 가이드", href: "#" },
    { label: "신고하기", href: "#" },
  ],
  회사: [
    { label: "회사 소개", href: "#" },
    { label: "채용 정보", href: "/careers" },
    { label: "뉴스룸", href: "#" },
    { label: "제휴 문의", href: "#" },
  ],
  정책: [
    { label: "이용약관", href: "#" },
    { label: "개인정보처리방침", href: "#" },
    { label: "청소년보호정책", href: "#" },
    { label: "환불 정책", href: "#" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: MessageCircle, href: "#", label: "KakaoTalk" },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <BrandLogo />
              <span className="text-xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                신발여행자
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              아이 신발의 두 번째 여행을 연결하는 플랫폼
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-foreground mb-4 font-[family-name:var(--font-heading)]">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-muted-foreground text-sm text-center md:text-left">
              <p>
                (주)신발여행자 | 대표: 홍길동 | 사업자등록번호: 123-45-67890
              </p>
              <p className="mt-1">
                서울특별시 강남구 테헤란로 123, 4층 | 고객센터: 1588-1234
              </p>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 신발여행자. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
