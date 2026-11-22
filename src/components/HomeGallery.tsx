import React from 'react';
import { Instagram, Sparkles, ExternalLink } from 'lucide-react';

const GALLERY_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=700&q=80',
    title: 'Charcoal Suya Grills',
    category: 'Flame & Ember',
  },
  {
    url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=700&q=80',
    title: 'Grilled Salmon Royale',
    category: 'Continental Plate',
  },
  {
    url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=700&q=80',
    title: 'Imperial Dim Sum',
    category: 'Cantonese Wok',
  },
  {
    url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80',
    title: 'Artisanal Chapman',
    category: 'Cocktail Bar',
  },
  {
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80',
    title: 'VIP Gold Salon',
    category: 'Ambiance',
  },
  {
    url: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=700&q=80',
    title: 'Golden Chicken Pie',
    category: 'Artisanal Bakery',
  },
];

export default function HomeGallery() {
  return (
    <section className="py-20 bg-[#1E1D1D] relative border-t border-[#F5B900]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D99A25]">
              Visual Culinary Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
              Follow Our Kitchen on Instagram
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#282727] hover:bg-[#F5B900] hover:text-[#242323] text-[#F5B900] border border-[#F5B900]/30 text-xs font-bold uppercase tracking-wider transition-all"
          >
            <Instagram className="w-4 h-4" />
            <span>@preciousrestaurant.ng</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              className="group relative rounded-xl overflow-hidden aspect-square bg-black/40 border border-white/5 hover:border-[#F5B900]/50 transition-all cursor-pointer shadow-md"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center">
                <Instagram className="w-5 h-5 text-[#F5B900] mb-1" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                  {img.title}
                </span>
                <span className="text-[9px] text-[#D99A25]">{img.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
