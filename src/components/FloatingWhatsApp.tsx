import React from 'react';
import { MessageCircle } from 'lucide-react';
import { STORE_INFO } from '../data/menuData';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = `https://wa.me/${STORE_INFO.whatsappRaw}?text=${encodeURIComponent(
    'Hello Vrindavan Treats! I am visiting your website and would like to enquire about your menu / place an order.'
  )}`;

  return (
    <aside aria-label="WhatsApp Support" className="fixed bottom-6 right-6 z-40 group">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white px-4 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        aria-label="Chat with Vrindavan Treats on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current animate-pulse" />
        <span className="font-semibold text-sm hidden sm:inline tracking-wide">
          WhatsApp Inquiry
        </span>
        <span className="relative flex h-2.5 w-2.5 sm:hidden">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
      </a>
    </aside>
  );
};
