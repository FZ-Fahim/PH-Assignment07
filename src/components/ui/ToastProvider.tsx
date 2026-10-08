
"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3500,
        style: {
          fontFamily: "var(--font-hind-siliguri)",
          borderRadius: "12px",
          background: "#ffffff",
          color: "#1f2923",
          border: "1px solid #e2e8e3",
        },
        success: {
          iconTheme: {
            primary: "#15945c",
            secondary: "#ffffff",
          },
        },
        error: {
          iconTheme: {
            primary: "#dc4545",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
}
