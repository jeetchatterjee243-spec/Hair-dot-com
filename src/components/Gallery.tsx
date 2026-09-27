import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../types/salon';

interface GalleryProps {
  galleryItems: GalleryItem[];
}

export const Gallery: React.FC<GalleryProps> = ({ galleryItems }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Showcase' },
    { id: 'haircuts', label: 'Haircuts' },
    { id: 'styling', label: 'Hair Styling' },
    { id: 'color', label: 'Hair Color' },
    { id: 'beauty', label: 'Beauty & Spa' },
    { id: 'interior', label: 'Salon Interior' },
  ];

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  const openLightbox = (index: number) => {
    setSelectedItemIndex(index);
  };

  const closeLightbox = () => {
    setSelectedItemIndex(null);
  };

  const nextImage = () => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((selectedItemIndex + 1) % filteredItems.length);
  };

  const prevImage = () => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((selectedItemIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const currentItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-[#08090D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E2B774] mb-3">
            <span>Visual Portfolios</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 font-display">
            The Hair dot com Aesthetic
          </h2>
          <p className="text-base text-slate-300">
            A curated look inside our styling work and contemporary salon environment in Bengal Ambuja, Durgapur.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex items-center justify-center mb-12 overflow-x-auto pb-2">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeFilter === tab.id
                    ? 'bg-gradient-to-r from-[#FFF0D4] via-[#E2B774] to-[#C49040] text-[#090A0F] font-semibold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-2xl overflow-hidden bg-[#11131C] border border-white/10 hover:border-[#E2B774]/50 transition-all duration-300 cursor-pointer shadow-lg aspect-[4/3]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F]/90 via-[#090A0F]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-xs uppercase tracking-widest text-[#E2B774] font-medium mb-1">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-white font-display mb-1">{item.title}</h3>
                <p className="text-xs text-slate-300 line-clamp-2">{item.caption}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#E2B774]">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Enlarge Preview</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer z-50"
            aria-label="Close image lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {filteredItems.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 sm:left-8 p-3 text-white bg-white/10 hover:bg-[#E2B774] hover:text-[#090A0F] rounded-full transition-colors cursor-pointer z-50"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 sm:right-8 p-3 text-white bg-white/10 hover:bg-[#E2B774] hover:text-[#090A0F] rounded-full transition-colors cursor-pointer z-50"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="max-w-4xl w-full flex flex-col items-center">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl max-h-[75vh]">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="w-auto h-auto max-h-[75vh] object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-center mt-5">
              <span className="text-xs uppercase tracking-widest text-[#E2B774] block mb-1">
                {currentItem.category}
              </span>
              <h3 className="text-xl font-bold text-white font-display mb-1">{currentItem.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">{currentItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
