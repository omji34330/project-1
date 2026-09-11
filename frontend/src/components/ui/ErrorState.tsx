import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="glass flex flex-col items-center gap-4 rounded-2xl p-10 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
        <AlertTriangle size={22} />
      </span>
      <div>
        <h3 className="font-display text-lg font-semibold text-night-900 dark:text-white">
          Live data unavailable
        </h3>
        <p className="mt-1 max-w-sm text-sm text-night-700/70 dark:text-emerald-100/60">{message}</p>
      </div>
      <button onClick={onRetry} className="btn-secondary">
        <RotateCcw size={16} />
        Retry
      </button>
    </div>
  );
}
