import type { EnergyEstimate, HourlySample } from '../types';
import { PLANT_ASSUMPTIONS } from './constants';

const { solarCapacityKw, windCapacityKw, batteryCapacityKwh, dailyLoadKwh, gridEmissionFactorKgPerKwh } =
  PLANT_ASSUMPTIONS;

const loadKwPerHour = dailyLoadKwh / 24;

/** Extracts the local hour-of-day (0-23) from an Open-Meteo ISO timestamp without timezone drift. */
function hourOf(isoTime: string): number {
  return Number(isoTime.slice(11, 13));
}

/**
 * Approximates solar output from time-of-day (a bell curve between sunrise
 * and sunset) and cloud cover (diffuse light still gets through overcast
 * skies, so cloud only partially attenuates output).
 */
export function estimateSolarKw(isoTime: string, cloudCoverPct: number): number {
  const hour = hourOf(isoTime);
  const sunrise = 6;
  const sunset = 18.5;
  if (hour < sunrise || hour > sunset) return 0;

  const dayFraction = (hour - sunrise) / (sunset - sunrise);
  const daylightFactor = Math.sin(Math.PI * dayFraction); // 0 -> 1 -> 0 across the day
  const clearness = 1 - 0.75 * (Math.min(Math.max(cloudCoverPct, 0), 100) / 100);

  const kw = solarCapacityKw * daylightFactor * clearness;
  return Math.max(0, Number(kw.toFixed(2)));
}

/**
 * Approximates wind turbine output from a simplified cubic power curve:
 * no output below cut-in speed, a cubic ramp to rated capacity, a flat
 * plateau at rated capacity, then a safety cut-out at very high speeds.
 * Speeds are in km/h to match Open-Meteo's wind_speed_10m unit.
 */
export function estimateWindKw(windSpeedKmh: number): number {
  const cutIn = 10;
  const rated = 45;
  const cutOut = 90;

  if (windSpeedKmh < cutIn || windSpeedKmh > cutOut) return 0;
  if (windSpeedKmh >= rated) return windCapacityKw;

  const ratio = (windSpeedKmh - cutIn) / (rated - cutIn);
  const kw = windCapacityKw * Math.pow(ratio, 3);
  return Math.max(0, Number(kw.toFixed(2)));
}

/**
 * Walks an hourly series forward in time, simulating battery state of charge
 * and cumulative CO2 avoided as renewable generation offsets a flat
 * baseline load. Starts the series at 50% SOC.
 */
export function buildEnergySeries(hourly: HourlySample[]): EnergyEstimate[] {
  let socKwh = batteryCapacityKwh * 0.5;
  let cumulativeCo2 = 0;

  return hourly.map((sample) => {
    const solarKw = estimateSolarKw(sample.time, sample.cloudCover);
    const windKw = estimateWindKw(sample.windSpeed);
    const totalKw = solarKw + windKw;

    const netKwh = totalKw - loadKwPerHour;
    socKwh = Math.min(batteryCapacityKwh, Math.max(0, socKwh + netKwh));
    const batterySoc = Number(((socKwh / batteryCapacityKwh) * 100).toFixed(1));

    const usedRenewableKwh = Math.min(totalKw, loadKwPerHour);
    cumulativeCo2 += usedRenewableKwh * gridEmissionFactorKgPerKwh;

    return {
      time: sample.time,
      solarKw,
      windKw,
      totalKw: Number(totalKw.toFixed(2)),
      batterySoc,
      co2AvoidedKg: Number(cumulativeCo2.toFixed(2)),
    };
  });
}

export interface ReportSummary {
  totalEnergyKwh: number;
  co2SavedKg: number;
  renewableContributionPct: number;
  gridEfficiencyPct: number;
}

/** Aggregates an energy series into headline sustainability metrics for the Reports page. */
export function summarizeEnergy(series: EnergyEstimate[]): ReportSummary {
  if (series.length === 0) {
    return { totalEnergyKwh: 0, co2SavedKg: 0, renewableContributionPct: 0, gridEfficiencyPct: 0 };
  }

  const totalGeneratedKwh = series.reduce((sum, s) => sum + s.totalKw, 0);
  const totalLoadKwh = loadKwPerHour * series.length;
  const utilizedKwh = series.reduce((sum, s) => sum + Math.min(s.totalKw, loadKwPerHour), 0);

  const renewableContributionPct = Math.min(100, (utilizedKwh / totalLoadKwh) * 100);
  const gridEfficiencyPct = totalGeneratedKwh > 0 ? (utilizedKwh / totalGeneratedKwh) * 100 : 0;
  const co2SavedKg = series[series.length - 1]?.co2AvoidedKg ?? 0;

  return {
    totalEnergyKwh: Number(totalGeneratedKwh.toFixed(1)),
    co2SavedKg: Number(co2SavedKg.toFixed(1)),
    renewableContributionPct: Number(renewableContributionPct.toFixed(1)),
    gridEfficiencyPct: Number(gridEfficiencyPct.toFixed(1)),
  };
}

export function formatHour(isoTime: string): string {
  const hour = hourOf(isoTime);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour} ${period}`;
}

export function formatDayLabel(isoTime: string): string {
  const date = new Date(`${isoTime.slice(0, 10)}T00:00:00`);
  return date.toLocaleDateString('en-IN', { weekday: 'short' });
}
