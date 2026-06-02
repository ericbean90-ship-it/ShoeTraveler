"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { HeaderAuth } from "@/components/auth/header-auth";

const customerBoardLinkClass =
  "inline-flex items-center px-5 py-2 rounded-full text-sm font-medium bg-accent text-accent-foreground hover:bg-accent/90 transition-colors";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <BrandLogo />
            <span className="text-xl font-bold text-foreground font-[family-name:var(--font-heading)]">
              신발여행자
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              서비스 소개
            </Link>
            <Link
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              주요 기능
            </Link>
            <Link
              href="#how-it-works"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              이용 방법
            </Link>
            <Link
              href="#contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              문의하기
            </Link>
            <Link href="/memo" className={customerBoardLinkClass}>
              고객 게시판
            </Link>
            <Link
              href="/careers"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              채용정보
            </Link>
          </nav>

          <HeaderAuth />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 열기"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="#about"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                서비스 소개
              </Link>
              <Link
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                주요 기능
              </Link>
              <Link
                href="#how-it-works"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                이용 방법
              </Link>
              <Link
                href="#contact"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                문의하기
              </Link>
              <Link
                href="/memo"
                className={`${customerBoardLinkClass} self-start`}
                onClick={() => setIsMenuOpen(false)}
              >
                고객 게시판
              </Link>
              <Link
                href="/careers"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                채용정보
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <HeaderAuth variant="mobile" />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
