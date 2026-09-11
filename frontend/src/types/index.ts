/** A single hourly weather sample as returned by Open-Meteo. */
export interface HourlySample {
  time: string;
  temperature: number;
  windSpeed: number;
  cloudCover: number;
  humidity: number;
  pressure: number;
}

/** The latest observed weather reading for the monitored site. */
export interface CurrentReading {
  temperature: number;
  windSpeed: number;
  cloudCover: number;
  humidity: number;
  pressure: number;
  time: string;
}

/** Full payload produced by the useLiveData hook. */
export interface LiveDataState {
  current: CurrentReading | null;
  hourly: HourlySample[];
  /** Trailing 7 days of hourly samples, used for the weekly trend chart. */
  past: HourlySample[];
  isLoading: boolean;
  isRefreshing: boolean;
  isError: boolean;
  errorMessage: string | null;
  lastUpdated: Date | null;
  refetch: () => void;
}

/** Derived, per-hour renewable-energy estimate used by charts & predictions. */
export interface EnergyEstimate {
  time: string;
  solarKw: number;
  windKw: number;
  totalKw: number;
  batterySoc: number;
  co2AvoidedKg: number;
}

export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: number;
}

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
}
