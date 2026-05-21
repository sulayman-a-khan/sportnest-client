import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { FaFutbol, FaSwimmer, FaLocationArrow, FaClock, FaCheckCircle, FaUserAlt } from 'react-icons/fa';
import { GiTennisBall, GiBasketballBall, GiShuttlecock, GiGymBag } from 'react-icons/gi';

const sportIcons = {
  Football: <FaFutbol />,
  Tennis: <GiTennisBall />,
  Swimming: <FaSwimmer />,
  Basketball: <GiBasketballBall />,
  Badminton: <GiShuttlecock />,
  'CrossFit & Gym': <GiGymBag />,
};

const defaultSlots = [
  '07:00 - 08:00', '08:00 - 09:00', '09:00 - 10:00',
  '10:00 - 11:00', '15:00 - 16:00', '16:00 - 17:00',
  '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00',
  '20:00 - 21:00', '21:00 - 22:00',
];

const parseTimeToHours = (timeStr) => {
  if (!timeStr) return null;
  const str = timeStr.trim().toLowerCase();
  const match = str.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/);
  if (!match) return null;
  let h = parseInt(match[1], 10);
  const m = parseInt(match[2] || '0', 10);
  const period = match[3];
  
  if (period === 'pm' && h < 12) h += 12;
  if (period === 'am' && h === 12) h = 0;
  return h + m / 60;
};

const FacilityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Booking Form State
  const [bookingDate, setBookingDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0] // default to tomorrow
  );
  const [timeSlot, setTimeSlot] = useState('');
  const [duration, setDuration] = useState(1);
  const [allBookings, setAllBookings] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/facilities/${id}`);
        if (response.data && response.data.success) {
          setFacility(response.data.data);
          setAllBookings(response.data.bookings || []);
        }
      } catch (err) {
        toast.error('Failed to load facility details.');
        navigate('/facilities');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id, navigate]);

  useEffect(() => {
    if (!facility) return;
    
    // Parse hours
    let startHour = 6;
    let endHour = 23;
    if (facility.hours) {
      const parts = facility.hours.split(/[-–]| to /i);
      if (parts.length === 2) {
        const s = parseTimeToHours(parts[0]);
        const e = parseTimeToHours(parts[1]);
        if (s !== null && e !== null) {
          startHour = s;
          endHour = e;
        }
      }
    }
    
    // Get booked slots for the selected date
    const bookedForDate = allBookings.filter(b => (b.booking_date || b.date) === bookingDate);
    
    // Convert booked slots to [start, end] ranges
    const bookedRanges = bookedForDate.map(b => {
      const slotStr = b.time_slot || b.timeSlot;
      if (!slotStr) return null;
      const parts = slotStr.split('-');
      if (parts.length === 2) {
        const s = parseTimeToHours(parts[0]);
        const e = parseTimeToHours(parts[1]);
        return { start: s, end: e };
      }
      return null;
    }).filter(Boolean);

    const isOverlap = (s1, e1) => {
      return bookedRanges.some(br => Math.max(s1, br.start) < Math.min(e1, br.end));
    };

    const slots = [];
    for (let i = startHour; i <= endHour - duration; i++) {
      const e = i + duration;
      if (!isOverlap(i, e)) {
        const formatTime = (h) => {
          const hh = String(Math.floor(h)).padStart(2, '0');
          const mm = String(Math.round((h % 1) * 60)).padStart(2, '0');
          return `${hh}:${mm}`;
        };
        slots.push(`${formatTime(i)} - ${formatTime(e)}`);
      }
    }
    
    setAvailableSlots(slots);
    if (slots.length > 0 && !slots.includes(timeSlot)) {
      setTimeSlot(slots[0]);
    } else if (slots.length === 0) {
      setTimeSlot('');
    }
  }, [facility, bookingDate, duration, allBookings]);

  if (loading) {
    return <LoadingSpinner fullPage={true} />;
  }

  if (!facility) {
    return null;
  }

  const computedTotal = (facility.price_per_hour || facility.price) * Number(duration);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please sign in to book sports courts.');
      navigate('/login', { state: { from: { pathname: `/facilities/${id}` } } });
      return;
    }

    setSubmitting(true);
    try {
      if (!timeSlot) {
        toast.error('Please select a valid time slot.');
        setSubmitting(false);
        return;
      }
      const payload = {
        facility_id: id,
        facility: id,
        booking_date: bookingDate,
        date: bookingDate,
        time_slot: timeSlot,
        timeSlot: timeSlot,
        hours: Number(duration),
        duration: Number(duration),
      };

      const response = await axiosInstance.post('/bookings', payload);
      if (response.data && response.data.success) {
        toast.success(response.data.message || 'Court booked successfully!');
        navigate('/my-bookings');
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Error completing booking. The slot might be taken.';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section-pad bg-slate-50 min-h-screen pt-28">
      <div className="container-base">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
          <Link to="/" className="hover:text-slate-600">Home</Link>
          <span>/</span>
          <Link to="/facilities" className="hover:text-slate-600">Facilities</Link>
          <span>/</span>
          <span className="text-slate-600">{facility.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ── Left Col: Details & Image Gallery ────────────────── */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Main Visual Arena Card */}
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="aspect-video w-full relative">
                <img
                  src={facility.img}
                  alt={facility.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 badge-orange text-xs py-1 px-3">
                  {facility.tag}
                </span>
                <span className="absolute top-4 right-4 badge-sky text-xs py-1 px-3 flex items-center gap-1.5">
                  {sportIcons[facility.facility_type || facility.sport]} {facility.facility_type || facility.sport}
                </span>
              </div>

              {/* Title & Location details */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-yellow-400 text-base">★</span>
                  <span className="text-sm font-bold text-slate-800">{facility.rating}</span>
                  <span className="text-xs text-slate-400">({facility.reviews || 0} verified reviews)</span>
                </div>

                <h1 className="text-2xl md:text-3xl font-black text-slate-800 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                  {facility.name}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-2"><FaLocationArrow className="text-green-600" /> {facility.location}</div>
                  <div className="flex items-center gap-2"><FaClock className="text-green-600" /> Operating hours: {facility.hours}</div>
                </div>

                {/* Manager Card info */}
                <div className="flex items-center gap-3 pt-6">
                  <span className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 text-sm flex items-center justify-center border">
                    <FaUserAlt />
                  </span>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Facility Manager</span>
                    <strong className="text-xs text-slate-800 block">{facility.owner?.name || 'Authorized Partner'}</strong>
                    <span className="text-[10px] text-slate-400">{facility.owner?.email || 'verified@sportnest.io'}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Standard Description / Rules card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4">
              <h3 className="text-base font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>
                Venue Booking Rules &amp; Information
              </h3>
              <p className="text-xs leading-relaxed text-slate-500">
                To guarantee high-quality environments and safety for everyone, users must adhere strictly to matching sports attire, non-marking footwear (where applicable), and respect reservations schedules. Cancellations can be completed up to 24 hours prior to game start without penalty.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                {['Proper sports gear required', 'Cancellations allowed', 'Parking facilities available', 'Drinking water provided'].map((rule) => (
                  <div key={rule} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <FaCheckCircle className="text-green-600 text-sm" /> {rule}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── Right Col: Reservation Booking Sidebar Form ────────── */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg sticky top-28">
              
              <div className="pb-4 border-b border-slate-100 mb-6">
                <span className="text-xs text-slate-400 block uppercase tracking-wider mb-1">Hourly Pricing</span>
                <p className="text-3xl font-black" style={{ color: 'var(--color-brand-primary)', fontFamily: 'var(--font-mono)' }}>
                  ৳{facility.price_per_hour || facility.price}
                  <span className="text-sm font-normal text-slate-400">/hr</span>
                </p>
              </div>

              <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
                
                {/* Pick Date */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Select Match Date
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-green-500/20"
                    required
                  />
                </div>

                {/* Choose slot */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Choose Timeslot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-green-500/20 bg-white"
                    required
                  >
                    {availableSlots.length > 0 ? (
                      availableSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))
                    ) : (
                      <option value="" disabled>No available slots</option>
                    )}
                  </select>
                </div>

                {/* Match duration */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Match Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full px-3 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-green-500/20 bg-white"
                    required
                  >
                    {[1, 2, 3, 4].map((h) => (
                      <option key={h} value={h}>{h} {h === 1 ? 'Hour' : 'Hours'}</option>
                    ))}
                  </select>
                </div>

                {/* Bill details */}
                <div className="bg-slate-50 p-4 rounded-2xl flex flex-col gap-2 mt-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Court Fee ({duration} hr)</span>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>৳{facility.price_per_hour || facility.price} × {duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>VAT &amp; service charge</span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-bold text-slate-800 border-t border-slate-200 pt-2 mt-1">
                    <span>Grand Total</span>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>৳{computedTotal}</span>
                  </div>
                </div>

                {/* Confirm Booking CTA */}
                {user ? (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary text-sm py-3.5 justify-center w-full font-bold cursor-pointer"
                  >
                    {submitting ? 'Reserving Court...' : 'Confirm Reservation'}
                  </button>
                ) : (
                  <Link
                    to="/login"
                    state={{ from: { pathname: `/facilities/${id}` } }}
                    className="btn-primary text-sm py-3.5 justify-center w-full font-bold cursor-pointer text-center block"
                  >
                    Login to Book Court
                  </Link>
                )}

                <p className="text-[10px] text-center text-slate-400">
                  Instant secure payment at checkout or pay at counter options.
                </p>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FacilityDetail;
