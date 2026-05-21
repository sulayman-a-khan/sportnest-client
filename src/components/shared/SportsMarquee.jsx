import React from 'react';
import { sportsList, sportIcons } from '../../utils/constants';

const SportsMarquee = () => {
  // Ensure the list is long enough to span wide desktop screens by doubling it
  const scrollItems = [...sportsList, ...sportsList];

  return (
    /* Full-width background strip */
    <div className="w-full bg-slate-50 border-b border-slate-100 py-6">
      {/* Constrained to site layout width — matches container-base (max-w-[1280px]) */}
      <div className="container-base overflow-hidden flex group">

        {/* Container 1 */}
        <div className="flex w-max animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
          {scrollItems.map((sport, index) => (
            <div
              key={`l1-${sport}-${index}`}
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

        {/* Container 2 (Perfect duplicate for the seamless loop) */}
        <div className="flex w-max animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]" aria-hidden="true">
          {scrollItems.map((sport, index) => (
            <div
              key={`l2-${sport}-${index}`}
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
    </div>
  );
};

export default SportsMarquee;
