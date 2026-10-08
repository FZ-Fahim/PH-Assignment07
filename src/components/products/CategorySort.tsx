
"use client";

import { ChevronDown } from "lucide-react";

export type SortOption = "default" | "low" | "high";

interface CategorySortProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function CategorySort({
  value,
  onChange,
}: CategorySortProps) {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="category-sort"
        className="text-sm text-muted"
      >
        সাজান:
      </label>

      <div className="relative">
        <select
          id="category-sort"
          value={value}
          onChange={(e) =>
            onChange(e.target.value as SortOption)
          }
          className="min-w-40 appearance-none rounded-lg border border-border bg-white py-2.5 pr-9 pl-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low">দাম: কম থেকে বেশি</option>
          <option value="high">দাম: বেশি থেকে কম</option>
        </select>

        <ChevronDown
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted"
        />
      </div>
    </div>
  );
}
