
"use client";

import { Suspense } from "react";
import { SignInForm } from "./SignInForm";

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto my-16 h-[420px] w-full max-w-[460px] animate-pulse rounded-2xl bg-white" />
      }
    >
      <SignInForm />
    </Suspense>
  );
}
