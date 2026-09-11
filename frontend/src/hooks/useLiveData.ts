import { useCallback, useEffect, useRef, useState } from 'react';
import { LOCATION, OPEN_METEO_URL, REFRESH_INTERVAL_MS } from '../utils/constants';
import type { CurrentReading, HourlySample, LiveDataState } from '../types';

const HOURLY_FIELDS = [
  'temperature_2m',
  'wind_speed_10m',
  'cloud_cover',
  'relative_humidity_2m',
  'surface_pressure',
].join(',');

function buildUrl(): string {
  const params = new URLSearchParams({
    latitude: String(LOCATION.latitude),
    longitude: String(LOCATION.longitude),
    current: HOURLY_FIELDS,
    hourly: HOURLY_FIELDS,
    past_days: '7',
    forecast_days: '2',
    timezone: LOCATION.timezone,
  });
  return `${OPEN_METEO_URL}?${params.toString()}`;
}

interface OpenMeteoResponse {
  current: {
    time: string;
    temperature_2m: number;
    wind_speed_10m: number;
    cloud_cover: number;
    relative_humidity_2m: number;
    surface_pressure: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    wind_speed_10m: number[];
    cloud_cover: number[];
    relative_humidity_2m: number[];
    surface_pressure: number[];
  };
}

function toSamples(hourly: OpenMeteoResponse['hourly']): HourlySample[] {
  return hourly.time.map((time, i) => ({
    time,
    temperature: hourly.temperature_2m[i],
    windSpeed: hourly.wind_speed_10m[i],
    cloudCover: hourly.cloud_cover[i],
    humidity: hourly.relative_humidity_2m[i],
    pressure: hourly.surface_pressure[i],
  }));
}

const MAX_RETRIES = 3;
const RETRY_BASE_DELAY_MS = 1500;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetches live weather data for the monitored site from Open-Meteo,
 * refreshing automatically every REFRESH_INTERVAL_MS. Retries transient
 * network failures with backoff before surfacing an error, and exposes a
 * manual `refetch` for a "Retry" button in the UI.
 */
export function useLiveData(): LiveDataState {
  const [current, setCurrent] = useState<CurrentReading | null>(null);
  const [hourly, setHourly] = useState<HourlySample[]>([]);
  const [past, setPast] = useState<HourlySample[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const hasLoadedOnce = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    if (hasLoadedOnce.current) setIsRefreshing(true);

    let lastError: unknown = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
      try {
        const response = await fetch(buildUrl(), { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Open-Meteo responded with status ${response.status}`);
        }

        const json = (await response.json()) as OpenMeteoResponse;
        const allSamples = toSamples(json.hourly);
        const splitIndex = Math.max(
          0,
          allSamples.findIndex((s) => s.time === json.current.time),
        );

        setCurrent({
          temperature: json.current.temperature_2m,
          windSpeed: json.current.wind_speed_10m,
          cloudCover: json.current.cloud_cover,
          humidity: json.current.relative_humidity_2m,
          pressure: json.current.surface_pressure,
          time: json.current.time,
        });
        setHourly(allSamples.slice(splitIndex, splitIndex + 24));
        setPast(allSamples.slice(0, splitIndex));
        setIsError(false);
        setErrorMessage(null);
        setLastUpdated(new Date());
        hasLoadedOnce.current = true;
        setIsLoading(false);
        setIsRefreshing(false);
        return;
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        lastError = err;
        if (attempt < MAX_RETRIES) {
          await delay(RETRY_BASE_DELAY_MS * 2 ** attempt);
        }
      }
    }

    setIsError(true);
    setErrorMessage(
      lastError instanceof Error
        ? lastError.message
        : 'Unable to reach the live weather service. Check your connection and retry.',
    );
    setIsLoading(false);
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, REFRESH_INTERVAL_MS);
    return () => {
      clearInterval(interval);
      abortRef.current?.abort();
    };
  }, [load]);

  return {
    current,
    hourly,
    past,
    isLoading,
    isRefreshing,
    isError,
    errorMessage,
    lastUpdated,
    refetch: load,
  };
}
