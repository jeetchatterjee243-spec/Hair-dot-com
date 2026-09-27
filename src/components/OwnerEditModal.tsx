import React, { useState } from 'react';
import { X, Plus, Trash2, Edit2, Check, RefreshCw } from 'lucide-react';
import { SalonService, CustomerReview } from '../types/salon';
import { INITIAL_SERVICES, INITIAL_REVIEWS } from '../data/salonData';

interface OwnerEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: SalonService[];
  onUpdateServices: (services: SalonService[]) => void;
  reviews: CustomerReview[];
  onUpdateReviews: (reviews: CustomerReview[]) => void;
}

export const OwnerEditModal: React.FC<OwnerEditModalProps> = ({
  isOpen,
  onClose,
  services,
  onUpdateServices,
  reviews,
  onUpdateReviews,
}) => {
  const [activeTab, setActiveTab] = useState<'services' | 'reviews'>('services');

  // Edit service state
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState('');
  const [editName, setEditName] = useState('');
  const [editDuration, setEditDuration] = useState('');

  // New service state
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<'hair' | 'beauty' | 'special'>('hair');
  const [newPrice, setNewPrice] = useState('');
  const [newDuration, setNewDuration] = useState('45 mins');
  const [newDesc, setNewDesc] = useState('');

  if (!isOpen) return null;

  const startEditService = (s: SalonService) => {
    setEditingServiceId(s.id);
    setEditName(s.name);
    setEditPrice(s.price);
    setEditDuration(s.duration);
  };

  const saveEditService = (id: string) => {
    const updated = services.map((s) =>
      s.id === id ? { ...s, name: editName, price: editPrice, duration: editDuration } : s
    );
    onUpdateServices(updated);
    setEditingServiceId(null);
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPrice) return;
    const newService: SalonService = {
      id: `svc-${Date.now()}`,
      name: newName,
      category: newCategory,
      price: newPrice,
      duration: newDuration,
      description: newDesc || 'Specialized salon service at Hair dot com.',
    };
    onUpdateServices([...services, newService]);
    setNewName('');
    setNewPrice('');
    setNewDesc('');
  };

  const handleDeleteService = (id: string) => {
    if (confirm('Are you sure you want to remove this service?')) {
      onUpdateServices(services.filter((s) => s.id !== id));
    }
  };

  const handleDeleteReview = (id: string) => {
    onUpdateReviews(reviews.filter((r) => r.id !== id));
  };

  const handleResetDefaults = () => {
    if (confirm('Reset services and reviews to default settings?')) {
      onUpdateServices(INITIAL_SERVICES);
      onUpdateReviews(INITIAL_REVIEWS);
      localStorage.removeItem('hairdotcom_services');
      localStorage.removeItem('hairdotcom_reviews');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#10121C] border border-white/20 rounded-3xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white font-display">Salon Owner Management</h3>
            <p className="text-xs text-slate-400">
              Easily update services, adjust placeholder prices, and manage reviews.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-white/10 px-6 pt-3 gap-4">
          <button
            onClick={() => setActiveTab('services')}
            className={`pb-3 text-xs font-semibold uppercase tracking-wider cursor-pointer border-b-2 transition-colors ${
              activeTab === 'services'
                ? 'border-[#E2B774] text-[#E2B774]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Services &amp; Pricing ({services.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-xs font-semibold uppercase tracking-wider cursor-pointer border-b-2 transition-colors ${
              activeTab === 'reviews'
                ? 'border-[#E2B774] text-[#E2B774]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {activeTab === 'services' && (
            <div className="space-y-6">
              {/* Add New Service Form */}
              <form onSubmit={handleAddService} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                <span className="font-semibold text-white block">Add New Service</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Service Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                  />
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="px-3 py-2 rounded-lg bg-[#141724] border border-white/10 text-white"
                  >
                    <option value="hair">Hair Service</option>
                    <option value="beauty">Beauty Service</option>
                    <option value="special">Special Service</option>
                  </select>
                  <input
                    type="text"
                    required
                    placeholder="Price (e.g. Starting from ₹500)"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Duration (e.g. 45 mins)"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Short description"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#E2B774] text-[#090A0F] font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Service</span>
                </button>
              </form>

              {/* Service List */}
              <div className="divide-y divide-white/5">
                {services.map((s) => (
                  <div key={s.id} className="py-3 flex items-center justify-between gap-4">
                    {editingServiceId === s.id ? (
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="px-2 py-1 rounded bg-white/10 text-white"
                        />
                        <input
                          type="text"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="px-2 py-1 rounded bg-white/10 text-white font-mono"
                        />
                        <input
                          type="text"
                          value={editDuration}
                          onChange={(e) => setEditDuration(e.target.value)}
                          className="px-2 py-1 rounded bg-white/10 text-white"
                        />
                      </div>
                    ) : (
                      <div className="flex-1">
                        <span className="font-semibold text-white block">{s.name}</span>
                        <span className="text-slate-400 capitalize">{s.category} · {s.duration} · </span>
                        <span className="text-[#E2B774] font-mono">{s.price}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1">
                      {editingServiceId === s.id ? (
                        <button
                          onClick={() => saveEditService(s.id)}
                          className="p-1.5 rounded bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600/50"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => startEditService(s)}
                          className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/10"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteService(s.id)}
                        className="p-1.5 rounded text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="divide-y divide-white/5">
                {reviews.map((r) => (
                  <div key={r.id} className="py-3 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{r.name}</span>
                        <span className="text-[#E2B774]">★ {r.rating}.0</span>
                        <span className="text-slate-400">· {r.service}</span>
                      </div>
                      <p className="text-slate-300 mt-1 italic">“{r.review}”</p>
                    </div>
                    <button
                      onClick={() => handleDeleteReview(r.id)}
                      className="p-1.5 rounded text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restore Factory Defaults</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full text-xs font-semibold text-[#090A0F] bg-[#E2B774] hover:bg-[#ebd09e] cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
