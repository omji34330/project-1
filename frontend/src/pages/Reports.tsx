import { useEffect, useMemo } from 'react';
import { BatteryCharging, Download, Gauge, Leaf, Zap } from 'lucide-react';
import { useLiveData } from '../hooks/useLiveData';
import { buildEnergySeries, formatHour, summarizeEnergy } from '../utils/energyCalculations';
import { LOCATION } from '../utils/constants';
import KpiCard from '../components/ui/KpiCard';
import { KpiSkeletonRow, ChartSkeleton } from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';
import AreaChartCard from '../components/charts/AreaChartCard';
import GlassCard from '../components/ui/GlassCard';

function downloadCsv(filename: string, rows: (string | number)[][]) {
  const csvContent = rows.map((row) => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function Reports() {
  useEffect(() => {
    document.title = 'Reports — EcoGrid AI';
  }, []);

  const { hourly, past, isLoading, isError, errorMessage, refetch } = useLiveData();

  const series = useMemo(() => buildEnergySeries([...past, ...hourly]), [past, hourly]);
  const summary = useMemo(() => summarizeEnergy(series), [series]);

  const trendData = useMemo(
    () =>
      series.map((s) => ({
        hour: formatHour(s.time),
        generated: s.totalKw,
        co2: s.co2AvoidedKg,
      })),
    [series],
  );

  function handleExport() {
    const header = ['timestamp', 'solar_kw', 'wind_kw', 'total_kw', 'battery_soc_pct', 'cumulative_co2_avoided_kg'];
    const rows = series.map((s) => [s.time, s.solarKw, s.windKw, s.totalKw, s.batterySoc, s.co2AvoidedKg]);
    const summaryRows = [
      [],
      ['Summary'],
      ['Total energy generated (kWh)', summary.totalEnergyKwh],
      ['CO2 saved (kg)', summary.co2SavedKg],
      ['Renewable contribution (%)', summary.renewableContributionPct],
      ['Grid efficiency (%)', summary.gridEfficiencyPct],
    ];
    downloadCsv(`ecogrid-ai-report-${new Date().toISOString().slice(0, 10)}.csv`, [header, ...rows, ...summaryRows]);
  }

  if (isError && series.length === 0) {
    return (
      <div className="section py-16">
        <ErrorState message={errorMessage ?? 'Unable to load report data right now.'} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="section py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-night-900 dark:text-white">
            Sustainability report
          </h1>
          <p className="mt-1 text-sm text-night-700/70 dark:text-emerald-100/60">
            {LOCATION.name} · trailing 7 days plus the current 24-hour forecast
          </p>
        </div>
        <button onClick={handleExport} disabled={isLoading} className="btn-primary">
          <Download size={16} />
          Export report
        </button>
      </div>

      {isLoading ? (
        <KpiSkeletonRow count={4} />
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <KpiCard
            icon={Zap}
            label="Total energy generated"
            value={summary.totalEnergyKwh.toFixed(0)}
            unit="kWh"
            accent="emerald"
          />
          <KpiCard icon={Leaf} label="CO2 saved" value={summary.co2SavedKg.toFixed(0)} unit="kg" accent="emerald" />
          <KpiCard
            icon={BatteryCharging}
            label="Renewable contribution"
            value={summary.renewableContributionPct.toFixed(0)}
            unit="%"
            accent="solar"
          />
          <KpiCard
            icon={Gauge}
            label="Grid efficiency"
            value={summary.gridEfficiencyPct.toFixed(0)}
            unit="%"
            accent="wind"
          />
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <AreaChartCard
              title="Generation & cumulative CO2 avoided"
              subtitle="Past 7 days through the next 24-hour forecast"
              data={trendData}
              xKey="hour"
              series={[
                { key: 'generated', name: 'Total output', color: '#17bd7e', unit: 'kW' },
                { key: 'co2', name: 'CO2 avoided (cumulative)', color: '#64748b', unit: 'kg' },
              ]}
            />
          )}
        </div>

        <GlassCard>
          <h3 className="font-display text-base font-semibold text-night-900 dark:text-white">
            About these figures
          </h3>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-night-700/70 dark:text-emerald-100/60">
            <li>
              <span className="font-medium text-night-900 dark:text-white">Total energy generated</span> sums the
              modelled solar and wind output across the reporting window.
            </li>
            <li>
              <span className="font-medium text-night-900 dark:text-white">CO2 saved</span> applies India's grid
              emission factor to renewable energy that offset the reference load.
            </li>
            <li>
              <span className="font-medium text-night-900 dark:text-white">Grid efficiency</span> is the share of
              generated renewable energy actually used rather than curtailed.
            </li>
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}
