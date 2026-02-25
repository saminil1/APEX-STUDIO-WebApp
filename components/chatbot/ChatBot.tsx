'use client';

import { useState, useCallback } from 'react';
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

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([createBotMessage(GREETING_MESSAGE)]);
  const [activeCategory, setActiveCategory] = useState<FAQCategory | null>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleCategorySelect = useCallback((category: FAQCategory) => {
    setActiveCategory(category);
    setMessages((prev) => [
      ...prev,
      createUserMessage(category),
      createBotMessage(`[${category}] 카테고리입니다. 아래에서 궁금한 질문을 선택해 주세요.`),
    ]);
  }, []);

  const handleQuestionSelect = useCallback((item: FAQItem) => {
    setActiveCategory(null);
    setMessages((prev) => [
      ...prev,
      createUserMessage(item.question),
      createBotMessage(item.answer),
      createBotMessage('다른 궁금한 점이 있으시면 카테고리를 선택하시거나 키워드를 입력해 주세요.'),
    ]);
  }, []);

  const handleTextSubmit = useCallback((text: string) => {
    const userMsg = createUserMessage(text);
    const results = searchFAQ(text);

    if (results.length > 0) {
      const answerLines = results
        .map((r) => `Q. ${r.question}\nA. ${r.answer}`)
        .join('\n\n');
      setActiveCategory(null);
      setMessages((prev) => [...prev, userMsg, createBotMessage(answerLines)]);
    } else {
      setActiveCategory(null);
      setMessages((prev) => [
        ...prev,
        userMsg,
        createBotMessage(NO_RESULT_MESSAGE),
      ]);
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
