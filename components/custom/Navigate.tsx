"use client";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

const Navigate = () => {
  const router = useRouter();
  const pathname = usePathname();
  const handleClick = (e: any) => {
    e.preventDefault();
    router.push("/");
  };
  return (
    pathname != "/" && (
      <button
        onClick={handleClick}
        className="relative left-9 top-9 rounded-xl bg-slate-700 w-24 flex justify-center p-2"
      >
        <span className="flex gap-2">
          <HomeIcon fontSize={32} />
          Home
        </span>
      </button>
    )
  );
};

export default Navigate;
