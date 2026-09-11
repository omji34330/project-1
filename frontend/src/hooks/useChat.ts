import { useCallback, useEffect, useState } from 'react';
import { API_BASE_URL, CHATBOT_WELCOME_MESSAGE } from '../utils/constants';
import type { ChatMessage } from '../types';

const STORAGE_KEY = 'ecogrid-chat-history';

function makeId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function welcomeMessage(): ChatMessage {
  return {
    id: 'welcome',
    role: 'assistant',
    content: CHATBOT_WELCOME_MESSAGE,
    timestamp: Date.now(),
  };
}

function loadHistory(): ChatMessage[] {
  if (typeof window === 'undefined') return [welcomeMessage()];
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [welcomeMessage()];
    const parsed = JSON.parse(raw) as ChatMessage[];
    return parsed.length > 0 ? parsed : [welcomeMessage()];
  } catch {
    return [welcomeMessage()];
  }
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(loadHistory);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Storage can fail in private-browsing contexts; chat still works in-memory.
    }
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const userMessage: ChatMessage = {
        id: makeId(),
        role: 'user',
        content: trimmed,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: trimmed,
            history: [...messages, userMessage].slice(-10).map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!response.ok) {
          throw new Error(`Assistant service responded with status ${response.status}`);
        }

        const data = (await response.json()) as { reply: string };

        setMessages((prev) => [
          ...prev,
          {
            id: makeId(),
            role: 'assistant',
            content: data.reply,
            timestamp: Date.now(),
          },
        ]);
      } catch {
        setError('EcoGrid AI Assistant is unreachable right now. Make sure the backend server is running and try again.');
      } finally {
        setIsTyping(false);
      }
    },
    [messages],
  );

  const clearHistory = useCallback(() => {
    setMessages([welcomeMessage()]);
  }, []);

  return { messages, isTyping, error, sendMessage, clearHistory };
}
