import { Leaf, User } from 'lucide-react';
import type { ChatMessage } from '../../types';

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

export default function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <span
        className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${
          isUser
            ? 'bg-night-700 text-emerald-100 dark:bg-white/10'
            : 'bg-emerald-600 text-white'
        }`}
      >
        {isUser ? <User size={13} /> : <Leaf size={13} />}
      </span>

      <div className={`flex max-w-[78%] flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            isUser
              ? 'rounded-br-sm bg-emerald-600 text-white'
              : 'rounded-bl-sm border border-white/40 bg-white/70 text-night-900 dark:border-white/10 dark:bg-white/[0.07] dark:text-emerald-50'
          }`}
        >
          {message.content}
        </div>
        <span className="mt-1 px-1 text-[10px] text-night-700/50 dark:text-emerald-100/40">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
