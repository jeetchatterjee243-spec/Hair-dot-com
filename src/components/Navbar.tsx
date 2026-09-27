import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, Sparkles, Settings } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenOwnerPanel: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenOwnerPanel }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090A0F]/85 backdrop-blur-xl border-b border-[#E2B774]/15 shadow-2xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Single Brand Wordmark in Display Font */}
          <a
            href="#home"
            className="flex items-center gap-2 group text-xl sm:text-2xl font-bold tracking-tight text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E2B774]"
          >
            <span className="font-display tracking-tight text-white group-hover:text-[#E2B774] transition-colors">
              Hair dot com
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E2B774] inline-block shadow-[0_0_8px_#E2B774]" />
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#E2B774] transition-colors relative py-1 focus:outline-none focus-visible:text-[#E2B774]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${SALON_INFO.phone}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E2B774]"
              title="Call Hair dot com"
            >
              <Phone className="w-3.5 h-3.5 text-[#E2B774]" />
              <span className="tabular-nums whitespace-nowrap">{SALON_INFO.phone}</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-[#090A0F] bg-gradient-to-r from-[#FFF0D4] via-[#E2B774] to-[#C49040] hover:brightness-110 active:scale-95 rounded-full shadow-lg shadow-[#E2B774]/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>

            {/* Quick Owner Edit Mode Button */}
            <button
              onClick={onOpenOwnerPanel}
              className="p-2 text-slate-400 hover:text-[#E2B774] hover:bg-white/5 rounded-full transition-colors focus:outline-none"
              title="Salon Owner Settings"
              aria-label="Salon Owner Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E2B774] rounded-lg"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-[#E2B774]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#090A0F]/95 backdrop-blur-2xl border-b border-[#E2B774]/20 shadow-2xl py-6 px-6 transition-all duration-300 animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-4 text-base font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-300 hover:text-[#E2B774] py-1 border-b border-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <a
                href={`tel:${SALON_INFO.phone}`}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-slate-200"
              >
                <Phone className="w-4 h-4 text-[#E2B774]" />
                <span>Call {SALON_INFO.phone}</span>
              </a>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-[#FFF0D4] via-[#E2B774] to-[#C49040] text-[#090A0F] font-semibold rounded-xl text-sm shadow-lg shadow-[#E2B774]/20"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
