import React from 'react';
import { Calendar, Compass, Phone, Sparkles, MapPin } from 'lucide-react';
import { ThreeHeroScene } from './ThreeHeroScene';
import { SALON_INFO } from '../data/salonData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section id="home" className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Salon Imagery Layer with Cinematic Dark Luxury Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_luxury_salon_1790525123889.jpg"
          alt="Hair dot com Luxury Salon Interior in Durgapur"
          className="w-full h-full object-cover object-center filter brightness-[0.28] contrast-[1.1] scale-105 transform animate-pulse duration-10000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090D]/90 via-[#08090D]/75 to-[#08090D]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(226,183,116,0.12),transparent_65%)]" />
      </div>

      {/* 3D WebGL Three.js Layer: Floating Scissors, Comb, Golden Strands, and Particles */}
      <div className="absolute inset-0 z-10">
        <ThreeHeroScene />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-auto">
        {/* Location & Brand Trust Marker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#E2B774]/25 backdrop-blur-md mb-6 shadow-inner animate-in fade-in slide-in-from-bottom-2 duration-700">
          <MapPin className="w-3.5 h-3.5 text-[#E2B774]" />
          <span className="text-xs font-medium tracking-wide text-slate-300">
            City Center, Durgapur · Bengal Ambuja
          </span>
        </div>

        {/* Main Brand Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-4 uppercase drop-shadow-2xl">
          <span className="block font-display">HAIR DOT COM</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl md:text-3xl font-light text-slate-200 tracking-wide mb-3 max-w-3xl mx-auto">
          Premium Hair &amp; Beauty Experience in Durgapur
        </p>

        {/* Supporting Line */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="h-px w-8 bg-[#E2B774]/40" />
          <p className="text-base sm:text-lg font-serif italic text-[#E2B774] tracking-widest uppercase">
            “Style. Confidence. You.”
          </p>
          <span className="h-px w-8 bg-[#E2B774]/40" />
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-10">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm sm:text-base font-semibold text-[#090A0F] bg-gradient-to-r from-[#FFF0D4] via-[#E2B774] to-[#C49040] hover:brightness-110 active:scale-[0.98] rounded-full shadow-[0_0_35px_rgba(226,183,116,0.3)] transition-all cursor-pointer whitespace-nowrap group"
          >
            <Calendar className="w-4 h-4 text-[#090A0F] group-hover:rotate-6 transition-transform" />
            <span>Book an Appointment</span>
          </button>

          <a
            href="#services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm sm:text-base font-medium text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#E2B774]/40 rounded-full backdrop-blur-md transition-all cursor-pointer whitespace-nowrap"
          >
            <Compass className="w-4 h-4 text-[#E2B774]" />
            <span>Explore Services</span>
          </a>
        </div>

        {/* Quick Phone Access */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-slate-400">
          <span>Direct Salon Inquiries:</span>
          <a
            href={`tel:${SALON_INFO.phone}`}
            className="inline-flex items-center gap-2 text-white hover:text-[#E2B774] font-semibold tracking-wider transition-colors px-3 py-1 rounded-lg bg-white/5 border border-white/10"
          >
            <Phone className="w-3.5 h-3.5 text-[#E2B774]" />
            <span className="tabular-nums font-mono">{SALON_INFO.phone}</span>
          </a>
        </div>
      </div>

      {/* Bottom Floating Scroll Cue */}
      <div className="absolute bottom-4 inset-x-0 flex justify-center z-20 pointer-events-none opacity-70">
        <div className="flex flex-col items-center gap-1.5 text-xs text-slate-400">
          <span className="text-[10px] uppercase tracking-widest font-mono">Scroll to explore</span>
          <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-[#E2B774] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
