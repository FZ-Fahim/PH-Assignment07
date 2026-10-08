
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  UserRound,
  Mail,
  ShieldCheck,
  ShieldAlert,
  Pencil,
  ArrowLeft,
} from "lucide-react";

import { getAuth } from "@/lib/auth";

export default async function ProfilePage() {
  const auth = await getAuth();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin?callbackURL=%2Fprofile");
  }

  const user = session.user;

  const initial = (user.name || user.email)
    .charAt(0)
    .toUpperCase();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Page heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          আমার প্রোফাইল
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখতে পারবেন।
        </p>
      </div>

      {/* Profile card */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Green header */}
        <div className="h-28 bg-primary sm:h-36" />

        <div className="px-5 pb-8 sm:px-9">
          {/* Avatar and edit button */}
          <div className="-mt-12 flex flex-wrap items-end justify-between gap-4 sm:-mt-14">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#e9f7ee] text-4xl font-bold text-primary shadow-sm sm:h-28 sm:w-28">
              {user.image ? (
                // BetterAuth can supply an avatar URL for OAuth users.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt={`${user.name} এর প্রোফাইল ছবি`}
                  className="h-full w-full object-cover"
                />
              ) : (
                initial
              )}
            </div>

            <Link
              href="/profile/edit"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90"
            >
              <Pencil size={16} />
              প্রোফাইল এডিট করুন
            </Link>
          </div>

          {/* Name */}
          <div className="mt-5">
            <h2 className="text-2xl font-bold text-foreground">
              {user.name}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              বাজার দর অ্যাকাউন্ট
            </p>
          </div>

          {/* Details */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-[#fafcfb] p-5">
              <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                <UserRound size={18} className="text-primary" />
                সম্পূর্ণ নাম
              </div>

              <p className="break-words font-semibold text-foreground">
                {user.name}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-[#fafcfb] p-5">
              <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                <Mail size={18} className="text-primary" />
                ইমেইল ঠিকানা
              </div>

              <p className="break-all font-semibold text-foreground">
                {user.email}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-[#fafcfb] p-5 sm:col-span-2">
              <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                {user.emailVerified ? (
                  <ShieldCheck
                    size={18}
                    className="text-green-600"
                  />
                ) : (
                  <ShieldAlert
                    size={18}
                    className="text-amber-600"
                  />
                )}
                ইমেইল যাচাইকরণ
              </div>

              <p
                className={`font-semibold ${
                  user.emailVerified
                    ? "text-green-700"
                    : "text-amber-700"
                }`}
              >
                {user.emailVerified
                  ? "যাচাইকৃত"
                  : "যাচাই করা হয়নি"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Back to home */}
      <Link
        href="/"
        className="mt-7 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-primary"
      >
        <ArrowLeft size={16} />
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
