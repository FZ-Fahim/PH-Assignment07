
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import logoIcon from "@/assets/logo-icon.png";
import CategoryNav from "./CategoryNav";
import PriceTicker from "./PriceTicker";
import AuthButtons from "./AuthButtons";

export default function Navbar() {
  const [banglaDate, setBanglaDate] = useState("");

  useEffect(() => {
    const formattedDate = new Intl.DateTimeFormat("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Dhaka",
    }).format(new Date());

    setBanglaDate(formattedDate);
  }, []);

  return (
    <header className="w-full border-b border-border bg-white">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:min-h-20 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary sm:h-12 sm:w-12">
            <Image
              src={logoIcon}
              alt="বাজার দর লোগো"
              width={36}
              height={36}
              className="h-8 w-8 object-contain sm:h-10 sm:w-10"
              priority
            />
          </div>

          <div className="min-w-0">
            <p className="text-lg leading-tight font-bold text-foreground sm:text-2xl">
              বাজার দর
            </p>

            <p className="mt-0.5 text-[10px] text-muted sm:text-xs">
              {banglaDate || "\u00A0"}
            </p>
          </div>
        </Link>

        {/* Authentication */}
        <AuthButtons />
      </div>

      <CategoryNav />
      <PriceTicker />
    </header>
  );
}
