import React from 'react';
import { Calendar, Phone, Sparkles } from 'lucide-react';
import { ThreeBackgroundCanvas } from './ThreeBackgroundCanvas';
import { SALON_INFO } from '../data/salonData';

interface FinalCTAProps {
  onOpenBooking: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative py-28 sm:py-36 bg-[#08090D] overflow-hidden border-t border-b border-white/5">
      {/* 3D Animated Background Canvas */}
      <div className="absolute inset-0 z-0">
        <ThreeBackgroundCanvas variant="dynamic" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#08090D]/80 to-[#08090D]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#E2B774]/30 backdrop-blur-md mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#E2B774]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#E2B774]">
            Start Your Style Journey
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 font-display">
          Ready for Your New Look?
        </h2>

        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          “Book your appointment at Hair dot com and give your style a fresh experience.”
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm sm:text-base font-semibold text-[#090A0F] bg-gradient-to-r from-[#FFF0D4] via-[#E2B774] to-[#C49040] hover:brightness-110 active:scale-95 shadow-[0_0_35px_rgba(226,183,116,0.35)] transition-all cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>

          <a
            href={`tel:${SALON_INFO.phone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm sm:text-base font-medium text-white hover:text-[#E2B774] bg-white/5 hover:bg-white/10 border border-white/15 transition-all whitespace-nowrap"
          >
            <Phone className="w-4 h-4 text-[#E2B774]" />
            <span>Call {SALON_INFO.phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
