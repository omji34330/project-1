import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import GlassCard from '../ui/GlassCard';

export interface AreaSeriesConfig {
  key: string;
  name: string;
  color: string;
  unit?: string;
}

interface AreaChartCardProps<T extends Record<string, unknown>> {
  title: string;
  subtitle?: string;
  data: T[];
  xKey: keyof T & string;
  series: AreaSeriesConfig[];
  heightClass?: string;
}

export default function AreaChartCard<T extends Record<string, unknown>>({
  title,
  subtitle,
  data,
  xKey,
  series,
  heightClass = 'h-72',
}: AreaChartCardProps<T>) {
  return (
    <GlassCard>
      <div className="mb-4">
        <h3 className="font-display text-base font-semibold text-night-900 dark:text-white">{title}</h3>
        {subtitle && <p className="text-xs text-night-700/60 dark:text-emerald-100/50">{subtitle}</p>}
      </div>

      <div className={heightClass}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
            <defs>
              {series.map((s) => (
                <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={s.color} stopOpacity={0.45} />
                  <stop offset="100%" stopColor={s.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 6" stroke="currentColor" className="text-night-500/10 dark:text-white/10" vertical={false} />
            <XAxis
              dataKey={xKey}
              tick={{ fontSize: 11, fill: 'currentColor' }}
              className="text-night-700/60 dark:text-emerald-100/50"
              tickLine={false}
              axisLine={false}
              minTickGap={24}
            />
            <YAxis
              tick={{ fontSize: 11, fill: 'currentColor' }}
              className="text-night-700/60 dark:text-emerald-100/50"
              tickLine={false}
              axisLine={false}
              width={36}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(255,255,255,0.92)',
                border: '1px solid rgba(23,189,126,0.2)',
                borderRadius: 12,
                fontSize: 12,
              }}
            />
            {series.map((s) => (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.unit ? `${s.name} (${s.unit})` : s.name}
                stroke={s.color}
                strokeWidth={2}
                fill={`url(#grad-${s.key})`}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
