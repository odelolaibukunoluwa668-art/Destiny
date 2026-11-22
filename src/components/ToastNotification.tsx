import React from 'react';
import { Sparkles, X, CheckCircle2 } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export default function ToastNotification() {
  const { toast, dismissToast } = useRestaurant();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-sm w-full bg-[#1C1B1B]/95 text-white rounded-xl shadow-2xl border border-[#F5B900]/40 p-3.5 backdrop-blur-md flex items-center gap-3 animate-slide-up">
      {toast.itemImage ? (
        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-[#F5B900]/30 bg-black/50">
          <img
            src={toast.itemImage}
            alt="Dish thumbnail"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-9 h-9 rounded-lg bg-[#F5B900]/20 text-[#F5B900] flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#D99A25] flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#F5B900]" /> PRECIOUS Kitchen
        </div>
        <p className="text-xs text-gray-100 font-medium truncate">{toast.message}</p>
      </div>

      <button
        onClick={dismissToast}
        className="p-1 text-gray-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
