import { useEffect, useMemo } from 'react';
import { CloudSun, Droplets, Gauge, RefreshCw, Thermometer, Wind } from 'lucide-react';
import { useLiveData } from '../hooks/useLiveData';
import { estimateSolarKw, estimateWindKw, buildEnergySeries, formatDayLabel, formatHour } from '../utils/energyCalculations';
import { PLANT_ASSUMPTIONS } from '../utils/constants';
import KpiCard from '../components/ui/KpiCard';
import { KpiSkeletonRow, ChartSkeleton } from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';
import AreaChartCard from '../components/charts/AreaChartCard';
import DonutChart from '../components/charts/DonutChart';
import WeeklyTrendChart, { type WeeklyPoint } from '../components/charts/WeeklyTrendChart';
import BatteryWidget from '../components/dashboard/BatteryWidget';

export default function Dashboard() {
  useEffect(() => {
    document.title = 'Dashboard — EcoGrid AI';
  }, []);

  const { current, hourly, past, isLoading, isRefreshing, isError, errorMessage, lastUpdated, refetch } =
    useLiveData();

  const areaData = useMemo(
    () =>
      hourly.map((h) => ({
        hour: formatHour(h.time),
        temperature: h.temperature,
        windSpeed: h.windSpeed,
      })),
    [hourly],
  );

  const energySeries = useMemo(() => buildEnergySeries(hourly), [hourly]);

  const donutData = useMemo(() => {
    if (!current) return [];
    const solarKw = estimateSolarKw(current.time, current.cloudCover);
    const windKw = estimateWindKw(current.windSpeed);
    const loadKw = PLANT_ASSUMPTIONS.dailyLoadKwh / 24;
    const renewableKw = Math.min(solarKw + windKw, loadKw);
    const gridKw = Math.max(0, loadKw - renewableKw);
    const solarShare = loadKw > 0 ? (Math.min(solarKw, renewableKw) / loadKw) * 100 : 0;
    const windShare = loadKw > 0 ? (Math.max(0, renewableKw - solarKw) / loadKw) * 100 : 0;
    const gridShare = loadKw > 0 ? (gridKw / loadKw) * 100 : 0;

    return [
      { name: 'Solar', value: Number(solarShare.toFixed(1)), color: '#f5a623' },
      { name: 'Wind', value: Number(windShare.toFixed(1)), color: '#22c3b0' },
      { name: 'Grid backup', value: Number(gridShare.toFixed(1)), color: '#64748b' },
    ];
  }, [current]);

  const weeklyData: WeeklyPoint[] = useMemo(() => {
    const byDay = new Map<string, { solarKwh: number; windKwh: number }>();
    past.forEach((sample) => {
      const label = formatDayLabel(sample.time);
      const solarKw = estimateSolarKw(sample.time, sample.cloudCover);
      const windKw = estimateWindKw(sample.windSpeed);
      const entry = byDay.get(label) ?? { solarKwh: 0, windKwh: 0 };
      entry.solarKwh += solarKw;
      entry.windKwh += windKw;
      byDay.set(label, entry);
    });
    return Array.from(byDay.entries())
      .slice(-7)
      .map(([day, v]) => ({ day, solarKwh: Number(v.solarKwh.toFixed(1)), windKwh: Number(v.windKwh.toFixed(1)) }));
  }, [past]);

  const currentSoc = energySeries[0]?.batterySoc ?? 50;
  const isCharging = energySeries[0] ? energySeries[0].totalKw > PLANT_ASSUMPTIONS.dailyLoadKwh / 24 : true;

  if (isError && !current) {
    return (
      <div className="section py-16">
        <ErrorState message={errorMessage ?? 'Something went wrong while loading live data.'} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="section py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-night-900 dark:text-white">
            Live site dashboard
          </h1>
          <p className="mt-1 text-sm text-night-700/70 dark:text-emerald-100/60">
            Kanpur, Uttar Pradesh — refreshed automatically every 60 seconds
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-night-700/60 dark:text-emerald-100/50">
          <RefreshCw size={13} className={isRefreshing ? 'animate-spin' : ''} />
          {lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString('en-IN')}` : 'Loading…'}
        </div>
      </div>

      {isLoading ? (
        <KpiSkeletonRow />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <KpiCard icon={Thermometer} label="Temperature" value={current!.temperature.toFixed(1)} unit="°C" accent="solar" />
          <KpiCard icon={Wind} label="Wind speed" value={current!.windSpeed.toFixed(1)} unit="km/h" accent="wind" />
          <KpiCard icon={CloudSun} label="Cloud cover" value={current!.cloudCover.toFixed(0)} unit="%" accent="slate" />
          <KpiCard icon={Droplets} label="Humidity" value={current!.humidity.toFixed(0)} unit="%" accent="wind" />
          <KpiCard icon={Gauge} label="Pressure" value={current!.pressure.toFixed(0)} unit="hPa" accent="emerald" />
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <AreaChartCard
              title="24-hour weather trend"
              subtitle="Temperature and wind speed forecast for the site"
              data={areaData}
              xKey="hour"
              series={[
                { key: 'temperature', name: 'Temperature', color: '#f5a623', unit: '°C' },
                { key: 'windSpeed', name: 'Wind speed', color: '#22c3b0', unit: 'km/h' },
              ]}
            />
          )}
        </div>
        <div>{isLoading ? <ChartSkeleton /> : <BatteryWidget soc={currentSoc} isCharging={isCharging} />}</div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {isLoading ? <ChartSkeleton /> : <DonutChart title="Live energy mix" subtitle="Estimated share of current site load" data={donutData} />}
        {isLoading ? <ChartSkeleton /> : <WeeklyTrendChart data={weeklyData} />}
      </div>

      {isError && current && (
        <div className="mt-6">
          <ErrorState message={errorMessage ?? 'The last refresh failed — showing the most recent data.'} onRetry={refetch} />
        </div>
      )}
    </div>
  );
}
