import type { TeamMember } from '../types';

export const SITE = {
  name: 'EcoGrid AI',
  tagline: 'Powering a Greener Tomorrow with AI',
  problemStatementId: '26200',
  theme: 'Renewable / Sustainable Energy',
  category: 'Software',
  event: 'Smart India Hackathon 2026',
};

/** Monitored location — Kanpur, India. */
export const LOCATION = {
  name: 'Kanpur, Uttar Pradesh, India',
  latitude: 26.4499,
  longitude: 80.3319,
  timezone: 'Asia/Kolkata',
};

export const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast';

/** Refresh cadence for live dashboard data. */
export const REFRESH_INTERVAL_MS = 60_000;

/**
 * Assumed installed-capacity baseline used to translate raw weather signals
 * into indicative energy figures. These are declared, editable assumptions
 * for a demo microgrid — not measured hardware — and are surfaced in the UI
 * copy so the numbers are never mistaken for metered output.
 */
export const PLANT_ASSUMPTIONS = {
  solarCapacityKw: 5,
  windCapacityKw: 3,
  batteryCapacityKwh: 10,
  dailyLoadKwh: 18,
  /** India grid combined-margin emission factor, kg CO2 per kWh (CEA baseline, illustrative). */
  gridEmissionFactorKgPerKwh: 0.82,
};

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'AI Prediction', to: '/prediction' },
  { label: 'Reports', to: '/reports' },
  { label: 'Team', to: '/team' },
];

export const TEAM_MEMBERS: TeamMember[] = [
  { name: 'Om Ji Gupta', role: 'Full Stack Developer', initials: 'OG' },
  { name: 'Mohd Faizan', role: 'Product & Research Lead', initials: 'Mf' },
  { name: 'Mohammmad Uzair Ansari', role: 'Team Leader', initials: 'Mu' },
  { name: 'Pritam Yadav', role: 'Research Lead', initials: 'PY' },
  { name: 'Mohammad Farish Ansari', role: 'Team Member', initials: 'Mf' },
  { name: 'Shivanshi Mishra', role: 'Presentation', initials: 'SM' },
];

export const CHATBOT_WELCOME_MESSAGE =
  "Hello! I'm EcoGrid AI Assistant. Ask me about solar energy, wind energy, battery health, carbon emissions, or renewable energy.";

export const SUGGESTED_PROMPTS = [
  'How much solar power can I generate today?',
  'Explain cloud cover.',
  'Reduce electricity consumption.',
  'What is battery SOC?',
];

export const API_BASE_URL: string =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? '';
