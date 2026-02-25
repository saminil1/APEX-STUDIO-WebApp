"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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

    // 같은 페이지의 앵커인 경우 스크롤
    if (href.startsWith("/#")) {
      const hash = href.slice(1); // "#pricing" 등
      if (pathname === "/") {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: "smooth" });
      }
      // 다른 페이지에서는 Link가 "/" 페이지로 이동 후 hash 처리
    } else if (href === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-6 py-5 transition-all duration-300 ${
          scrolled
            ? "bg-black/75 backdrop-blur-[12px]"
            : "bg-transparent"
        }`}
      >
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
          >
            <polygon
              points="20,2 36,14 30,34 10,34 4,14"
              stroke="white"
              strokeWidth="2.5"
              fill="none"
            />
            <circle cx="20" cy="20" r="3" fill="white" />
            <line x1="20" y1="2" x2="20" y2="10" stroke="white" strokeWidth="2" />
          </svg>
          <span className="text-lg font-black tracking-[2px] text-white">
            APEX STUDIO
          </span>
        </Link>

        {/* 햄버거 버튼 */}
        <button
          onClick={() => setMenuOpen(true)}
          className="flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
          aria-label="메뉴 열기"
        >
          <span className="block w-[26px] h-[2px] bg-white transition-all" />
          <span className="block w-[26px] h-[2px] bg-white transition-all" />
          <span className="block w-[26px] h-[2px] bg-white transition-all" />
        </button>
      </nav>

      {/* 전체화면 모바일 메뉴 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[2000] flex flex-col items-center justify-center gap-10 bg-black"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 bg-transparent border-none text-white text-4xl cursor-pointer leading-none"
              aria-label="메뉴 닫기"
            >
              ✕
            </button>

            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <Link
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-white no-underline text-[28px] font-bold tracking-[2px] hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
