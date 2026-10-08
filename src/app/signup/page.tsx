
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserRound,
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

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  // Email and password registration
  const handleRegister = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      toast.error("সবগুলো তথ্য পূরণ করুন");
      return;
    }

    if (name.trim().length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("দুইটি পাসওয়ার্ড মিলছে না");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        toast.error(
          error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে"
        );
        return;
      }

      toast.success(
        "অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন।"
      );

      router.push("/signin");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  // Google and GitHub login
  const handleSocialLogin = async (
    provider: "google" | "github"
  ) => {
    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
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
      {/* Registration Card */}
      <div className="w-full max-w-[460px] rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-9">
        {/* Heading */}
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm text-muted">
            নিজের তথ্য দিয়ে নতুন বাজার দর অ্যাকাউন্ট তৈরি করুন।
          </p>
        </div>

        {/* Registration Form */}
        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-foreground"
            >
              নাম
            </label>

            <div className="relative">
              <UserRound
                size={18}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-muted"
              />

              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="আপনার সম্পূর্ণ নাম"
                value={name}
                onChange={(e) => setName(e.target.value)}
                minLength={2}
                required
                disabled={loading || socialLoading !== null}
                className={inputClassName}
              />
            </div>
          </div>

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
                autoComplete="new-password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
                disabled={loading || socialLoading !== null}
                className={`${inputClassName} pr-11`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
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

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-semibold text-foreground"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-muted"
              />

              <input
                id="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                autoComplete="new-password"
                placeholder="আবার পাসওয়ার্ড লিখুন"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                required
                disabled={loading || socialLoading !== null}
                className={`${inputClassName} pr-11`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                aria-label={
                  showConfirmPassword
                    ? "পাসওয়ার্ড লুকান"
                    : "পাসওয়ার্ড দেখুন"
                }
                aria-pressed={showConfirmPassword}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted hover:text-primary"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={
              loading || socialLoading !== null
            }
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              "অ্যাকাউন্ট তৈরি হচ্ছে..."
            ) : (
              <>
                অ্যাকাউন্ট তৈরি করুন
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
            disabled={
              loading || socialLoading !== null
            }
            onClick={() =>
              handleSocialLogin("google")
            }
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
            disabled={
              loading || socialLoading !== null
            }
            onClick={() =>
              handleSocialLogin("github")
            }
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

        {/* Sign In Link */}
        <p className="mt-6 text-center text-sm text-muted">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-primary transition-colors hover:underline"
          >
            সাইন ইন করুন
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
