import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, Send, CheckCircle2, Calendar } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface LocationContactProps {
  onOpenBooking: () => void;
}

export const LocationContact: React.FC<LocationContactProps> = ({ onOpenBooking }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#090A0F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E2B774] mb-3">
            <span>Visit or Inquire</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 font-display">
            Location &amp; Inquiries
          </h2>
          <p className="text-base text-slate-300">
            Conveniently situated in the prime Bengal Ambuja Housing Complex, near Ambuja Kali Bari in City Center, Durgapur.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: Salon Details & Interactive Map */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-7 sm:p-8 rounded-3xl bg-[#11131C] border border-white/10 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6 font-display">Hair dot com</h3>

              <div className="space-y-5 text-sm">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E2B774]/10 border border-[#E2B774]/20 flex items-center justify-center text-[#E2B774] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                      Salon Address
                    </h4>
                    <p className="text-slate-200 leading-relaxed">{SALON_INFO.address}</p>
                    <p className="text-xs text-[#E2B774] mt-1 font-medium">Landmark: {SALON_INFO.landmark}</p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E2B774]/10 border border-[#E2B774]/20 flex items-center justify-center text-[#E2B774] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                      Direct Telephone
                    </h4>
                    <a
                      href={`tel:${SALON_INFO.phone}`}
                      className="text-base font-bold text-white hover:text-[#E2B774] font-mono transition-colors"
                    >
                      {SALON_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E2B774]/10 border border-[#E2B774]/20 flex items-center justify-center text-[#E2B774] shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                      Operating Schedule
                    </h4>
                    <p className="text-slate-200">{SALON_INFO.openingHours}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Open all 7 days for your convenience</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-3">
                <a
                  href={SALON_INFO.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-[#090A0F] bg-gradient-to-r from-[#FFF0D4] via-[#E2B774] to-[#C49040] hover:brightness-110 shadow-md cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>

                <a
                  href={`tel:${SALON_INFO.phone}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#E2B774]" />
                  <span>Call Now</span>
                </a>

                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#E2B774]" />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>

            {/* Embedded Responsive Map */}
            <div className="rounded-3xl overflow-hidden border border-white/10 h-64 sm:h-72 bg-[#12141F] shadow-lg relative">
              <iframe
                title="Hair dot com Location in Bengal Ambuja Durgapur"
                src={SALON_INFO.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Contact Inquiries Form */}
          <div className="lg:col-span-5">
            <div className="p-7 sm:p-8 rounded-3xl bg-[#11131C] border border-white/10 shadow-xl h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2 font-display">Send a Message</h3>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  Have questions regarding services, pricing, or custom events? Drop us a note and we will get back promptly.
                </p>

                {isSubmitted ? (
                  <div className="p-6 rounded-2xl bg-white/5 border border-[#E2B774]/30 text-center py-12 animate-in zoom-in-95">
                    <CheckCircle2 className="w-12 h-12 text-[#E2B774] mx-auto mb-3" />
                    <h4 className="text-lg font-bold text-white font-display mb-1">Message Sent</h4>
                    <p className="text-xs text-slate-300 max-w-xs mx-auto mb-6">
                      Thank you for contacting Hair dot com. We will get back to you shortly.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs text-[#E2B774] hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:border-[#E2B774] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Phone</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Your contact number"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:border-[#E2B774] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Your email address"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:border-[#E2B774] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Message</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="How can we assist your hair & styling needs?"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:border-[#E2B774] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-full text-xs font-semibold text-[#090A0F] bg-gradient-to-r from-[#FFF0D4] via-[#E2B774] to-[#C49040] hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-slate-400 text-center">
                Need urgent assistance? Call us directly at <span className="text-white font-mono">{SALON_INFO.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
