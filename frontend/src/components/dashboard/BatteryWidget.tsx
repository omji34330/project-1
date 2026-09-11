import { BatteryCharging, BatteryWarning, TrendingDown, TrendingUp } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import RadialGauge from '../charts/RadialGauge';
import { PLANT_ASSUMPTIONS } from '../../utils/constants';

interface BatteryWidgetProps {
  soc: number;
  isCharging: boolean;
}

export default function BatteryWidget({ soc, isCharging }: BatteryWidgetProps) {
  const isLow = soc < 20;
  const gaugeColor = isLow ? '#ef4444' : isCharging ? '#17bd7e' : '#f5a623';

  return (
    <GlassCard className="flex flex-col items-center text-center">
      <div className="mb-2 flex w-full items-center justify-between">
        <h3 className="font-display text-base font-semibold text-night-900 dark:text-white">Battery status</h3>
        <span
          className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${
            isCharging
              ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
              : 'bg-solar-500/15 text-solar-600 dark:text-solar-400'
          }`}
        >
          {isCharging ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {isCharging ? 'Charging' : 'Discharging'}
        </span>
      </div>

      <RadialGauge value={soc} color={gaugeColor} size={176}>
        {isLow ? (
          <BatteryWarning size={20} className="mb-1 text-red-500" />
        ) : (
          <BatteryCharging size={20} className="mb-1 text-emerald-600 dark:text-emerald-400" />
        )}
        <span className="font-display text-2xl font-semibold text-night-900 dark:text-white">
          {soc.toFixed(0)}%
        </span>
        <span className="text-[11px] text-night-700/60 dark:text-emerald-100/50">state of charge</span>
      </RadialGauge>

      <p className="mt-2 text-xs text-night-700/60 dark:text-emerald-100/50">
        Estimated from a {PLANT_ASSUMPTIONS.batteryCapacityKwh} kWh reference battery bank
      </p>
    </GlassCard>
  );
}
