import { useEffect, useMemo } from 'react';
import { BatteryCharging, Leaf, Sun, Wind } from 'lucide-react';
import { useLiveData } from '../hooks/useLiveData';
import { buildEnergySeries, formatHour } from '../utils/energyCalculations';
import { PLANT_ASSUMPTIONS } from '../utils/constants';
import KpiCard from '../components/ui/KpiCard';
import { KpiSkeletonRow, ChartSkeleton } from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';
import AreaChartCard from '../components/charts/AreaChartCard';
import RadialGauge from '../components/charts/RadialGauge';
import GlassCard from '../components/ui/GlassCard';

export default function AIPrediction() {
  useEffect(() => {
    document.title = 'AI Prediction — EcoGrid AI';
  }, []);

  const { hourly, isLoading, isError, errorMessage, refetch } = useLiveData();

  const series = useMemo(() => buildEnergySeries(hourly), [hourly]);

  const chartData = useMemo(
    () =>
      series.map((s) => ({
        hour: formatHour(s.time),
        solar: s.solarKw,
        wind: s.windKw,
        battery: s.batterySoc,
      })),
    [series],
  );

  const totals = useMemo(() => {
    const solarKwh = series.reduce((sum, s) => sum + s.solarKw, 0);
    const windKwh = series.reduce((sum, s) => sum + s.windKw, 0);
    const co2AvoidedKg = series[series.length - 1]?.co2AvoidedKg ?? 0;
    const projectedSoc = series[series.length - 1]?.batterySoc ?? 50;

    const totalLoadKwh = (PLANT_ASSUMPTIONS.dailyLoadKwh / 24) * series.length;
    const theoreticalMaxCo2 = totalLoadKwh * PLANT_ASSUMPTIONS.gridEmissionFactorKgPerKwh;
    const carbonScore = theoreticalMaxCo2 > 0 ? Math.min(100, (co2AvoidedKg / theoreticalMaxCo2) * 100) : 0;

    return { solarKwh, windKwh, co2AvoidedKg, projectedSoc, carbonScore };
  }, [series]);

  const scoreLabel = totals.carbonScore >= 75 ? 'Excellent' : totals.carbonScore >= 45 ? 'Good' : 'Needs grid support';

  if (isError && series.length === 0) {
    return (
      <div className="section py-16">
        <ErrorState message={errorMessage ?? 'Unable to load the forecast right now.'} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="section py-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-night-900 dark:text-white">
          24-hour AI prediction
        </h1>
        <p className="mt-1 text-sm text-night-700/70 dark:text-emerald-100/60">
          Forecast generation, battery charge and carbon impact for the day ahead, from live weather data.
        </p>
      </div>

      {isLoading ? (
        <KpiSkeletonRow count={4} />
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <KpiCard
            icon={Sun}
            label="Expected solar output"
            value={totals.solarKwh.toFixed(1)}
            unit="kWh"
            sublabel={`${PLANT_ASSUMPTIONS.solarCapacityKw} kW reference array`}
            accent="solar"
          />
          <KpiCard
            icon={Wind}
            label="Wind potential"
            value={totals.windKwh.toFixed(1)}
            unit="kWh"
            sublabel={`${PLANT_ASSUMPTIONS.windCapacityKw} kW reference turbine`}
            accent="wind"
          />
          <KpiCard
            icon={BatteryCharging}
            label="Battery charge (24h)"
            value={totals.projectedSoc.toFixed(0)}
            unit="%"
            sublabel="Projected state of charge"
            accent="emerald"
          />
          <KpiCard
            icon={Leaf}
            label="Carbon reduction score"
            value={totals.carbonScore.toFixed(0)}
            unit="/ 100"
            sublabel={`${totals.co2AvoidedKg.toFixed(1)} kg CO2 avoided`}
            accent="emerald"
          />
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <AreaChartCard
              title="Predicted generation, next 24 hours"
              subtitle="Solar and wind output from the current forecast"
              data={chartData}
              xKey="hour"
              series={[
                { key: 'solar', name: 'Solar', color: '#f5a623', unit: 'kW' },
                { key: 'wind', name: 'Wind', color: '#22c3b0', unit: 'kW' },
              ]}
            />
          )}
        </div>

        <GlassCard className="flex flex-col items-center justify-center text-center">
          <h3 className="font-display text-base font-semibold text-night-900 dark:text-white">
            Carbon reduction score
          </h3>
          <div className="mt-4">
            <RadialGauge value={totals.carbonScore} color="#17bd7e" size={160}>
              <Leaf size={18} className="mb-1 text-emerald-600 dark:text-emerald-400" />
              <span className="font-display text-2xl font-semibold text-night-900 dark:text-white">
                {totals.carbonScore.toFixed(0)}
              </span>
              <span className="text-[11px] text-night-700/60 dark:text-emerald-100/50">out of 100</span>
            </RadialGauge>
          </div>
          <p className="mt-3 text-sm font-medium text-emerald-700 dark:text-emerald-300">{scoreLabel}</p>
          <p className="mt-1 max-w-[220px] text-xs text-night-700/60 dark:text-emerald-100/50">
            Share of today's load forecast to be met by solar and wind instead of the grid.
          </p>
        </GlassCard>
      </div>

      <div className="mt-6">
        {isLoading ? (
          <ChartSkeleton />
        ) : (
          <AreaChartCard
            title="Projected battery state of charge"
            subtitle="Simulated from generation minus a flat reference load, next 24 hours"
            data={chartData}
            xKey="hour"
            series={[{ key: 'battery', name: 'Battery SOC', color: '#17bd7e', unit: '%' }]}
            heightClass="h-56"
          />
        )}
      </div>
    </div>
  );
}
