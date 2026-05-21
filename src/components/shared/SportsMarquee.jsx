import React from 'react';
import { sportsList, sportIcons } from '../../utils/constants';

const SportsMarquee = () => {
  // We duplicate the sports array so the infinite scroll loops seamlessly
  const scrollItems = [...sportsList, ...sportsList];

  return (
    <div className="w-full bg-slate-50 border-b border-slate-100 overflow-hidden py-6">
      <div className="flex w-max animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
        {scrollItems.map((sport, index) => (
          <div
            key={`${sport}-${index}`}
            className="flex items-center gap-3 px-6 mx-3 py-3 rounded-full bg-white border border-slate-100 shadow-sm transition-transform hover:scale-105 cursor-pointer"
          >
            <span className="text-green-600 text-xl flex items-center justify-center">
              {sportIcons[sport]}
            </span>
            <span className="text-sm font-semibold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>
              {sport}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SportsMarquee;
