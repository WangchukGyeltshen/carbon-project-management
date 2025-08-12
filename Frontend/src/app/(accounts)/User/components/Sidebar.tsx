"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar({ activeMenu }: { activeMenu?: string }): React.ReactElement {
  const pathname = usePathname();
  const router = useRouter();
  const normalizedActive = activeMenu || pathname;

  const normalize = (path?: string) => (path ? path.toLowerCase() : "");

  const isActive = (targetPath: string) => {
    const currentPath = normalize(pathname);
    const activePath = normalize(normalizedActive);
    const target = normalize(targetPath);

    return (
      currentPath === target ||
      currentPath.startsWith(target) ||
      activePath === target ||
      activePath.startsWith(target)
    );
  };

  return (
    <aside className="flex flex-col h-full w-64 bg-white border-r border-gray-200 shadow-sm">
      {/* Logo */}
      <div className="flex flex-row items-center gap-3 pt-6 pb-2 px-6">
        <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-[10px] tracking-widest text-[#8C8C8C] font-semibold mb-1">PICC</div>
          <div className="text-base font-bold text-[#222F3E]">RGoB</div>
        </div>
      </div>

      <div className="border-b border-gray-200 mx-4 my-2" />

      {/* MAIN Section */}
      <div className="px-6 pt-6 pb-2 text-xs text-[#8C8C8C] tracking-widest font-semibold select-none">
        MAIN
      </div>
      <nav className="flex-1 px-0 pt-0 pb-0">
        <div className="space-y-1 px-4">
          <Link
            href="/User/MAIN/dashboard"
            className={`flex items-center px-3 py-2 rounded-lg font-semibold ${
              isActive("/User/MAIN/dashboard") || isActive("/dashboard")
                ? "bg-[#32623A] text-white"
                : "text-[#222F3E] hover:bg-gray-100"
            }`}
          >
            <span className="mr-3">
              <svg
                width="20"
                height="20"
                fill="none"
                stroke={isActive("/User/MAIN/dashboard") || isActive("/dashboard") ? "#fff" : "#222F3E"}
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M3 9.5L12 4l9 5.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z" />
              </svg>
            </span>
            Dashboard
          </Link>

          <Link
            href="/User/MAIN/projectregistration"
            className={`flex items-center px-3 py-2 rounded-lg font-semibold ${
              isActive("/User/MAIN/projectregistration") || isActive("/projectregistration")
                ? "bg-[#32623A] text-white"
                : "text-[#222F3E] hover:bg-gray-100"
            }`}
          >
            <span className="mr-3">
              <svg
                width="20"
                height="20"
                fill="none"
                stroke={
                  isActive("/User/MAIN/projectregistration") || isActive("/projectregistration")
                    ? "#fff"
                    : "#222F3E"
                }
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M8 2v4M16 2v4M4 10h16" />
              </svg>
            </span>
            Project Registration
          </Link>

          <Link
            href="/User/MAIN/projectimplementation"
            className={`flex items-center px-3 py-2 rounded-lg font-semibold ${
              isActive("/User/MAIN/projectimplementation") || isActive("/projectimplementation")
                ? "bg-[#32623A] text-white"
                : "text-[#222F3E] hover:bg-gray-100"
            }`}
          >
            <span className="mr-3">
              <svg
                width="20"
                height="20"
                fill="none"
                stroke={
                  isActive("/User/MAIN/projectimplementation") || isActive("/projectimplementation")
                    ? "#fff"
                    : "#222F3E"
                }
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M3 17v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <span className="whitespace-nowrap">Project Implementation</span>
          </Link>
        </div>

        {/* ADDITIONALS Section */}
        <div className="px-6 pt-6 pb-2 text-xs text-[#8C8C8C] tracking-widest font-semibold select-none">
          ADDITIONALS
        </div>
        <div className="space-y-1 px-4">
          <Link
            href="/User/ADDITIONALS/Notifications"
            className={`flex items-center px-3 py-2 rounded-lg font-semibold ${
              isActive("/User/ADDITIONALS/Notifications") || isActive("/Notifications")
                ? "bg-[#32623A] text-white"
                : "text-[#222F3E] hover:bg-gray-100"
            }`}
          >
            <span className="mr-3">
              <svg
                width="20"
                height="20"
                fill="none"
                stroke={
                  isActive("/User/ADDITIONALS/Notifications") || isActive("/Notifications")
                    ? "#fff"
                    : "#222F3E"
                }
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="16" r="1" />
                <path d="M12 8v4" />
              </svg>
            </span>
            Notifications
          </Link>

          <Link
            href="/User/ADDITIONALS/Letter_of_Intent"
            className={`flex items-center px-3 py-2 rounded-lg font-semibold ${
              isActive("/User/ADDITIONALS/Letter_of_Intent") || isActive("/Letter_of_Intent")
                ? "bg-[#32623A] text-white"
                : "text-[#222F3E] hover:bg-gray-100"
            }`}
          >
            <span className="mr-3">
              <svg
                width="20"
                height="20"
                fill="none"
                stroke={
                  isActive("/User/ADDITIONALS/Letter_of_Intent") || isActive("/Letter_of_Intent")
                    ? "#fff"
                    : "#222F3E"
                }
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M8 2v4M16 2v4M4 10h16" />
              </svg>
            </span>
            Letter of Intent
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="mt-auto px-4 py-4 border-t border-gray-100">
        <a
          href="#"
          className="flex items-center px-3 py-2 rounded-lg text-[#222F3E] hover:bg-gray-100 mb-2"
        >
          <span className="mr-3">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="#222F3E"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <circle cx="12" cy="9" r="1" />
            </svg>
          </span>
          Help
        </a>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex items-center px-3 py-2 rounded-lg text-red-600 hover:bg-red-100 font-semibold w-full text-left"
        >
          <span className="mr-3">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="#C94B4B"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z" />
              <path d="M16 17l5-5-5-5M21 12H9" />
            </svg>
          </span>
          Logout Account
        </button>
      </div>
    </aside>
  );
}
