import { useState, type FormEvent } from 'react';
import { CheckCircle2, Mail, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../ui/GlassCard';
import SectionHeading from '../ui/SectionHeading';
import { LOCATION } from '../../utils/constants';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    // No contact backend was requested for this build — this simply
    // acknowledges the submission client-side. Wire this to a real
    // endpoint (e.g. a `/api/contact` route) before going to production.
    setSubmitted(true);
  }

  return (
    <section id="contact" className="section py-20">
      <SectionHeading
        title="Talk to the team"
        description="Questions about the model, the dataset, or bringing EcoGrid AI to a real site — reach out."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <GlassCard className="lg:col-span-2">
          <ul className="space-y-5">
            <li className="flex items-start gap-3">
              <Mail size={18} className="mt-0.5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="text-sm font-medium text-night-900 dark:text-white">Email</p>
                <p className="text-sm text-night-700/70 dark:text-emerald-100/60">team@ecogrid.ai</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="text-sm font-medium text-night-900 dark:text-white">Monitored site</p>
                <p className="text-sm text-night-700/70 dark:text-emerald-100/60">{LOCATION.name}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Users size={18} className="mt-0.5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="text-sm font-medium text-night-900 dark:text-white">Team</p>
                <Link to="/team" className="text-sm text-emerald-700 underline underline-offset-2 dark:text-emerald-300">
                  Meet the people behind EcoGrid AI
                </Link>
              </div>
            </li>
          </ul>
        </GlassCard>

        <GlassCard className="lg:col-span-3">
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 py-10 text-center">
              <CheckCircle2 size={36} className="text-emerald-600 dark:text-emerald-400" />
              <p className="font-display text-lg font-semibold text-night-900 dark:text-white">
                Message received
              </p>
              <p className="max-w-xs text-sm text-night-700/70 dark:text-emerald-100/60">
                Thanks, {form.name.split(' ')[0]}. The team will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-xs font-medium text-night-700/70 dark:text-emerald-100/60">
                    Name
                  </label>
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-emerald-600/20 bg-white/60 px-4 py-2.5 text-sm text-night-900 outline-none transition-colors focus:border-emerald-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-xs font-medium text-night-700/70 dark:text-emerald-100/60">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-emerald-600/20 bg-white/60 px-4 py-2.5 text-sm text-night-900 outline-none transition-colors focus:border-emerald-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="text-xs font-medium text-night-700/70 dark:text-emerald-100/60">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1.5 w-full resize-none rounded-xl border border-emerald-600/20 bg-white/60 px-4 py-2.5 text-sm text-night-900 outline-none transition-colors focus:border-emerald-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  placeholder="Tell us what you're working on"
                />
              </div>
              <button type="submit" className="btn-primary w-full sm:w-auto">
                Send message
              </button>
            </form>
          )}
        </GlassCard>
      </div>
    </section>
  );
}
