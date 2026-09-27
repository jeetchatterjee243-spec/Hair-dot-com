import React from 'react';
import { Scissors, UserCheck, Sparkles, ShieldCheck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const cards = [
    {
      title: 'Professional Styling',
      description: 'Technically disciplined hair artists continuously trained in current global cutting, fading, and balayage procedures.',
      icon: Scissors,
      metric: 'Bespoke',
      metricLabel: 'Individual Hair Mapping',
    },
    {
      title: 'Personalized Service',
      description: 'We prioritize in-depth dialogue before shears touch hair, evaluating your bone structure, hair porosity, and daily styling capability.',
      icon: UserCheck,
      metric: '1-on-1',
      metricLabel: 'Attentive Stylist Consultation',
    },
    {
      title: 'Modern Salon Experience',
      description: 'Purpose-built luxury interior in Bengal Ambuja featuring ergonomic salon seating, ambient studio lighting, and serene acoustics.',
      icon: Sparkles,
      metric: 'Tranquil',
      metricLabel: 'City Center Sanctuary',
    },
    {
      title: 'Quality & Care',
      description: 'Exclusively dermatologically certified formulations, sanitized cutlery, single-use client capes, and nutrient-dense botanical serums.',
      icon: ShieldCheck,
      metric: '100%',
      metricLabel: 'Hygienic Sterilization Standards',
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-[#08090D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E2B774] mb-3">
            <span>The Hair dot com Difference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 font-display">
            Why Choose Hair dot com?
          </h2>
          <p className="text-base text-slate-300">
            Founded on the belief that a visit to your salon should be an empowering experience that leaves you confident, rejuvenated, and impeccably groomed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-[#11131C] border border-white/10 hover:border-[#E2B774]/40 hover:bg-[#141724] transition-all duration-300 flex flex-col justify-between shadow-xl group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E2B774] mb-6 group-hover:scale-110 group-hover:bg-[#E2B774]/15 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-display">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">{card.description}</p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="text-base font-bold text-[#E2B774] font-mono tabular-nums">{card.metric}</div>
                  <div className="text-[11px] text-slate-400">{card.metricLabel}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
