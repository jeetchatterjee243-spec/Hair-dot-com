import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Plus } from 'lucide-react';
import { CustomerReview } from '../types/salon';

interface ReviewsProps {
  reviews: CustomerReview[];
  onAddReview: (review: Omit<CustomerReview, 'id'>) => void;
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews, onAddReview }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    service: 'Haircut & Styling',
    review: '',
  });

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.review) return;
    onAddReview({
      ...newReview,
      date: 'Verified Client',
    });
    setNewReview({ name: '', rating: 5, service: 'Haircut & Styling', review: '' });
    setIsModalOpen(false);
  };

  const current = reviews[currentIndex] || reviews[0];

  return (
    <section id="reviews" className="relative py-24 sm:py-32 bg-[#090A0F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E2B774] mb-3">
            <span>Client Perspectives</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 font-display">
            Stories of Style &amp; Satisfaction
          </h2>
          <p className="text-base text-slate-300">
            Real feedback from clients visiting our City Center salon in Bengal Ambuja, Durgapur.
          </p>
        </div>

        {/* Carousel Card */}
        {current && (
          <div className="max-w-3xl mx-auto relative">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#12141F] border border-white/10 shadow-2xl relative">
              <Quote className="w-12 h-12 text-[#E2B774]/20 absolute top-8 right-8 pointer-events-none" />

              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < current.rating ? 'text-[#E2B774] fill-[#E2B774]' : 'text-slate-600'
                    }`}
                  />
                ))}
                <span className="text-xs text-slate-400 ml-2 font-mono tabular-nums">
                  {current.rating}.0 / 5.0
                </span>
              </div>

              {/* Review Text */}
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed italic mb-8">
                “{current.review}”
              </p>

              {/* Author & Service Info */}
              <div className="flex items-center justify-between border-t border-white/5 pt-6">
                <div>
                  <h4 className="text-base font-bold text-white font-display">{current.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span>{current.service}</span>
                    <span aria-hidden="true">·</span>
                    <span>{current.date}</span>
                  </div>
                </div>

                {/* Carousel Navigation Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevReview}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-[#E2B774] hover:text-[#090A0F] text-white border border-white/10 transition-colors cursor-pointer"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextReview}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-[#E2B774] hover:text-[#090A0F] text-white border border-white/10 transition-colors cursor-pointer"
                    aria-label="Next review"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Pagination Indicators */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'w-6 bg-[#E2B774]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Leave a review button */}
        <div className="text-center mt-10">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#E2B774] hover:underline cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Visited Hair dot com? Share Your Experience</span>
          </button>
        </div>
      </div>

      {/* Write Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12141F] border border-white/15 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-in fade-in duration-200">
            <h3 className="text-xl font-bold text-white mb-2 font-display">Share Your Review</h3>
            <p className="text-xs text-slate-400 mb-6">
              Help fellow clients discover Hair dot com in City Center Durgapur.
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="e.g. Rohini Sen"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#E2B774] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Service Received</label>
                <input
                  type="text"
                  required
                  value={newReview.service}
                  onChange={(e) => setNewReview({ ...newReview, service: e.target.value })}
                  placeholder="e.g. Haircut & Spa"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#E2B774] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newReview.rating ? 'text-[#E2B774] fill-[#E2B774]' : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Feedback</label>
                <textarea
                  required
                  rows={3}
                  value={newReview.review}
                  onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                  placeholder="Tell us about your experience..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#E2B774] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-[#090A0F] bg-[#E2B774] hover:bg-[#ebce99] cursor-pointer"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
