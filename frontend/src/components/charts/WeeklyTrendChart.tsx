import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import GlassCard from '../ui/GlassCard';

export interface WeeklyPoint {
  day: string;
  solarKwh: number;
  windKwh: number;
}

interface WeeklyTrendChartProps {
  data: WeeklyPoint[];
}

export default function WeeklyTrendChart({ data }: WeeklyTrendChartProps) {
  return (
    <GlassCard>
      <div className="mb-4">
        <h3 className="font-display text-base font-semibold text-night-900 dark:text-white">
          Weekly generation trend
        </h3>
        <p className="text-xs text-night-700/60 dark:text-emerald-100/50">
          Estimated solar & wind output, trailing 7 days
        </p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 6" stroke="currentColor" className="text-night-500/10 dark:text-white/10" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: 'currentColor' }}
              className="text-night-700/60 dark:text-emerald-100/50"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: 'currentColor' }}
              className="text-night-700/60 dark:text-emerald-100/50"
              tickLine={false}
              axisLine={false}
              width={36}
            />
            <Tooltip
              cursor={{ fill: 'rgba(23,189,126,0.06)' }}
              contentStyle={{
                background: 'rgba(255,255,255,0.92)',
                border: '1px solid rgba(23,189,126,0.2)',
                borderRadius: 12,
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="solarKwh" name="Solar (kWh)" fill="#f5a623" radius={[6, 6, 0, 0]} />
            <Bar dataKey="windKwh" name="Wind (kWh)" fill="#22c3b0" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
