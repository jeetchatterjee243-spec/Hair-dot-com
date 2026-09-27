import React, { useState } from 'react';
import { Scissors, Sparkles, Heart, Clock, ArrowRight, Check } from 'lucide-react';
import { SalonService } from '../types/salon';

interface ServicesProps {
  services: SalonService[];
  onBookService: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ services, onBookService }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'hair' | 'beauty' | 'special'>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'hair', label: 'Hair Services' },
    { id: 'beauty', label: 'Beauty Services' },
    { id: 'special', label: 'Special Services' },
  ];

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter((s) => s.category === activeCategory);

  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'hair':
        return Scissors;
      case 'beauty':
        return Heart;
      case 'special':
      default:
        return Sparkles;
    }
  };

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-[#090A0F] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#E2B774]/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E2B774] mb-3">
            <span>Our Service Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 font-display">
            Crafted for Distinction &amp; Vitality
          </h2>
          <p className="text-base text-slate-300">
            From precision shearing and signature blowouts to rejuvenating botanical hair spas and glowing skin treatments, every session is executed with bespoke salon care.
          </p>
        </div>

        {/* Category Filter Tabs (Interactive Segmented Control) */}
        <div className="flex items-center justify-center mb-14">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#FFF0D4] via-[#E2B774] to-[#C49040] text-[#090A0F] shadow-md shadow-[#E2B774]/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => {
            const Icon = getServiceIcon(service.category);
            return (
              <div
                key={service.id}
                className="group relative p-6 sm:p-7 rounded-2xl bg-[#11131C] border border-white/10 hover:border-[#E2B774]/40 hover:bg-[#141724] transition-all duration-300 flex flex-col justify-between shadow-xl hover:-translate-y-1.5"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Highlight Glow Border */}
                {service.highlight && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#E2B774]/15 rounded-bl-full blur-xl pointer-events-none" />
                )}

                <div>
                  {/* Top Bar with Icon and Category Label */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#E2B774]/30 flex items-center justify-center text-[#E2B774] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    {/* Unboxed Metadata per Zero-Pill Design Rule */}
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="capitalize">{service.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span className="tabular-nums">{service.duration}</span>
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 font-display group-hover:text-[#E2B774] transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-0.5">Investment</span>
                    <span className="text-sm font-semibold text-white font-mono">{service.price}</span>
                  </div>

                  <button
                    onClick={() => onBookService(service.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#090A0F] bg-[#E2B774] hover:bg-[#ebd09e] active:scale-95 transition-all shadow-sm shadow-[#E2B774]/30 cursor-pointer whitespace-nowrap"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Booking Convenience Note */}
        <div className="mt-14 p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-center max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-slate-400">
          <span>Need a customized bridal, groom, or group styling package?</span>
          <button
            onClick={() => onBookService('bridal-styling')}
            className="text-[#E2B774] hover:underline font-semibold cursor-pointer"
          >
            Consult our specialists &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};
