import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import SectionTitle from '../components/shared/SectionTitle';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { FaFutbol, FaSwimmer, FaRunning, FaUsers, FaMedal, FaCalendarAlt, FaApple, FaGooglePlay } from 'react-icons/fa';
import { GiTennisBall, GiBasketballBall, GiShuttlecock, GiGymBag } from 'react-icons/gi';
import SportsMarquee from '../components/shared/SportsMarquee';
import { sportIcons } from '../utils/constants';

/* ── Animation variants ──────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] },
  },
});

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ── Sport Icons Dictionary ───────────────────────────────── */
// Imported from constants.jsx







const Home = () => {
  const [dbFacilities, setDbFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/facilities');
        if (response.data && response.data.success) {
          // Store all facilities
          setDbFacilities(response.data.data);
        }
      } catch (err) {
        console.warn('Backend connection issue or empty facilities table. Standard mock values enabled.');
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  // Only show real database facilities
  const allFacilities = dbFacilities;
  const totalPages = Math.ceil(allFacilities.length / itemsPerPage);
  const displayFacilities = allFacilities.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      {/* ╔══════════════════════════════════════════════════╗
          ║  1. HERO BANNER                                  ║
          ╚══════════════════════════════════════════════════╝ */}
      <section 
        className="relative flex items-center min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/hero-bg.png)' }}
      >
        {/* Premium Dark Overlay for contrast */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.7) 50%, rgba(15,23,42,0.50) 100%)',
          }}
        />

        {/* Decorative background blur blob */}
        <div
          className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-3xl -z-10 opacity-20"
          style={{ background: 'var(--gradient-brand)' }}
        />

        {/* Dynamic visual alignment with relative z-10 */}
        <div className="container-base section-pad-lg pt-32 relative z-10">
          <div className="max-w-2xl">
            {/* Tag Badge */}
            <motion.div
              variants={fadeUp(0)}
              initial="hidden"
              animate="visible"
            >
              <span className="badge-green mb-6 inline-flex">
                🏟️ &nbsp; The Sports Booking Revolution
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeUp(0.1)}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Book Your{' '}
              <span className="text-gradient">Sports Facility</span>
              <br />in Seconds
            </motion.h1>

            {/* Short Description */}
            <motion.p
              variants={fadeUp(0.2)}
              initial="hidden"
              animate="visible"
              className="text-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: 'rgba(203,213,225,0.9)' }}
            >
              Discover, compare, and reserve top-tier sports complexes near you. 
              Whether it is a midnight football match, an early swim, or an intense basketball game — book instantly with absolute zero hassle.
            </motion.p>

            {/* Explore Button */}
            <motion.div
              variants={fadeUp(0.3)}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-3 mb-12"
            >
              <Link to="/facilities" className="btn-primary text-base py-3.5 px-7">
                Explore Facilities →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════╗
          ║  1.5. SPORTS MARQUEE                             ║
          ╚══════════════════════════════════════════════════╝ */}
      <SportsMarquee />

      {/* ╔══════════════════════════════════════════════════╗
          ║  2. FEATURED FACILITIES (MINIMUM 6 CARDS)        ║
          ╚══════════════════════════════════════════════════╝ */}
      <section className="section-pad" style={{ background: 'var(--color-surface)' }}>
        <div className="container-base">
          <SectionTitle
            title="Featured Facilities"
            subtitle="Explore high-quality sports arenas available for immediate booking near you."
          />

          {/* 6-Card Responsive Grid with Equal Height */}
          {loading ? (
            <div className="py-16">
              <LoadingSpinner />
            </div>
          ) : displayFacilities.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm mt-8">
              <span className="text-5xl block mb-4">🏟️</span>
              <h3 className="text-xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                No Facilities Added Yet
              </h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
                You haven't added any sports facilities to the database yet. Add your first one to see it here!
              </p>
              <Link to="/manage-facilities" className="btn-primary py-2.5 px-6 shadow-sm">
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayFacilities.map((fac, index) => {
              if (!fac) return null;
              
              const keyId = fac._id || fac.id || index;
              const isRealDbItem = !!fac._id;
              const linkTarget = isRealDbItem ? `/facilities/${fac._id}` : '/facilities';
              const activeSport = fac.facility_type || fac.sport || 'Football';
              const iconObj = sportIcons[activeSport] || <FaFutbol />;

              return (
                <div
                  key={keyId}
                  className="card-base flex flex-col h-full bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all"
                >
                  {/* Image Wrap */}
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={fac.img && fac.img !== 'null' && fac.img !== 'undefined' && fac.img.trim() !== '' ? fac.img : '/hero-bg.png'}
                      alt={fac.name || 'Facility'}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      onError={(e) => { 
                        if (e.currentTarget.src !== window.location.origin + '/hero-bg.png') {
                          e.currentTarget.src = '/hero-bg.png'; 
                        }
                      }}
                    />
                    {/* Status Tag */}
                    <span className="absolute top-3 left-3 badge-orange text-[10px]">
                      {fac.tag}
                    </span>
                    {/* Sport Type Badge */}
                    <span className="absolute top-3 right-3 badge-sky text-[10px] flex items-center gap-1">
                      {iconObj} {activeSport}
                    </span>
                    {/* Booking Count Badge */}
                    {fac.booking_count > 0 && (
                      <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-green-700 px-2.5 py-1 rounded-md text-[10px] font-bold border border-white/40 shadow-sm flex items-center gap-1">
                        🔥 {fac.booking_count}+ Booked
                      </span>
                    )}
                  </div>

                  {/* Card Content body */}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Review Stars & Rating */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-yellow-400 text-sm">★</span>
                      <span className="text-sm font-semibold" style={{ color: 'var(--color-dark)' }}>
                        {fac.rating}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
                        ({fac.reviews || 0} verified reviews)
                      </span>
                    </div>

                    {/* Facility Name */}
                    <h3
                      className="text-base font-bold mb-2 leading-snug"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--color-dark)' }}
                    >
                      {fac.name}
                    </h3>

                    <p className="text-xs text-slate-500 mb-3 line-clamp-2">
                      {fac.description}
                    </p>

                    {/* Location, Hours & Capacity metadata */}
                    <div className="flex flex-col gap-1 mb-4 text-xs" style={{ color: 'var(--color-muted)' }}>
                      <span>📍 {fac.location}</span>
                      <span>⏰ {fac.hours}</span>
                      <span>👥 Capacity: {fac.capacity || 10}</span>
                    </div>

                    {/* Pricing + Book Now CTA pinned to bottom */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Price per hour</span>
                        <p
                          className="text-lg font-bold"
                          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-brand-primary)' }}
                        >
                          ৳{fac.price_per_hour || fac.price}
                          <span className="text-xs font-normal" style={{ color: 'var(--color-muted)' }}>/hr</span>
                        </p>
                      </div>
                      <Link
                        to={linkTarget}
                        className="btn-primary text-xs py-2 px-4 shadow-none hover:shadow-md"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-white border border-slate-200 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
              >
                Previous
              </button>
              <span className="text-sm font-semibold text-slate-500">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-white border border-slate-200 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
            </>
          )}
        </div>
      </section>


      {/* ╔══════════════════════════════════════════════════╗
          ║  3. ELITE ACADEMY & EXPERT COACHING STATIC       ║
          ╚══════════════════════════════════════════════════╝ */}
      <section className="section-pad bg-white relative overflow-hidden">
        {/* Background Decorative Shape */}
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-slate-50/80 -skew-x-12 translate-x-20 rounded-l-[100px] -z-10 hidden md:block" />
        
        <div className="container-base relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Typography & Info */}
            <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
              <span className="badge-orange mb-6 inline-flex uppercase tracking-widest text-[10px] font-bold">
                Professional Training
              </span>
              <h2 
                className="text-4xl md:text-5xl font-black mb-6 leading-tight text-slate-900"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Elite Academy & <br className="hidden md:block" /> Expert Coaching
              </h2>
              <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8">
                Take your game to the next level with customized programs led by certified professional athletes. From junior foundations to adult masterclasses, our static curriculum ensures consistent growth without the pressure of live bookings.
              </p>
              
              <div className="flex items-center justify-center lg:justify-start gap-8">
                <div className="flex flex-col">
                  <span className="text-3xl md:text-4xl font-black text-green-600 mb-1">50+</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Certified Coaches</span>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div className="flex flex-col">
                  <span className="text-3xl md:text-4xl font-black text-sky-600 mb-1">3</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Skill Tiers</span>
                </div>
              </div>
            </div>

            {/* Right Column: Custom Stylized Cards (Static) */}
            <div className="flex flex-col gap-5 lg:gap-6 relative mt-6 lg:mt-0">
              {/* Card 1 */}
              <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:gap-5 transform hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center text-2xl flex-shrink-0">
                  <FaRunning />
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <div className="flex items-center justify-center sm:justify-start gap-3 mb-2 flex-wrap">
                    <h4 className="text-lg font-bold text-slate-800">Junior Development</h4>
                    <span className="badge-green text-[9px] px-2 py-0.5">Ages 6-15</span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Structured foundations focusing on teamwork, coordinate motor skills, and core rules of popular sports.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:gap-5 transform hover:-translate-y-1 transition-all ml-0 md:ml-12">
                <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center text-2xl flex-shrink-0">
                  <GiGymBag />
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <div className="flex items-center justify-center sm:justify-start gap-3 mb-2 flex-wrap">
                    <h4 className="text-lg font-bold text-slate-800">Pro League Prep</h4>
                    <span className="badge-green text-[9px] px-2 py-0.5">Ages 16-22</span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    High-intensity conditioning, tactical skill-drills, and competitive league exposure for prospective career athletes.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:gap-5 transform hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center text-2xl flex-shrink-0">
                  <FaMedal />
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <div className="flex items-center justify-center sm:justify-start gap-3 mb-2 flex-wrap">
                    <h4 className="text-lg font-bold text-slate-800">Adult Masterclass</h4>
                    <span className="badge-green text-[9px] px-2 py-0.5">Ages 23+</span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Perfect for working professionals seeking advanced technical improvement or competitive recreation clubs.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════╗
          ║  4. TEAM MATCHMAKING & COMMUNITY HUB             ║
          ╚══════════════════════════════════════════════════╝ */}
      <section className="section-pad bg-slate-900 text-white relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 bg-green-500 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20 bg-sky-500 -translate-x-1/3 translate-y-1/3" />

        <div className="container-base relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="badge-green mb-4 inline-flex">Community First</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Teammate Matchmaking
            </h2>
            <p className="text-slate-400 text-base md:text-lg">
              Never let a missing player cancel your game. Connect with active athletes in your neighborhood, join pickup squads, and build local competitive leagues easily.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 transition-all text-center flex flex-col items-center group cursor-default">
              <div className="w-16 h-16 rounded-2xl bg-green-500/20 text-green-400 flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
                <FaUsers />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Join Pickup Teams</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Jump straight into community matches with friendly players looking to fill out their rosters.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 transition-all text-center flex flex-col items-center group cursor-default">
              <div className="w-16 h-16 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
                <FaCalendarAlt />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Organized Leagues</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Register squads for structured monthly local league tournaments and regular weekend matches.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 transition-all text-center flex flex-col items-center group cursor-default">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
                <FaMedal />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Track Skill Tiers</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Earn medals, climb scoreboards, and update player ratings as you improve your game.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════╗
          ║  5. MOBILE APP DOWNLOAD SECTION STATIC           ║
          ╚══════════════════════════════════════════════════╝ */}
      <section className="section-pad relative bg-white overflow-hidden">
        {/* Background Decorative Rings */}
        <div className="absolute -top-40 -right-40 w-96 h-96 border-[40px] border-green-50 rounded-full opacity-50 pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 border-[40px] border-sky-50 rounded-full opacity-50 pointer-events-none" />
        
        <div className="container-base relative z-10">
          <div className="bg-slate-900 rounded-[40px] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden">
            
            {/* Inner glowing effect */}
            <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-green-500/30 rounded-full blur-[80px] -translate-y-1/2 -z-10" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-sky-500/20 rounded-full blur-[80px] -z-10" />

            {/* Left Content */}
            <div className="max-w-xl text-center lg:text-left relative z-10">
              <span className="badge-green mb-6 inline-flex font-bold tracking-widest text-[10px] uppercase border border-green-500/30 bg-green-500/10 text-green-400">
                Coming Soon
              </span>
              <h2 
                className="text-4xl md:text-5xl font-black mb-6 leading-tight text-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Carry the Stadium <br className="hidden md:block"/> in Your Pocket.
              </h2>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10">
                Book your favorite sports facilities on the go, track your matchmaking rating, and connect with teammates directly from the SportNest mobile app. Experience a seamless, zero-friction booking process anywhere, anytime.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {/* Non-functional App Store Button */}
                <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/10 transition-all px-6 py-3.5 rounded-2xl cursor-default group">
                  <FaApple className="text-3xl text-white group-hover:text-slate-200 transition-colors" />
                  <div className="text-left">
                    <span className="block text-[9px] text-slate-300 uppercase tracking-widest font-semibold">Download on the</span>
                    <span className="block text-lg font-bold text-white leading-none">App Store</span>
                  </div>
                </button>
                
                {/* Non-functional Google Play Button */}
                <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/10 transition-all px-6 py-3.5 rounded-2xl cursor-default group">
                  <FaGooglePlay className="text-2xl text-white group-hover:text-slate-200 transition-colors" />
                  <div className="text-left">
                    <span className="block text-[9px] text-slate-300 uppercase tracking-widest font-semibold">GET IT ON</span>
                    <span className="block text-lg font-bold text-white leading-none">Google Play</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Content - Abstract Phone Mockup Art */}
            <div className="relative w-full max-w-sm flex justify-center lg:justify-end z-10 hidden md:flex">
              <div className="relative w-64 h-[500px] bg-slate-800 rounded-[40px] border-[8px] border-slate-700 shadow-2xl overflow-hidden transform rotate-6 hover:rotate-0 transition-transform duration-500 flex flex-col">
                {/* Fake Notch */}
                <div className="absolute top-0 inset-x-0 h-7 bg-slate-700 w-1/2 mx-auto rounded-b-xl z-20"></div>
                
                {/* Fake Screen UI */}
                <div className="flex-1 bg-slate-50 p-4 pt-12 flex flex-col gap-4">
                  <div className="w-full h-32 bg-green-100 rounded-2xl"></div>
                  <div className="w-3/4 h-6 bg-slate-200 rounded-full"></div>
                  <div className="w-1/2 h-4 bg-slate-200 rounded-full mb-4"></div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="w-full h-24 bg-sky-100 rounded-2xl"></div>
                    <div className="w-full h-24 bg-orange-100 rounded-2xl"></div>
                    <div className="w-full h-24 bg-purple-100 rounded-2xl"></div>
                    <div className="w-full h-24 bg-pink-100 rounded-2xl"></div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
