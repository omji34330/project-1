import { CircleCheck } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const BENEFITS = [
  'Cuts reliance on diesel backup by charging storage ahead of predicted shortfalls',
  'Lowers grid emissions with a running, transparent carbon-avoided figure',
  'Extends battery lifespan by avoiding unnecessary deep discharge cycles',
  'Turns weather uncertainty into a same-day generation plan, not a guess',
  'Gives non-technical stakeholders a single, exportable sustainability summary',
  'Keeps an always-on assistant on hand for quick, contextual energy questions',
];

export default function Benefits() {
  return (
    <section id="benefits" className="section py-20">
      <div className="glass overflow-hidden rounded-3xl p-8 sm:p-12">
        <SectionHeading
          title="Why it matters for a renewable microgrid"
          description="Small sites rarely have a dedicated energy analyst. EcoGrid AI puts that judgement on tap."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {BENEFITS.map((benefit) => (
            <div key={benefit} className="flex items-start gap-3">
              <CircleCheck size={19} className="mt-0.5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
              <p className="text-sm leading-relaxed text-night-800/80 dark:text-emerald-100/75">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
