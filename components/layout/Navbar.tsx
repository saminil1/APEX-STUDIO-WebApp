"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setExpandedMenu(null);

    if (href.startsWith("/#")) {
      const hash = href.slice(1);
      if (pathname === "/") {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(href);
      }
    } else if (href === "/") {
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* ── 데스크톱 헤더 ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          scrolled ? "bg-black/75 backdrop-blur-[12px]" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-5">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
              <polygon points="20,2 36,14 30,34 10,34 4,14" stroke="white" strokeWidth="2.5" fill="none" />
              <circle cx="20" cy="20" r="3" fill="white" />
              <line x1="20" y1="2" x2="20" y2="10" stroke="white" strokeWidth="2" />
            </svg>
            <span className="text-lg font-black tracking-[2px] text-white">
              APEX STUDIO
            </span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.filter((item) => item.label !== "APEX STUDIO").map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-white no-underline text-[15px] font-bold tracking-wide hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
                {/* 서브메뉴 (데스크톱 호버) */}
                {"children" in item && item.children && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-black/90 backdrop-blur-md border border-white/10 rounded-xl py-2 min-w-[140px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-5 py-2.5 text-sm no-underline transition-colors ${
                            pathname === child.href
                              ? "text-primary font-bold"
                              : "text-text-sub hover:text-white"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 햄버거 버튼 (모바일) */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
            aria-label="메뉴 열기"
          >
            <span className="block w-[26px] h-[2px] bg-white transition-all" />
            <span className="block w-[26px] h-[2px] bg-white transition-all" />
            <span className="block w-[26px] h-[2px] bg-white transition-all" />
          </button>
        </div>
      </nav>

      {/* ── 모바일 사이드 메뉴 ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* 오버레이 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[1999] bg-black/60"
            />

            {/* 사이드 패널 */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="fixed top-0 right-0 bottom-0 z-[2000] w-[280px] bg-[#0a0a0a] border-l border-white/10 flex flex-col"
            >
              {/* 닫기 */}
              <div className="flex justify-end p-5">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="bg-transparent border-none text-white text-2xl cursor-pointer leading-none"
                  aria-label="메뉴 닫기"
                >
                  ✕
                </button>
              </div>

              {/* 로고 */}
              <div className="px-6 pb-8">
                <span className="text-xl font-black tracking-[2px] text-white">
                  APEX STUDIO
                </span>
              </div>

              {/* 메뉴 항목 */}
              <div className="flex-1 px-6 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label}>
                    {"children" in item && item.children ? (
                      <>
                        <button
                          onClick={() =>
                            setExpandedMenu(
                              expandedMenu === item.label ? null : item.label
                            )
                          }
                          className="w-full flex items-center justify-between py-3.5 text-white text-lg font-bold tracking-wide bg-transparent border-none cursor-pointer"
                        >
                          {item.label}
                          <svg
                            className={`w-4 h-4 transition-transform ${
                              expandedMenu === item.label ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <AnimatePresence>
                          {expandedMenu === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden pl-4"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => {
                                    setMenuOpen(false);
                                    setExpandedMenu(null);
                                  }}
                                  className={`block py-2.5 text-[15px] no-underline transition-colors ${
                                    pathname === child.href
                                      ? "text-primary font-bold"
                                      : "text-text-sub hover:text-white"
                                  }`}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => handleNavClick(item.href)}
                        className="block py-3.5 text-white no-underline text-lg font-bold tracking-wide hover:text-primary transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
