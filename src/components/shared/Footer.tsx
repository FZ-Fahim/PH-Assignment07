
export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-center sm:flex-row sm:px-6 sm:text-left">
        {/* Left: Website description */}
        <p className="text-xs text-muted">
          <span className="font-semibold text-foreground">
            বাজার দর
          </span>
          {" — "}
          নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        {/* Right: Price disclaimer */}
        <p className="text-xs text-muted sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
