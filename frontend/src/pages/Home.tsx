import { useEffect } from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import Benefits from '../components/home/Benefits';
import Contact from '../components/home/Contact';

export default function Home() {
  useEffect(() => {
    document.title = 'EcoGrid AI — Powering a Greener Tomorrow with AI';
  }, []);

  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Benefits />
      <Contact />
    </>
  );
}
