import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Gauge, Sparkles } from 'lucide-react';
import EnergyIllustration from './EnergyIllustration';
import { LOCATION, SITE } from '../../utils/constants';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Hero() {
  return (
    <section className="section grid items-center gap-16 pb-20 pt-14 lg:grid-cols-2 lg:pt-20">
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.span variants={item} className="chip inline-flex items-center gap-1.5">
          <Sparkles size={13} />
          Smart India Hackathon 2026 · PS {SITE.problemStatementId}
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-6 text-4xl font-display font-semibold leading-[1.1] text-night-900 dark:text-white sm:text-5xl lg:text-[3.25rem]"
        >
          Powering a Greener Tomorrow with AI
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 max-w-lg text-base leading-relaxed text-night-700/80 dark:text-emerald-100/70"
        >
          EcoGrid AI reads live weather signals from {LOCATION.name} and turns them into solar and wind
          forecasts, battery guidance and carbon savings — so renewable capacity is used, not wasted.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
          <Link to="/dashboard" className="btn-primary">
            <Gauge size={17} />
            View Dashboard
          </Link>
          <Link to="/prediction" className="btn-secondary">
            AI Prediction
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>

        <motion.div variants={item} className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
          <div>
            <p className="font-display text-2xl font-semibold text-night-900 dark:text-white">60s</p>
            <p className="text-xs text-night-700/60 dark:text-emerald-100/50">live data refresh</p>
          </div>
          <div>
            <p className="font-display text-2xl font-semibold text-night-900 dark:text-white">24h</p>
            <p className="text-xs text-night-700/60 dark:text-emerald-100/50">AI generation forecast</p>
          </div>
          <div>
            <p className="font-display text-2xl font-semibold text-night-900 dark:text-white">5</p>
            <p className="text-xs text-night-700/60 dark:text-emerald-100/50">live weather signals tracked</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
        className="glass rounded-3xl p-8"
      >
        <EnergyIllustration />
      </motion.div>
    </section>
  );
}
