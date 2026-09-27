import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Compass, Phone, MapPin, Sparkles } from 'lucide-react';
import { HairFiberScene } from './components/HairFiberScene';
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Pricing } from './components/Pricing';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Reviews } from './components/Reviews';
import { AppointmentBooking } from './components/AppointmentBooking';
import { LocationContact } from './components/LocationContact';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { OwnerEditModal } from './components/OwnerEditModal';
import { INITIAL_SERVICES, INITIAL_GALLERY, INITIAL_REVIEWS, SALON_INFO } from './data/salonData';
import { SalonService, CustomerReview, Appointment } from './types/salon';

export default function App() {
  // Persistent state for salon owner modifications
  const [services, setServices] = useState<SalonService[]>(() => {
    try {
      const saved = localStorage.getItem('hairdotcom_services');
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem('hairdotcom_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [galleryItems] = useState(INITIAL_GALLERY);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string>('haircut');

  // Sync to localStorage
  const handleUpdateServices = (newServices: SalonService[]) => {
    setServices(newServices);
    try {
      localStorage.setItem('hairdotcom_services', JSON.stringify(newServices));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  };

  const handleUpdateReviews = (newReviews: CustomerReview[]) => {
    setReviews(newReviews);
    try {
      localStorage.setItem('hairdotcom_reviews', JSON.stringify(newReviews));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  };

  const handleAddReview = (newReview: Omit<CustomerReview, 'id'>) => {
    const updated = [
      { ...newReview, id: `rev-${Date.now()}` },
      ...reviews,
    ];
    handleUpdateReviews(updated);
  };

  // Scroll to booking section and optionally preselect service
  const handleScrollToBooking = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceForBooking(serviceId);
    }
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08090D] text-[#F3F4F6] selection:bg-[#E2B774] selection:text-[#090A0F] antialiased">
      {/* Sticky Blurred Glass Navigation Bar */}
      <Navbar
        onOpenBooking={() => handleScrollToBooking()}
        onOpenOwnerPanel={() => setIsOwnerModalOpen(true)}
      />

      <main>
        {/* Full-Screen Hero Section with Framer Motion and React Three Fiber 3D Hair Strands */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
        >
          {/* Background Salon Imagery Layer */}
          <div className="absolute inset-0 z-0">
            <img
              src="/src/assets/images/hero_luxury_salon_1790525123889.jpg"
              alt="Hair dot com Luxury Salon Interior in Durgapur"
              className="w-full h-full object-cover object-center filter brightness-[0.25] contrast-[1.15] scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#08090D]/90 via-[#08090D]/75 to-[#08090D]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(226,183,116,0.12),transparent_70%)]" />
          </div>

          {/* 3D React Three Fiber Canvas with Floating Hair Strands & Scissors */}
          <div className="absolute inset-0 z-10">
            <HairFiberScene />
          </div>

          {/* Foreground Hero Content with Framer Motion Entrance Animations */}
          <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-auto">
            {/* Trust Marker Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#E2B774]/30 backdrop-blur-md mb-6 shadow-inner"
            >
              <MapPin className="w-3.5 h-3.5 text-[#E2B774]" />
              <span className="text-xs font-medium tracking-wide text-slate-300">
                City Center, Durgapur · Bengal Ambuja
              </span>
            </motion.div>

            {/* Brand Title: HAIR DOT COM */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-4 uppercase drop-shadow-2xl"
            >
              <span className="block font-display tracking-tight text-white">
                HAIR DOT COM
              </span>
            </motion.h1>

            {/* Subheading: Premium Hair & Beauty Experience in Durgapur */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl sm:text-2xl md:text-3xl font-light text-slate-200 tracking-wide mb-3 max-w-3xl mx-auto"
            >
              Premium Hair &amp; Beauty Experience in Durgapur
            </motion.p>

            {/* Supporting Line: Style. Confidence. You. */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center gap-3 mb-9"
            >
              <span className="h-px w-8 sm:w-12 bg-[#E2B774]/40" />
              <p className="text-base sm:text-lg font-serif italic text-[#E2B774] tracking-widest uppercase">
                “Style. Confidence. You.”
              </p>
              <span className="h-px w-8 sm:w-12 bg-[#E2B774]/40" />
            </motion.div>

            {/* Two Primary CTAs: Book an Appointment & Explore Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-10"
            >
              <button
                onClick={() => handleScrollToBooking()}
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
            </motion.div>

            {/* Phone Number Access: 9735887000 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-slate-400"
            >
              <span>Direct Salon Inquiries:</span>
              <a
                href={`tel:${SALON_INFO.phone}`}
                className="inline-flex items-center gap-2 text-white hover:text-[#E2B774] font-semibold tracking-wider transition-colors px-3 py-1 rounded-lg bg-white/5 border border-white/10"
              >
                <Phone className="w-3.5 h-3.5 text-[#E2B774]" />
                <span className="tabular-nums font-mono">{SALON_INFO.phone}</span>
              </a>
            </motion.div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-4 inset-x-0 flex justify-center z-20 pointer-events-none opacity-70">
            <div className="flex flex-col items-center gap-1.5 text-xs text-slate-400">
              <span className="text-[10px] uppercase tracking-widest font-mono">Scroll to explore</span>
              <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1">
                <div className="w-1 h-2 rounded-full bg-[#E2B774] animate-bounce" />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <About />

        {/* Services Section */}
        <Services
          services={services}
          onBookService={(serviceId) => handleScrollToBooking(serviceId)}
        />

        {/* Gallery Showcase */}
        <Gallery galleryItems={galleryItems} />

        {/* Pricing Section */}
        <Pricing
          services={services}
          onBookService={(serviceId) => handleScrollToBooking(serviceId)}
        />

        {/* Why Choose Hair dot com? */}
        <WhyChooseUs />

        {/* Customer Reviews Section */}
        <Reviews reviews={reviews} onAddReview={handleAddReview} />

        {/* Interactive Appointment Booking System */}
        <AppointmentBooking
          services={services}
          preselectedServiceId={selectedServiceForBooking}
        />

        {/* Location & Contact Section */}
        <LocationContact onOpenBooking={() => handleScrollToBooking()} />

        {/* Final CTA with 3D Canvas */}
        <FinalCTA onOpenBooking={() => handleScrollToBooking()} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Salon Owner Management Modal */}
      <OwnerEditModal
        isOpen={isOwnerModalOpen}
        onClose={() => setIsOwnerModalOpen(false)}
        services={services}
        onUpdateServices={handleUpdateServices}
        reviews={reviews}
        onUpdateReviews={handleUpdateReviews}
      />
    </div>
  );
}
