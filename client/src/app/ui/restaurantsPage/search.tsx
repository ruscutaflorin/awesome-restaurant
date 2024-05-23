"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import React from "react";

export default function Search({
  placeholder,
  onSearchChange,
}: {
  placeholder: string;
  onSearchChange: (term: string) => void;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);
    onSearchChange(term);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex my-5 mx-auto w-full max-w-md">
      <label htmlFor="search-input" className="sr-only">
        Search
      </label>
      <input
        type="text"
        id="search-input"
        className="w-full px-4 py-2 border border-mediumGrey rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-darkOrange focus:border-transparent"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query") ?? ""}
      />
      <svg
        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-mediumGrey"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-4.35-4.35M9 15a6 6 0 110-12 6 6 0 010 12z"
        />
      </svg>
    </div>
  );
}
