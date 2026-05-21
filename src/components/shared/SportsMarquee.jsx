import React from 'react';
import { sportsList, sportIcons } from '../../utils/constants';

const SportsMarquee = () => {
  // Ensure the list is long enough to span wide desktop screens by doubling it
  const scrollItems = [...sportsList, ...sportsList];

  const renderItems = (keyPrefix) =>
    scrollItems.map((sport, index) => (
      <div
        key={`${keyPrefix}-${sport}-${index}`}
        className="flex items-center gap-3 px-6 mx-3 py-3 rounded-full bg-white border border-slate-100 shadow-sm transition-transform hover:scale-105 cursor-pointer"
      >
        <span className="text-green-600 text-xl flex items-center justify-center">
          {sportIcons[sport]}
        </span>
        <span className="text-sm font-semibold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>
          {sport}
        </span>
      </div>
    ));

  return (
    <div className="bg-slate-50 border-b border-slate-100 py-6">
      <div className="container-base overflow-hidden">
        <div className="flex group">
          {/* Container 1 */}
          <div className="flex w-max animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
            {renderItems('l1')}
          </div>

          {/* Container 2 (duplicate for seamless loop) */}
          <div className="flex w-max animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]" aria-hidden="true">
            {renderItems('l2')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsMarquee;
