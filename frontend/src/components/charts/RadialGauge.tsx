import type { ReactNode } from 'react';
import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts';

interface RadialGaugeProps {
  value: number;
  color: string;
  size?: number;
  children?: ReactNode;
}

export default function RadialGauge({ value, color, size = 176, children }: RadialGaugeProps) {
  const data = [{ value: Math.min(100, Math.max(0, value)), fill: color }];

  return (
    <div className="relative" style={{ height: size, width: size }}>
      <RadialBarChart
        width={size}
        height={size}
        cx="50%"
        cy="50%"
        innerRadius="76%"
        outerRadius="100%"
        startAngle={90}
        endAngle={-270}
        data={data}
      >
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar dataKey="value" cornerRadius={12} background={{ fill: 'rgba(23,189,126,0.08)' }} isAnimationActive />
      </RadialBarChart>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}
