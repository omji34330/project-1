import { useEffect } from 'react';
import { motion } from 'framer-motion';
import TeamCard from '../components/team/TeamCard';
import { SITE, TEAM_MEMBERS } from '../utils/constants';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function Team() {
  useEffect(() => {
    document.title = 'Team — EcoGrid AI';
  }, []);

  return (
    <div className="section py-16">
      <div className="mx-auto mb-12 max-w-xl text-center">
        <span className="chip">
          {SITE.event} · PS {SITE.problemStatementId}
        </span>
        <h1 className="mt-5 font-display text-3xl font-semibold text-night-900 dark:text-white sm:text-4xl">
          Meet Our Team
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-night-700/70 dark:text-emerald-100/60">
          The people building EcoGrid AI for the {SITE.theme} theme, {SITE.category} category.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {TEAM_MEMBERS.map((member, index) => (
          <motion.div key={member.name} variants={item}>
            <TeamCard member={member} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
