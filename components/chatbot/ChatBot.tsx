'use client';

import { useState, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import ChatBotButton from './ChatBotButton';
import ChatWindow, { type ChatMessage } from './ChatWindow';
import {
  GREETING_MESSAGE,
  NO_RESULT_MESSAGE,
  searchFAQ,
  type FAQCategory,
  type FAQItem,
} from '@/lib/faqData';

const SESSION_KEY = 'apex_chat_session_id';

let messageId = 0;
function nextId() {
  return ++messageId;
}

function createBotMessage(content: string): ChatMessage {
  return { id: nextId(), type: 'bot', content };
}

function createUserMessage(content: string): ChatMessage {
  return { id: nextId(), type: 'user', content };
}

function saveMessage(sessionId: string, sender: 'user' | 'bot', content: string) {
  fetch('/api/chat/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, sender, content }),
  }).catch(() => {});
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([createBotMessage(GREETING_MESSAGE)]);
  const [activeCategory, setActiveCategory] = useState<FAQCategory | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const sessionInitRef = useRef(false);

  const ensureSession = useCallback(async () => {
    if (sessionIdRef.current) return sessionIdRef.current;

    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      sessionIdRef.current = stored;
      return stored;
    }

    if (sessionInitRef.current) return null;
    sessionInitRef.current = true;

    try {
      const res = await fetch('/api/chat/sessions', { method: 'POST' });
      if (res.ok) {
        const { id } = await res.json();
        sessionIdRef.current = id;
        localStorage.setItem(SESSION_KEY, id);
        saveMessage(id, 'bot', GREETING_MESSAGE);
        return id;
      }
    } catch {
      // 세션 생성 실패해도 UX 영향 없음
    }
    sessionInitRef.current = false;
    return null;
  }, []);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        ensureSession();
      }
      return next;
    });
  }, [ensureSession]);

  const handleCategorySelect = useCallback((category: FAQCategory) => {
    setActiveCategory(category);
    const botContent = `[${category}] 카테고리입니다. 아래에서 궁금한 질문을 선택해 주세요.`;
    setMessages((prev) => [
      ...prev,
      createUserMessage(category),
      createBotMessage(botContent),
    ]);

    const sid = sessionIdRef.current;
    if (sid) {
      saveMessage(sid, 'user', category);
      saveMessage(sid, 'bot', botContent);
    }
  }, []);

  const handleQuestionSelect = useCallback((item: FAQItem) => {
    setActiveCategory(null);
    const followUp = '다른 궁금한 점이 있으시면 카테고리를 선택하시거나 키워드를 입력해 주세요.';
    setMessages((prev) => [
      ...prev,
      createUserMessage(item.question),
      createBotMessage(item.answer),
      createBotMessage(followUp),
    ]);

    const sid = sessionIdRef.current;
    if (sid) {
      saveMessage(sid, 'user', item.question);
      saveMessage(sid, 'bot', item.answer);
      saveMessage(sid, 'bot', followUp);
    }
  }, []);

  const handleTextSubmit = useCallback((text: string) => {
    const userMsg = createUserMessage(text);
    const results = searchFAQ(text);

    const sid = sessionIdRef.current;
    if (sid) saveMessage(sid, 'user', text);

    if (results.length > 0) {
      const answerLines = results
        .map((r) => `Q. ${r.question}\nA. ${r.answer}`)
        .join('\n\n');
      setActiveCategory(null);
      setMessages((prev) => [...prev, userMsg, createBotMessage(answerLines)]);
      if (sid) saveMessage(sid, 'bot', answerLines);
    } else {
      setActiveCategory(null);
      setMessages((prev) => [
        ...prev,
        userMsg,
        createBotMessage(NO_RESULT_MESSAGE),
      ]);
      if (sid) saveMessage(sid, 'bot', NO_RESULT_MESSAGE);
    }
  }, []);

  return (
    <>
      <ChatBotButton isOpen={isOpen} onClick={toggleOpen} />
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            messages={messages}
            activeCategory={activeCategory}
            onCategorySelect={handleCategorySelect}
            onQuestionSelect={handleQuestionSelect}
            onTextSubmit={handleTextSubmit}
          />
        )}
      </AnimatePresence>
    </>
  );
}
