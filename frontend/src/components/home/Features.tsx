import { BatteryCharging, BrainCircuit, LineChart, MessageCircleMore, Radar, Wind } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import SectionHeading from '../ui/SectionHeading';

const FEATURES = [
  {
    icon: Radar,
    title: 'Real-time site monitoring',
    description: 'Live temperature, wind, cloud cover, humidity and pressure readings refreshed every minute.',
  },
  {
    icon: BrainCircuit,
    title: 'AI generation forecasts',
    description: '24-hour solar and wind output predictions derived from live meteorological patterns.',
  },
  {
    icon: BatteryCharging,
    title: 'Battery intelligence',
    description: 'Charge estimates that account for generation, consumption and current state of charge.',
  },
  {
    icon: LineChart,
    title: 'Sustainability reporting',
    description: 'Track energy generated, CO2 avoided and grid efficiency in one exportable summary.',
  },
  {
    icon: Wind,
    title: 'Multi-source energy mix',
    description: 'A clear breakdown of solar, wind, battery and grid contribution at any moment.',
  },
  {
    icon: MessageCircleMore,
    title: 'EcoGrid AI Assistant',
    description: 'Ask questions about solar output, wind potential, battery health or emissions, anytime.',
  },
];

export default function Features() {
  return (
    <section id="features" className="section py-20">
      <SectionHeading
        title="Everything a microgrid operator checks daily, in one place"
        description="EcoGrid AI consolidates live conditions, AI forecasts and impact tracking so decisions about storage and load can be made ahead of time, not after the fact."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <GlassCard key={title} className="group transition-transform duration-300 hover:-translate-y-1">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
              <Icon size={20} />
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold text-night-900 dark:text-white">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-night-700/70 dark:text-emerald-100/60">
              {description}
            </p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
