import React from 'react';
import { Phone, MapPin, Instagram, Facebook, MessageCircle, Heart } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export const Footer: React.FC = () => {
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#06070A] border-t border-white/10 text-slate-400 py-16 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-5">
            <a href="#home" className="inline-block text-2xl font-bold text-white mb-3 font-display">
              Hair dot com
            </a>
            <p className="text-slate-300 max-w-sm mb-4 leading-relaxed">
              Premium Hair &amp; Beauty Experience in Durgapur. Where style meets confidence with bespoke haircuts, restorative spa treatments, and contemporary color artistry.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#E2B774] hover:text-[#090A0F] text-slate-300 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#E2B774] hover:text-[#090A0F] text-slate-300 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/91${SALON_INFO.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#E2B774] hover:text-[#090A0F] text-slate-300 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-semibold mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-[#E2B774] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Address */}
          <div className="lg:col-span-4">
            <h4 className="text-xs uppercase tracking-wider text-white font-semibold mb-4">
              Salon Location
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E2B774] shrink-0 mt-0.5" />
                <span className="text-slate-300 text-xs leading-relaxed">
                  {SALON_INFO.address}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E2B774] shrink-0" />
                <a href={`tel:${SALON_INFO.phone}`} className="text-white hover:text-[#E2B774] font-mono text-sm font-semibold">
                  {SALON_INFO.phone}
                </a>
              </div>
              <p className="text-[11px] text-slate-400">Hours: {SALON_INFO.openingHours}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with mandatory copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Hair dot com. All Rights Reserved.</p>
          <p>City Center, Durgapur · West Bengal 713216</p>
        </div>
      </div>
    </footer>
  );
};
