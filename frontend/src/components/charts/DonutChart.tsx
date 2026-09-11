import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import GlassCard from '../ui/GlassCard';

export interface DonutSlice {
  name: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  title: string;
  subtitle?: string;
  data: DonutSlice[];
}

export default function DonutChart({ title, subtitle, data }: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <GlassCard>
      <div className="mb-4">
        <h3 className="font-display text-base font-semibold text-night-900 dark:text-white">{title}</h3>
        {subtitle && <p className="text-xs text-night-700/60 dark:text-emerald-100/50">{subtitle}</p>}
      </div>

      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="62%"
              outerRadius="90%"
              paddingAngle={3}
              stroke="none"
            >
              {data.map((slice) => (
                <Cell key={slice.name} fill={slice.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [`${((value / total) * 100).toFixed(0)}%`, name]}
              contentStyle={{
                background: 'rgba(255,255,255,0.92)',
                border: '1px solid rgba(23,189,126,0.2)',
                borderRadius: 12,
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl font-semibold text-night-900 dark:text-white">
            {total.toFixed(0)}%
          </span>
          <span className="text-[11px] text-night-700/60 dark:text-emerald-100/50">renewable now</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
        {data.map((slice) => (
          <div key={slice.name} className="flex items-center gap-2 text-xs text-night-700/70 dark:text-emerald-100/60">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: slice.color }} />
            {slice.name}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
