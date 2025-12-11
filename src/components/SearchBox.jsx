'use client';

import { useState } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';

export default function SearchBox({
  placeholder = "Search properties…",
  paramName = "search",
  width = "w-64",
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale } = useParams();
  const [value, setValue] = useState(searchParams.get(paramName) || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (value.trim()) {
      params.set(paramName, value.trim());
    }

    router.push(`/${locale}/properties?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="hidden md:flex items-center relative group"
    >
      <span className="
        absolute left-4 text-gray-400 group-hover:text-primary-500 
        transition-colors duration-200
      ">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m1.1-5.4a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
          />
        </svg>
      </span>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={`
          pl-12 pr-5 py-3
          rounded-full
          bg-white/95
          focus:border-primary-500
          text-gray-800 !text-gray-800
          placeholder-gray-600 !placeholder-gray-600
          focus:ring-4 focus:ring-primary-300
          shadow-lg
          transition-all duration-200
          ${width}
        `}
      />

    </form>
  );
}
