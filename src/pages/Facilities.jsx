import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import SectionTitle from '../components/shared/SectionTitle';
import { FaSearch, FaFutbol, FaSwimmer, FaFilter } from 'react-icons/fa';
import { GiTennisBall, GiBasketballBall, GiShuttlecock, GiGymBag } from 'react-icons/gi';

const sportCategories = [
  { label: 'All Sports', value: '' },
  { label: 'Football', value: 'Football', icon: <FaFutbol /> },
  { label: 'Tennis', value: 'Tennis', icon: <GiTennisBall /> },
  { label: 'Swimming', value: 'Swimming', icon: <FaSwimmer /> },
  { label: 'Basketball', value: 'Basketball', icon: <GiBasketballBall /> },
  { label: 'Badminton', value: 'Badminton', icon: <GiShuttlecock /> },
  { label: 'CrossFit & Gym', value: 'CrossFit & Gym', icon: <GiGymBag /> },
];

const Facilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [rating, setRating] = useState('');

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (selectedSport) params.sport = selectedSport;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (rating) params.rating = rating;

      const response = await axiosInstance.get('/facilities', { params });
      if (response.data && response.data.success) {
        setFacilities(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching facilities:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSport, rating]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchFacilities();
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedSport('');
    setMinPrice('');
    setMaxPrice('');
    setRating('');
    // Wait for state updates to settle, or pass empty parameters
    setTimeout(() => fetchFacilities(), 0);
  };

  return (
    <section className="section-pad bg-slate-50 min-h-screen pt-28">
      <div className="container-base">
        <SectionTitle
          title="All Sports Facilities"
          subtitle="Discover and reserve premium football turfs, swimming pools, tennis courts, and fitness centers near you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
          
          {/* ── Left Col: Sidebar Filters ────────────────────────── */}
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-28">
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <FaFilter className="text-green-600" /> Filters
                </h3>
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-green-600 hover:text-green-700 hover:underline cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              {/* Sport Categories list */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Sport Categories
                </h4>
                <div className="flex flex-col gap-1.5">
                  {sportCategories.map(({ label, value, icon }) => (
                    <button
                      key={label}
                      onClick={() => setSelectedSport(value)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                        selectedSport === value
                          ? 'bg-green-600 text-white shadow-md'
                          : 'bg-transparent text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {icon && <span>{icon}</span>}
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hourly Price Range */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Hourly Price (৳)
                </h4>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 outline-none focus:ring-1 focus:ring-green-500"
                  />
                  <span className="text-slate-400 text-xs">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <button
                  onClick={fetchFacilities}
                  className="btn-primary text-[10px] w-full py-2 justify-center mt-3"
                >
                  Apply Price
                </button>
              </div>

              {/* Minimum Rating Selection */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Minimum Rating
                </h4>
                <div className="flex flex-col gap-1">
                  {[4.5, 4.0, 3.5].map((val) => (
                    <label
                      key={val}
                      className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="rating"
                        checked={Number(rating) === val}
                        onChange={() => setRating(val.toString())}
                        className="rounded border-slate-200 text-green-600 focus:ring-green-500"
                      />
                      {val}★ &amp; above
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ── Right Col: Search & Facility Cards ─────────────────── */}
          <div className="lg:col-span-9">
            
            {/* Search Input Bar */}
            <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-6">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  placeholder="Search by facility name or location (e.g. Gulshan, Dhaka)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all text-slate-800"
                />
              </div>
              <button type="submit" className="btn-primary py-3 px-6 text-sm font-semibold">
                Search
              </button>
            </form>

            {/* Skeletons Loader */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse bg-white border border-slate-100 rounded-3xl p-4 flex flex-col gap-4">
                    <div className="bg-slate-200 aspect-video rounded-2xl w-full" />
                    <div className="bg-slate-200 h-4 rounded w-2/3" />
                    <div className="bg-slate-200 h-3 rounded w-1/2" />
                    <div className="bg-slate-200 h-10 rounded mt-auto w-full" />
                  </div>
                ))}
              </div>
            ) : facilities.length === 0 ? (
              
              /* Empty Search / No Results State */
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <span className="text-5xl block mb-4">🏟️</span>
                <h3 className="text-lg font-bold text-slate-800 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  No Sports Arenas Found
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                  We couldn&apos;t find any active facilities matching your filters. Try search keywords like &quot;Complex&quot; or clearing categories.
                </p>
                <button onClick={handleResetFilters} className="btn-primary text-xs py-2 px-5">
                  Reset All Filters
                </button>
              </div>
            ) : (
              
              /* Facility Grid List with Equal Card Height */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facilities.map((fac) => (
                  <div
                    key={fac._id}
                    className="card-base flex flex-col h-full bg-white border border-slate-100 shadow-sm"
                  >
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
                      <span className="absolute top-3 left-3 badge-orange text-[10px]">
                        {fac.tag}
                      </span>
                      <span className="absolute top-3 right-3 badge-sky text-[10px]">
                        {fac.facility_type || fac.sport}
                      </span>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="text-yellow-400 text-sm">★</span>
                        <span className="text-sm font-semibold text-slate-800">{fac.rating}</span>
                        <span className="text-xs text-slate-400">({fac.reviews || 0} reviews)</span>
                      </div>

                      <h3
                        className="text-base font-bold mb-2 leading-snug text-slate-800"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {fac.name}
                      </h3>

                      <p className="text-xs text-slate-500 mb-3 line-clamp-2">
                        {fac.description}
                      </p>

                      <div className="flex flex-col gap-1 mb-4 text-xs text-slate-400">
                        <span>📍 {fac.location}</span>
                        <span>⏰ {fac.hours}</span>
                        <span>👥 Capacity: {fac.capacity || 10}</span>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Price per hour</span>
                          <p
                            className="text-lg font-bold"
                            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-brand-primary)' }}
                          >
                            ৳{fac.price_per_hour || fac.price}
                            <span className="text-xs font-normal text-slate-400">/hr</span>
                          </p>
                        </div>
                        <Link
                          to={`/facilities/${fac._id}`}
                          className="btn-primary text-xs py-2 px-4 shadow-none hover:shadow-md"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};

export default Facilities;
