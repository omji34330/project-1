import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Leaf, MessageCircle, SendHorizontal, Trash2, X } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { SUGGESTED_PROMPTS } from '../../utils/constants';
import ChatBubble from './ChatBubble';
import TypingIndicator from './TypingIndicator';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, isTyping, error, sendMessage, clearHistory } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  function handleSend() {
    if (!input.trim() || isTyping) return;
    sendMessage(input);
    setInput('');
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 z-50 flex h-[min(70vh,600px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-white/40 bg-white/85 shadow-glass backdrop-blur-2xl dark:border-white/10 dark:bg-night-800/85 sm:right-6"
            role="dialog"
            aria-label="EcoGrid AI Assistant chat"
          >
            <div className="flex items-center justify-between border-b border-white/30 px-4 py-3.5 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <Leaf size={15} />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-night-900 dark:text-white">
                    EcoGrid AI Assistant
                  </p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-300">● Online</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearHistory}
                  aria-label="Clear chat history"
                  title="Clear chat history"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-night-700/60 transition-colors hover:bg-night-500/10 hover:text-night-900 dark:text-emerald-100/50 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <Trash2 size={15} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-night-700/60 transition-colors hover:bg-night-500/10 hover:text-night-900 dark:text-emerald-100/50 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <ChatBubble key={message.id} message={message} />
              ))}
              {isTyping && <TypingIndicator />}
              {error && (
                <p className="rounded-xl bg-red-500/10 px-3 py-2 text-xs leading-relaxed text-red-500">{error}</p>
              )}
            </div>

            <div className="border-t border-white/30 px-3 pb-3 pt-2.5 dark:border-white/10">
              <div className="mb-2 flex gap-2 overflow-x-auto pb-0.5">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    disabled={isTyping}
                    className="chip flex-shrink-0 whitespace-nowrap transition-colors hover:border-emerald-600/50 disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about solar, wind, battery, or emissions…"
                  rows={1}
                  className="max-h-24 flex-1 resize-none rounded-xl border border-emerald-600/20 bg-white/70 px-3.5 py-2.5 text-sm text-night-900 outline-none transition-colors focus:border-emerald-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  aria-label="Send message"
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                >
                  <SendHorizontal size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        aria-label={isOpen ? 'Close EcoGrid AI Assistant' : 'Open EcoGrid AI Assistant'}
        className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-glow sm:right-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOpen ? 'close' : 'open'}
            initial={{ rotate: -45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 45, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </>
  );
}
