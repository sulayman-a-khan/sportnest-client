import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import SectionTitle from '../components/shared/SectionTitle';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { FaFutbol, FaSwimmer, FaRunning, FaUsers, FaMedal, FaCalendarAlt } from 'react-icons/fa';
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



/* ── Extra Section 1: Coaching Programs ─────────────────── */
const academyPrograms = [
  {
    title: 'Junior Development Academy',
    ageGroup: 'Ages 6 - 15',
    desc: 'Structured sports foundations focusing on teamwork, coordinate motor skills, and core rules of popular sports.',
    perks: ['Professional certified youth trainers', 'Flexible weekend sessions', 'Progress reports & skill tracking'],
  },
  {
    title: 'Pro League Preparatory',
    ageGroup: 'Ages 16 - 22',
    desc: 'High-intensity conditioning, tactical skill-drills, and competitive league exposure for prospective career athletes.',
    perks: ['Personalized physical assessment', 'Video analysis of movement', 'Access to exclusive local tryouts'],
  },
  {
    title: 'Adult Performance Masterclass',
    ageGroup: 'Ages 23+',
    desc: 'Perfect for working professionals seeking advanced technical improvement or competitive recreation clubs.',
    perks: ['Evening and morning matches', 'Strategy analysis board', 'Active league scoreboards'],
  },
];

/* ── Extra Section 2: Matchmaking Players Mock ───────────── */
const matchmakingQueue = [
  { name: 'Sameer Rahman', sport: 'Football', skill: 'Intermediate', lookingFor: 'Needs 2 players', time: 'Today, 6:00 PM' },
  { name: 'Nisha Tasnim', sport: 'Tennis', skill: 'Advanced', lookingFor: 'Needs a singles partner', time: 'Tomorrow, 8:00 AM' },
  { name: 'Farhan Kabir', sport: 'Basketball', skill: 'Beginner', lookingFor: 'Needs 5v5 pickup squad', time: 'Wednesday, 7:30 PM' },
];

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
          ║  3. EXTRA CREATIVE SECTION 1: COACHING ACADEMY   ║
          ╚══════════════════════════════════════════════════╝ */}
      <section className="section-pad bg-white">
        <div className="container-base">
          <SectionTitle
            title="Elite Academy & Expert Coaching"
            subtitle="Take your game to the next level with customized programs led by certified professional athletes."
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {academyPrograms.map(({ title, ageGroup, desc, perks }, idx) => (
              <motion.div
                key={title}
                variants={fadeUp(idx * 0.1)}
                className="flex flex-col h-full p-6 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all shadow-sm hover:shadow-md"
                style={{ background: 'var(--color-surface)' }}
              >
                {/* Age limit badge */}
                <div className="mb-4">
                  <span className="badge-green text-xs">
                    {ageGroup}
                  </span>
                </div>

                {/* Program title */}
                <h3 
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-dark)' }}
                >
                  {title}
                </h3>

                {/* Program desc */}
                <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: 'var(--color-muted)' }}>
                  {desc}
                </p>

                {/* Program bullet benefits */}
                <ul className="flex flex-col gap-2 mb-6 border-t border-slate-200/50 pt-4">
                  {perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="text-green-600 font-bold">✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>

                {/* standard button style */}
                <Link to="/facilities" className="btn-primary text-xs py-2.5 justify-center w-full mt-auto">
                  View Program Schedule →
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════╗
          ║  4. EXTRA CREATIVE SECTION 2: MATCHMAKING HUB     ║
          ╚══════════════════════════════════════════════════╝ */}
      <section className="section-pad bg-slate-900 text-white relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-10 bg-green-500 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-10 bg-sky-500 translate-x-1/2 translate-y-1/2" />

        <div className="container-base relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col: Explanatory Copy */}
            <div className="lg:col-span-5">
              <SectionTitle
                title="Teammate Matchmaking"
                subtitle="Never let a missing player cancel your game again. Connect with active sports players in your neighbourhood, join existing weekend squads, and build local competitive leagues easily."
                center={false}
              />

              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-green-400">
                    <FaUsers />
                  </span>
                  <div>
                    <h4 className="font-semibold text-sm">Join Pickup Teams</h4>
                    <p className="text-xs text-slate-400">Jump straight into community matches with friendly players.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-sky-400">
                    <FaCalendarAlt />
                  </span>
                  <div>
                    <h4 className="font-semibold text-sm">Organized Leagues</h4>
                    <p className="text-xs text-slate-400">Register squads for structured monthly local league tournaments.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-orange-400">
                    <FaMedal />
                  </span>
                  <div>
                    <h4 className="font-semibold text-sm">Track Skill Tiers</h4>
                    <p className="text-xs text-slate-400">Earn medals, climb scoreboards, and update player ratings.</p>
                  </div>
                </div>
              </div>

              {/* Same Button Style */}
              <Link to="/register" className="btn-primary text-sm py-3 px-6 shadow-none hover:shadow-lg">
                Join Matchmaking Hub
              </Link>
            </div>

            {/* Right Col: Interactive Visual Mock System */}
            <div className="lg:col-span-7">
              <div className="p-6 rounded-2xl border border-white/10" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs uppercase tracking-widest font-semibold text-slate-400">
                    Active Match Lobby
                  </span>
                  <span className="badge-green text-[10px]">
                    ● 42 Players Online
                  </span>
                </div>

                {/* Mock Lobby Queue Cards */}
                <div className="flex flex-col gap-4">
                  {matchmakingQueue.map(({ name, sport, skill, lookingFor, time }) => (
                    <div 
                      key={name}
                      className="p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:bg-white/5"
                      style={{ background: 'rgba(255,255,255,0.02)' }}
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <h5 className="font-bold text-sm text-white">{name}</h5>
                          <span className="badge-sky text-[9px] px-2 py-0.5">{sport}</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Skill: <strong className="text-slate-200">{skill}</strong> · {lookingFor}
                        </p>
                      </div>

                      <div className="text-left sm:text-right w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0">
                        <span className="text-[10px] text-slate-400 block mb-1">Schedule</span>
                        <span className="text-xs text-green-400 font-medium block">{time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════╗
          ║  5. CTA SECTION                                  ║
          ╚══════════════════════════════════════════════════╝ */}
      <section className="section-pad">
        <div className="container-base">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl px-8 py-16 text-center text-white"
            style={{ background: 'var(--gradient-brand)' }}
          >
            {/* Gradient background circles */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-20"
              style={{ background: 'rgba(255,255,255,0.4)', transform: 'translate(30%,-30%)' }} />
            <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full blur-3xl opacity-15"
              style={{ background: 'rgba(0,0,0,0.3)', transform: 'translate(-30%,30%)' }} />

            <div className="relative z-10">
              <span className="inline-block text-4xl mb-4">🏆</span>
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Ready to Book Your Next Game?
              </h2>
              <p className="text-base mb-8 max-w-md mx-auto opacity-90">
                Join thousands of local athletes booking football turf, tennis courts, and swimming pools on SportNest daily.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/register"
                  id="cta-register-btn"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-base transition-all hover:scale-105 hover:shadow-2xl"
                  style={{ background: '#fff', color: 'var(--color-brand-primary)' }}
                >
                  Start Booking Free →
                </Link>
                <Link
                  to="/facilities"
                  id="cta-browse-btn"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-base border-2 border-white/40 transition-all hover:bg-white/10 hover:scale-105"
                >
                  Browse Facilities
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
