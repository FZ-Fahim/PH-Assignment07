
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Camera,
  Mail,
  Save,
  UserRound,
  Image as ImageIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type EditProfileFormProps = {
  initialName: string;
  initialEmail: string;
  initialImage: string;
};

export default function EditProfileForm({
  initialName,
  initialEmail,
  initialImage,
}: EditProfileFormProps) {
  const router = useRouter();

  const [name, setName] = useState(initialName);
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [saving, setSaving] = useState(false);
  const [imageError, setImageError] = useState(false);

  const trimmedName = name.trim();
  const trimmedImage = imageUrl.trim();

  const validImageUrl = (() => {
    if (!trimmedImage) return "";

    try {
      const url = new URL(trimmedImage);

      if (url.protocol === "https:" || url.protocol === "http:") {
        return url.toString();
      }
    } catch {
      // Ignore invalid preview URLs.
    }

    return "";
  })();

  const initial = (trimmedName || initialEmail)
    .charAt(0)
    .toUpperCase();

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (trimmedName.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      return;
    }

    if (trimmedImage && !validImageUrl) {
      toast.error("সঠিক ছবির URL দিন");
      return;
    }

    setSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
        ...(validImageUrl
          ? { image: validImageUrl }
          : {}),
      });

      if (error) {
        toast.error(
          error.message || "প্রোফাইল আপডেট করা যায়নি"
        );
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");

      router.refresh();
      router.push("/profile");
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Heading */}
      <div className="mb-7">
        <Link
          href="/profile"
          className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} />
          প্রোফাইলে ফিরে যান
        </Link>

        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          প্রোফাইল এডিট করুন
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          আপনার ব্যক্তিগত তথ্য পরিবর্তন করুন।
        </p>
      </div>

      {/* Edit form */}
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
      >
        {/* Green header */}
        <div className="h-28 bg-primary sm:h-36" />

        <div className="px-5 pb-8 sm:px-9">
          {/* Avatar */}
          <div className="-mt-12 relative flex w-fit sm:-mt-14">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#e9f7ee] text-4xl font-bold text-primary shadow-sm sm:h-28 sm:w-28">
              {validImageUrl && !imageError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={validImageUrl}
                  src={validImageUrl}
                  alt="প্রোফাইল ছবির প্রিভিউ"
                  className="h-full w-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                initial
              )}
            </div>

            <div className="absolute right-0 bottom-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-primary text-white shadow">
              <Camera size={17} />
            </div>
          </div>

          <h2 className="mt-5 text-lg font-bold text-foreground">
            আপনার তথ্য
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            নাম ও প্রোফাইল ছবির লিংক পরিবর্তন করতে পারবেন।
          </p>

          <div className="mt-7 space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="profile-name"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                সম্পূর্ণ নাম
              </label>

              <div className="relative">
                <UserRound
                  size={18}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="profile-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  minLength={2}
                  maxLength={100}
                  required
                  disabled={saving}
                  placeholder="আপনার সম্পূর্ণ নাম"
                  className="w-full rounded-lg border border-gray-200 bg-white py-3 pr-4 pl-10 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:opacity-60"
                />
              </div>
            </div>

            {/* Email, read-only */}
            <div>
              <label
                htmlFor="profile-email"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                ইমেইল ঠিকানা
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="profile-email"
                  type="email"
                  value={initialEmail}
                  readOnly
                  className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 py-3 pr-4 pl-10 text-sm text-gray-500 outline-none"
                />
              </div>

              <p className="mt-2 text-xs text-gray-500">
                বর্তমানে ইমেইল ঠিকানা পরিবর্তন করা যাবে না।
              </p>
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="profile-image"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                প্রোফাইল ছবির URL
              </label>

              <div className="relative">
                <ImageIcon
                  size={18}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="profile-image"
                  type="url"
                  value={imageUrl}
                  onChange={(event) => {
                    setImageUrl(event.target.value);
                    setImageError(false);
                  }}
                  disabled={saving}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full rounded-lg border border-gray-200 bg-white py-3 pr-4 pl-10 text-sm text-foreground outline-none transition-colors placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:opacity-60"
                />
              </div>

              <p className="mt-2 text-xs text-gray-500">
                ছবির সরাসরি HTTP বা HTTPS লিংক দিন।
                লিংক পরিবর্তন করলে উপরে প্রিভিউ দেখাবে।
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
            <Link
              href="/profile"
              aria-disabled={saving}
              className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              বাতিল করুন
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={17} />
              {saving
                ? "সংরক্ষণ হচ্ছে..."
                : "পরিবর্তন সংরক্ষণ করুন"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
