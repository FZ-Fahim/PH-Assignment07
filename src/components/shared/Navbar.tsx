
"use client";

import Image from "next/image";
import Link from "next/link";
import logoIcon from "@/assets/logo-icon.png";
import CategoryNav from "./CategoryNav";
import PriceTicker from "./PriceTicker";

export default function Navbar() {
  const banglaDate = new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  return (
    <header className="w-full border-b border-border bg-white">
      <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        {/* Logo and Date */}
        <Link href="/" className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary">
          <Image
            src={logoIcon}
            alt="বাজার দর লোগো"
            width={40}
            height={40}
            className="h-9 w-9 object-contain"
            priority
          />
        </div>

          <div>
            <h1 className="text-xl font-bold leading-tight text-primary sm:text-2xl">
              বাজার দর
            </h1>
            <p className="mt-1 text-[11px] text-muted sm:text-xs">
              {banglaDate}
            </p>
          </div>
        </Link>

        {/* Authentication Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/signin"
            className="rounded-lg border border-primary px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary-light sm:px-5 sm:text-sm"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-hover sm:px-5 sm:text-sm"
          >
            সাইন আপ
          </Link>
        </div>
      </div>
      <CategoryNav />
      <PriceTicker />
    </header>
  );
}
