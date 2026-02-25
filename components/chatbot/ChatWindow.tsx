'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES, FAQ_DATA, type FAQCategory, type FAQItem } from '@/lib/faqData';

export interface ChatMessage {
  id: number;
  type: 'bot' | 'user';
  content: string;
}

interface ChatWindowProps {
  messages: ChatMessage[];
  activeCategory: FAQCategory | null;
  onCategorySelect: (category: FAQCategory) => void;
  onQuestionSelect: (item: FAQItem) => void;
  onTextSubmit: (text: string) => void;
}

export default function ChatWindow({
  messages,
  activeCategory,
  onCategorySelect,
  onQuestionSelect,
  onTextSubmit,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputRef.current?.value.trim();
    if (!value) return;
    onTextSubmit(value);
    if (inputRef.current) inputRef.current.value = '';
  };

  const categoryQuestions = activeCategory
    ? FAQ_DATA.filter((item) => item.category === activeCategory)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="fixed bottom-[180px] right-5 z-[1100] w-[350px] h-[500px] max-sm:w-[calc(100vw-40px)] max-sm:right-5 max-sm:bottom-[160px] rounded-2xl overflow-hidden flex flex-col border border-primary/40 shadow-2xl"
      style={{ background: '#111' }}
    >
      {/* Header */}
      <div
        className="px-4 py-3 text-white font-bold text-base flex items-center gap-2 shrink-0"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        APEX STUDIO 챗봇
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                msg.type === 'user'
                  ? 'bg-primary text-white rounded-br-md'
                  : 'bg-white/10 text-white rounded-bl-md'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Category chips */}
        {!activeCategory && (
          <div className="flex flex-wrap gap-2 mt-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategorySelect(cat)}
                className="px-3 py-1.5 rounded-full text-xs font-bold border border-primary/60 text-primary hover:bg-primary hover:text-white transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Question list for selected category */}
        {activeCategory && categoryQuestions.length > 0 && (
          <div className="space-y-2 mt-1">
            {categoryQuestions.map((item) => (
              <button
                key={item.id}
                onClick={() => onQuestionSelect(item)}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-text-sub hover:bg-primary/20 hover:text-white transition-colors border border-white/10"
              >
                {item.question}
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 shrink-0 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="키워드를 입력하세요..."
          className="flex-1 bg-white/10 text-white text-sm rounded-full px-4 py-2 outline-none placeholder:text-text-sub/60 focus:ring-1 focus:ring-primary"
        />
        <button
          type="submit"
          className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center shrink-0 hover:bg-primary-light transition-colors"
          aria-label="전송"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </motion.div>
  );
}
