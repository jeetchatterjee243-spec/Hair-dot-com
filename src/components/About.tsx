import React from 'react';
import { Award, Scissors, Sparkles, HeartHandshake, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export const About: React.FC = () => {
  const pillars = [
    {
      title: 'Professional Service',
      description: 'Expert consultation and dedicated care using premium salon formulations for optimal hair and skin health.',
      icon: Scissors,
    },
    {
      title: 'Modern Styling',
      description: 'Contemporary cutting, precision fades, and bespoke coloring techniques tailored to individual facial contours.',
      icon: Sparkles,
    },
    {
      title: 'Premium Experience',
      description: 'A tranquil, hygienic salon ambiance in City Center designed for relaxation, refreshment, and personalized attention.',
      icon: ShieldCheck,
    },
    {
      title: 'Customer Focused',
      description: 'We listen attentively to your hair goals, daily routine, and personal aesthetic to craft your signature look.',
      icon: HeartHandshake,
    },
  ];

  const highlights = [
    { label: 'Open Schedule', value: '7 Days', detail: 'Mon – Sun 10AM to 9PM' },
    { label: 'Salon Services', value: '18+', detail: 'Hair, Skin & Spa' },
    { label: 'Prime Location', value: 'City Center', detail: 'Near Ambuja Kali Bari' },
    { label: 'Consultation', value: '1-on-1', detail: 'Custom Hair Diagnosis' },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#08090D] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#E2B774]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#C49040]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E2B774] mb-3">
            <span>About Hair dot com</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 font-display">
            Where Style Meets Confidence
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Hair dot com provides professional hair and beauty services in Durgapur with an uncompromising focus on style, quality, and customer experience. Located centrally at Bengal Ambuja in City Center, we combine modern technique with warm hospitality to bring your personal aesthetic to life.
          </p>
        </div>

        {/* Hero Grid: Editorial Salon Photography & Highlight Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">
          {/* Left Column: Image with floating glass elements */}
          <div className="lg:col-span-7 relative group">
            <div className="relative rounded-2xl overflow-hidden border border-[#E2B774]/20 shadow-2xl bg-[#12141D]">
              <img
                src="/src/assets/images/about_salon_styling_1790525139237.jpg"
                alt="Hair dot com Professional Styling Experience"
                className="w-full h-[420px] sm:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090D] via-transparent to-transparent opacity-80" />

              {/* Floating caption card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#090A0F]/85 backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#E2B774] font-medium">Bespoke Haircraft</p>
                  <p className="text-sm font-semibold text-white">Precision Cut &amp; Custom Care</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-[#E2B774]" />
                  <span>Durgapur City Center</span>
                </div>
              </div>
            </div>

            {/* Subtle decorative 3D floating orb backdrop */}
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full border border-[#E2B774]/30 bg-gradient-to-br from-[#E2B774]/20 to-transparent blur-[2px] pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-full border border-white/10 bg-white/5 pointer-events-none" />
          </div>

          {/* Right Column: Key Philosophy & Concrete Metrics */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-white mb-4 font-display">
              Elevating Everyday Grooming in Durgapur
            </h3>
            <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
              Whether you are preparing for a milestone occasion, refreshing your everyday styling, or indulging in restorative hair spa therapy, our team delivers attentive craftsmanship tailored to your hair type and texture.
            </p>

            {/* Structured Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#E2B774]/30 transition-colors"
                >
                  <div className="text-xl sm:text-2xl font-bold text-[#E2B774] font-mono tabular-nums mb-1">
                    {item.value}
                  </div>
                  <div className="text-xs font-semibold text-white mb-0.5">{item.label}</div>
                  <div className="text-[11px] text-slate-400">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-[#10121A]/80 border border-white/10 hover:border-[#E2B774]/40 hover:bg-[#141722] transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#E2B774]/10 border border-[#E2B774]/20 flex items-center justify-center text-[#E2B774] mb-5 group-hover:scale-110 group-hover:bg-[#E2B774]/20 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 font-display">{pillar.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
