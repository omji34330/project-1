import type { TeamMember } from '../../types';
import GlassCard from '../ui/GlassCard';

const RING_COLORS = ['from-emerald-400 to-wind-500', 'from-solar-400 to-emerald-500', 'from-wind-400 to-emerald-600'];

export default function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const ring = RING_COLORS[index % RING_COLORS.length];

  return (
    <GlassCard className="flex flex-col items-center py-9 text-center transition-transform duration-300 hover:-translate-y-1.5">
      <div className={`rounded-full bg-gradient-to-br ${ring} p-[3px]`}>
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white dark:bg-night-900">
          <span className="font-display text-xl font-semibold text-night-900 dark:text-white">
            {member.initials}
          </span>
        </div>
      </div>

      <h3 className="mt-5 font-display text-lg font-semibold text-night-900 dark:text-white">{member.name}</h3>
      <p className="mt-1.5 chip">{member.role}</p>
    </GlassCard>
  );
}
