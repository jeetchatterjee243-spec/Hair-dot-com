import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Users, CheckCircle2, Phone, Sparkles, MessageSquare, ArrowRight, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SalonService, Appointment } from '../types/salon';
import { SALON_INFO } from '../data/salonData';

interface AppointmentBookingProps {
  services: SalonService[];
  preselectedServiceId?: string;
  onAppointmentBooked?: (appointment: Appointment) => void;
}

export const AppointmentBooking: React.FC<AppointmentBookingProps> = ({
  services,
  preselectedServiceId,
  onAppointmentBooked,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceId, setServiceId] = useState(preselectedServiceId || (services[0]?.id || 'haircut'));
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [message, setMessage] = useState('');

  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  // Time slots for selection
  const availableSlots = [
    '10:30 AM',
    '11:30 AM',
    '12:45 PM',
    '02:15 PM',
    '03:30 PM',
    '04:45 PM',
    '06:00 PM',
    '07:15 PM',
    '08:00 PM',
  ];

  // Sync preselectedServiceId if passed from outside
  useEffect(() => {
    if (preselectedServiceId) {
      setServiceId(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  // Set default minimum date to today
  const todayString = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !date) return;

    const selectedService = services.find((s) => s.id === serviceId);
    const serviceName = selectedService ? selectedService.name : 'Salon Consultation';

    const newBooking: Appointment = {
      id: `HDC-${Math.floor(100000 + Math.random() * 900000)}`,
      fullName,
      phone,
      email: email || 'Direct Client',
      serviceId,
      serviceName,
      date,
      timeSlot,
      numberOfPeople,
      message,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
    };

    setConfirmedBooking(newBooking);
    if (onAppointmentBooked) {
      onAppointmentBooked(newBooking);
    }

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E2B774', '#FFF0D4', '#C49040'],
      });
    } catch {
      // Ignored if confetti fails
    }
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  // WhatsApp share link for direct mobile confirmation
  const getWhatsAppBookingLink = () => {
    if (!confirmedBooking) return '#';
    const text = encodeURIComponent(
      `Hello Hair dot com! I have booked an appointment.\n\n` +
      `Booking ID: ${confirmedBooking.id}\n` +
      `Name: ${confirmedBooking.fullName}\n` +
      `Service: ${confirmedBooking.serviceName}\n` +
      `Date: ${confirmedBooking.date}\n` +
      `Time: ${confirmedBooking.timeSlot}\n` +
      `Guests: ${confirmedBooking.numberOfPeople}\n` +
      `Phone: ${confirmedBooking.phone}`
    );
    return `https://wa.me/919735887000?text=${text}`;
  };

  return (
    <section id="booking" className="relative py-24 sm:py-32 bg-[#08090D] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#E2B774]/[0.04] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E2B774] mb-3">
            <span>Seamless Reservation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 font-display">
            Book an Appointment
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto">
            Reserve your styling chair at Hair dot com, Bengal Ambuja, Durgapur. For immediate same-day appointments, you can also call us directly.
          </p>

          <div className="mt-4 flex items-center justify-center gap-3">
            <a
              href={`tel:${SALON_INFO.phone}`}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/15 px-4 py-2 rounded-full transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E2B774]" />
              <span>Call Now: {SALON_INFO.phone}</span>
            </a>
          </div>
        </div>

        {/* Confirmation Screen */}
        {confirmedBooking ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-[#12141F] border border-[#E2B774]/40 shadow-2xl text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#E2B774]/20 border border-[#E2B774] flex items-center justify-center text-[#E2B774] mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-widest text-[#E2B774] block mb-1">
              Reservation Confirmed
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-display">
              We Look Forward to Welcoming You
            </h3>

            <p className="text-sm text-slate-300 max-w-md mx-auto mb-8">
              Thank you, <strong className="text-white">{confirmedBooking.fullName}</strong>. Your styling session at Hair dot com has been scheduled.
            </p>

            {/* Ticket Summary Box */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-left max-w-md mx-auto mb-8 space-y-3 font-sans text-xs sm:text-sm">
              <div className="flex justify-between pb-2 border-b border-white/10">
                <span className="text-slate-400">Booking Reference:</span>
                <span className="font-mono font-bold text-[#E2B774]">{confirmedBooking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Selected Service:</span>
                <span className="font-semibold text-white">{confirmedBooking.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date &amp; Time:</span>
                <span className="font-semibold text-white">
                  {confirmedBooking.date} at {confirmedBooking.timeSlot}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Number of Guests:</span>
                <span className="font-semibold text-white">{confirmedBooking.numberOfPeople} Person(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Contact Number:</span>
                <span className="font-mono font-semibold text-white">{confirmedBooking.phone}</span>
              </div>
            </div>

            {/* Next Step Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={getWhatsAppBookingLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-[#090A0F] bg-gradient-to-r from-[#FFF0D4] via-[#E2B774] to-[#C49040] hover:brightness-110 shadow-lg cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <div className="p-7 sm:p-10 rounded-3xl bg-[#11131C] border border-white/10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Full Name <span className="text-[#E2B774]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sourav Sen"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:border-[#E2B774] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Phone Number <span className="text-[#E2B774]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9832000000"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:border-[#E2B774] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Email & Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. client@gmail.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:border-[#E2B774] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Select Desired Service <span className="text-[#E2B774]">*</span>
                  </label>
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#141724] border border-white/10 text-white text-sm focus:border-[#E2B774] focus:outline-none transition-colors cursor-pointer"
                  >
                    {services.map((svc) => (
                      <option key={svc.id} value={svc.id}>
                        {svc.name} — {svc.price}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Date, Time & Number of People */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Select Date <span className="text-[#E2B774]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      min={todayString}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[#E2B774] focus:outline-none transition-colors cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Preferred Time Slot <span className="text-[#E2B774]">*</span>
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#141724] border border-white/10 text-white text-sm focus:border-[#E2B774] focus:outline-none transition-colors cursor-pointer"
                  >
                    {availableSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Number of People
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setNumberOfPeople(num)}
                        className={`flex-1 py-3 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                          numberOfPeople === num
                            ? 'bg-[#E2B774] text-[#090A0F]'
                            : 'bg-white/[0.04] text-slate-300 hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 4: Additional Notes */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Additional Styling Notes or Inquiries
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us if you have hair concerns, special occasion timeline, or reference styles..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:border-[#E2B774] focus:outline-none transition-colors"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full text-sm font-semibold text-[#090A0F] bg-gradient-to-r from-[#FFF0D4] via-[#E2B774] to-[#C49040] hover:brightness-110 active:scale-[0.99] shadow-xl shadow-[#E2B774]/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span>Confirm Appointment</span>
                </button>
              </div>

              <div className="text-center text-xs text-slate-400">
                <span>By booking, your chair will be reserved. We never charge pre-booking cancellation fees.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
