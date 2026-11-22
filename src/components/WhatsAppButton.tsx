import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappNumber = '23480077324687';
  const defaultMessage = encodeURIComponent(
    'Hello PRECIOUS Concierge! I would like to make an inquiry / place a custom culinary order.'
  );

  return (
    <aside aria-label="WhatsApp Concierge" className="fixed bottom-6 right-6 z-40 flex items-center">
      {/* Interactive Tooltip Card */}
      {showTooltip && (
        <div className="hidden md:flex flex-col bg-[#242323] text-white p-3.5 rounded-2xl shadow-2xl border border-[#F5B900]/40 mr-3 w-64 animate-fade-in relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#43852C] animate-ping" />
            <span className="text-xs font-bold text-[#F5B900]">PRECIOUS Concierge Online</span>
          </div>
          <p className="text-[11px] text-gray-300 leading-snug">
            Need table reservations, fast delivery status, or custom catering? Chat with us live!
          </p>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-13 h-13 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(37,211,102,0.5)] hover:scale-105 active:scale-95 transition-all p-3.5 relative group"
        aria-label="Chat with PRECIOUS Concierge on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#F5B900] border-2 border-[#242323]" />
      </a>
    </aside>
  );
}
