
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  LogOut,
  UserRound,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthButtons() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Sign out
  const handleSignOut = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি");
        return;
      }

      setIsOpen(false);
      toast.success("সফলভাবে সাইন আউট হয়েছে!");

      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে");
    } finally {
      setLoggingOut(false);
    }
  };

  // Loading state
  if (isPending) {
    return (
      <div
        className="h-10 w-28 animate-pulse rounded-lg bg-gray-100"
        aria-label="অ্যাকাউন্ট লোড হচ্ছে"
      />
    );
  }

  // Not authenticated
  if (!session?.user) {
    return (
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
        <Link
          href="/signin"
          className="rounded-md px-2.5 py-2 text-xs font-medium text-foreground transition-colors hover:bg-primary-light hover:text-primary sm:px-4 sm:text-sm"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="rounded-md bg-primary px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-hover sm:px-5 sm:py-2.5 sm:text-sm"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const user = session.user;
  const firstLetter = (user.name || user.email)
    .charAt(0)
    .toUpperCase();

  // Authenticated user
  return (
    <div ref={dropdownRef} className="relative shrink-0">
      {/* Profile button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-lg border border-border bg-white px-2 py-1.5 transition-colors hover:bg-primary-light sm:gap-3 sm:px-3"
      >
        {/* Profile avatar */}
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white sm:h-9 sm:w-9">
          {firstLetter}
        </span>

        <span className="hidden max-w-32 truncate text-sm font-semibold text-foreground sm:block">
          {user.name}
        </span>

        <ChevronDown
          size={16}
          className={`text-muted transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          role="menu"
          className="absolute top-full right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-border bg-white shadow-lg"
        >
          {/* User information */}
          <div className="border-b border-border px-4 py-3">
            <p className="truncate text-sm font-bold text-foreground">
              {user.name}
            </p>

            <p className="mt-1 truncate text-xs text-muted">
              {user.email}
            </p>
          </div>

          {/* Profile link */}
          <div className="p-2">
            <Link
              href="/profile"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-primary-light hover:text-primary"
            >
              <UserRound size={18} />
              আমার প্রোফাইল
            </Link>

            {/* Sign out */}
            <button
              type="button"
              role="menuitem"
              onClick={handleSignOut}
              disabled={loggingOut}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-price-up transition-colors hover:bg-red-50 disabled:opacity-60"
            >
              <LogOut size={18} />
              {loggingOut
                ? "সাইন আউট হচ্ছে..."
                : "সাইন আউট"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
