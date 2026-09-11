import type { LucideIcon } from 'lucide-react';
import GlassCard from './GlassCard';

interface KpiCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  unit?: string;
  sublabel?: string;
  accent?: 'emerald' | 'solar' | 'wind' | 'slate';
  isLoading?: boolean;
}

const ACCENT_STYLES: Record<NonNullable<KpiCardProps['accent']>, string> = {
  emerald: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300',
  solar: 'bg-solar-500/15 text-solar-600 dark:text-solar-400',
  wind: 'bg-wind-500/15 text-wind-600 dark:text-wind-400',
  slate: 'bg-night-500/15 text-night-700 dark:text-emerald-100',
};

export default function KpiCard({
  icon: Icon,
  label,
  value,
  unit,
  sublabel,
  accent = 'emerald',
  isLoading = false,
}: KpiCardProps) {
  return (
    <GlassCard className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-night-700/70 dark:text-emerald-100/60">{label}</span>
        <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${ACCENT_STYLES[accent]}`}>
          <Icon className="h-4.5 w-4.5" size={18} />
        </span>
      </div>

      {isLoading ? (
        <div className="h-9 w-24 animate-pulse rounded-lg bg-night-500/10 dark:bg-white/10" />
      ) : (
        <div className="flex items-baseline gap-1.5">
          <span className="font-display text-3xl font-semibold text-night-900 dark:text-white">{value}</span>
          {unit && <span className="text-sm text-night-700/60 dark:text-emerald-100/50">{unit}</span>}
        </div>
      )}

      {sublabel && !isLoading && (
        <span className="text-xs text-night-700/60 dark:text-emerald-100/50">{sublabel}</span>
      )}
    </GlassCard>
  );
}
