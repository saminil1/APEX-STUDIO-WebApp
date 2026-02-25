'use client';

import { motion } from 'framer-motion';

interface ChatBotButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function ChatBotButton({ isOpen, onClick }: ChatBotButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-[110px] right-5 z-[1100] w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isOpen ? '챗봇 닫기' : '챗봇 열기'}
    >
      {isOpen ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      )}
    </motion.button>
  );
}
