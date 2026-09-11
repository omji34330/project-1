import SectionHeading from '../ui/SectionHeading';

const STEPS = [
  {
    title: 'Collect live conditions',
    description:
      'Temperature, wind speed, cloud cover, humidity and pressure are pulled for the site every 60 seconds.',
  },
  {
    title: 'Model solar & wind potential',
    description:
      'Cloud cover and time-of-day estimate solar yield; wind speed runs through a turbine power curve.',
  },
  {
    title: 'Forecast the next 24 hours',
    description:
      'The AI Prediction engine projects generation, battery charge and carbon impact for the day ahead.',
  },
  {
    title: 'Act and track impact',
    description:
      'Operators shift load, export reports and ask the assistant questions — all from live, current data.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section py-20">
      <SectionHeading
        title="From raw weather data to a decision, in four steps"
        description="Each stage builds on the last — nothing here is guesswork sitting on top of static numbers."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, index) => (
          <div key={step.title} className="relative">
            <div className="glass flex h-full flex-col rounded-2xl p-6">
              <span className="font-display text-3xl font-semibold text-emerald-600/40 dark:text-emerald-400/30">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-night-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-night-700/70 dark:text-emerald-100/60">
                {step.description}
              </p>
            </div>
            {index < STEPS.length - 1 && (
              <div className="absolute right-[-14px] top-1/2 hidden h-px w-7 -translate-y-1/2 bg-emerald-600/25 lg:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
