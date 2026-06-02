import Link from "next/link";
import { SignUpForm } from "@/components/auth/signup-form";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background">
      <Link
        href="/"
        className="mb-8 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← 신발여행자 홈으로
      </Link>
      <SignUpForm />
    </div>
  );
}
