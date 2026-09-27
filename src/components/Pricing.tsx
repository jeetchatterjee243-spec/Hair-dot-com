import React from 'react';
import { Check, Sparkles, ArrowRight, Phone } from 'lucide-react';
import { SalonService } from '../types/salon';
import { SALON_INFO } from '../data/salonData';

interface PricingProps {
  services: SalonService[];
  onBookService: (serviceId: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ services, onBookService }) => {
  const hairServices = services.filter((s) => s.category === 'hair');
  const beautyServices = services.filter((s) => s.category === 'beauty');
  const specialServices = services.filter((s) => s.category === 'special');

  const groups = [
    { title: 'Hair Craft & Styling', subtitle: 'Precision cuts, blowouts & conditioning', list: hairServices.slice(0, 5) },
    { title: 'Hair Restoration & Care', subtitle: 'Spas, treatments & chemical services', list: hairServices.slice(5) },
    { title: 'Bespoke Beauty & Spa', subtitle: 'Radiant facials, grooming & therapy', list: [...beautyServices.slice(0, 4), ...specialServices.slice(0, 1)] },
  ];

  return (
    <section id="pricing" className="relative py-24 sm:py-32 bg-[#090A0F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E2B774] mb-3">
            <span>Transparent Menu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 font-display">
            Salon Services &amp; Pricing
          </h2>
          <p className="text-base text-slate-300">
            Consult with our master stylists for custom lengths, coloring tones, or bridal packages. Exact rates may vary based on hair length and volume.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {groups.map((group, idx) => (
            <div
              key={idx}
              className="p-7 sm:p-8 rounded-2xl bg-[#11131C] border border-white/10 hover:border-[#E2B774]/30 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-1 font-display">{group.title}</h3>
                <p className="text-xs text-slate-400 mb-6">{group.subtitle}</p>

                <div className="divide-y divide-white/5">
                  {group.list.map((item) => (
                    <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-white group-hover:text-[#E2B774]">{item.name}</h4>
                        <span className="text-[11px] text-slate-400">{item.duration}</span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs sm:text-sm font-semibold text-[#E2B774] font-mono block">
                          {item.price}
                        </span>
                        <button
                          onClick={() => onBookService(item.id)}
                          className="text-[11px] text-slate-300 hover:text-white underline cursor-pointer mt-0.5"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 text-center">
                <a
                  href={`tel:${SALON_INFO.phone}`}
                  className="text-xs text-slate-300 hover:text-[#E2B774] inline-flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E2B774]" />
                  <span>Custom inquiries? Call {SALON_INFO.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
