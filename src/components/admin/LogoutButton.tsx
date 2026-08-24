"use client";

import { signOut } from "next-auth/react";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="flex items-center gap-md px-md py-sm font-utility-label text-[12px] text-on-surface-variant hover:bg-surface-variant hover:text-primary transition-colors rounded-md w-full"
    >
      <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
      Sign Out
    </button>
  );
}
