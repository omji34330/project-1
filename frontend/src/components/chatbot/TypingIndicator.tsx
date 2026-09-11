import { Leaf } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
        <Leaf size={13} />
      </span>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-white/40 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/[0.07]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-600/70 dark:bg-emerald-300/70"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
