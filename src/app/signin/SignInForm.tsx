
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export  function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Used later for protected product redirects
  const requestedCallback = searchParams.get("callbackURL");
  const callbackURL =
    requestedCallback?.startsWith("/") &&
    !requestedCallback.startsWith("//")
      ? requestedCallback
      : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  // Email and password sign in
  const handleSignIn = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("ইমেইল এবং পাসওয়ার্ড দিন");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        toast.error(
          error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়"
        );
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");

      router.push(callbackURL);
      router.refresh();
    } catch {
      toast.error("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  // Google and GitHub authentication
  const handleSocialLogin = async (
    provider: "google" | "github"
  ) => {
    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL,
        errorCallbackURL: "/signin",
      });

      if (error) {
        toast.error(
          error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে"
        );
      }
    } catch {
      toast.error("লগইন করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSocialLoading(null);
    }
  };

  const inputClassName =
    "w-full rounded-lg border border-border bg-white py-3 pr-4 pl-10 text-sm text-foreground outline-none transition-colors placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/10";

  return (
    <section className="flex min-h-[75vh] flex-col items-center justify-center px-4 py-12 sm:py-16">
      {/* Sign In Card */}
      <div className="w-full max-w-[460px] rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-9">
        {/* Heading */}
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            সাইন ইন
          </h1>

          <p className="mt-2 text-sm text-muted">
            নিবন্ধিত নাম, পাসওয়ার্ড ও প্রোফাইল দেখতে
            আপনার অ্যাকাউন্টে প্রবেশ করুন।
          </p>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSignIn} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-foreground"
            >
              ইমেইল
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-muted"
              />

              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading || socialLoading !== null}
                className={inputClassName}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-foreground"
            >
              পাসওয়ার্ড
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-muted"
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="আপনার পাসওয়ার্ড"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading || socialLoading !== null}
                className={`${inputClassName} pr-11`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword
                    ? "পাসওয়ার্ড লুকান"
                    : "পাসওয়ার্ড দেখুন"
                }
                aria-pressed={showPassword}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted hover:text-primary"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading || socialLoading !== null}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              "সাইন ইন হচ্ছে..."
            ) : (
              <>
                সাইন ইন
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />

          <span className="shrink-0 text-xs text-muted">
            অথবা
          </span>

          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
          {/* Google */}
          <button
            type="button"
            disabled={loading || socialLoading !== null}
            onClick={() => handleSocialLogin("google")}
            className="flex min-w-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-border bg-white px-2 py-3 text-[11px] font-semibold text-foreground transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:text-xs"
          >
            <FaGoogle className="shrink-0 text-base text-[#4285F4]" />

            <span>
              {socialLoading === "google"
                ? "অপেক্ষা করুন..."
                : "Google দিয়ে চালিয়ে যান"}
            </span>
          </button>

          {/* GitHub */}
          <button
            type="button"
            disabled={loading || socialLoading !== null}
            onClick={() => handleSocialLogin("github")}
            className="flex min-w-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-border bg-white px-2 py-3 text-[11px] font-semibold text-foreground transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:text-xs"
          >
            <FaGithub className="shrink-0 text-base" />

            <span>
              {socialLoading === "github"
                ? "অপেক্ষা করুন..."
                : "GitHub দিয়ে চালিয়ে যান"}
            </span>
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-muted">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-semibold text-primary transition-colors hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      {/* Back to Homepage */}
      <Link
        href="/"
        className="mt-7 inline-flex items-center justify-center gap-2 text-sm text-muted transition-colors hover:text-primary"
      >
        <ArrowLeft size={16} />
        হোম পেজে ফিরে যান
      </Link>
    </section>
  );
}
