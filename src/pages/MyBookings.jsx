import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-hot-toast';
import SectionTitle from '../components/shared/SectionTitle';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { sportIcons } from '../utils/constants';
import { FaRegCalendarAlt, FaHistory, FaBan } from 'react-icons/fa';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [confirmModalId, setConfirmModalId] = useState(null);

  const fetchMyBookings = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/bookings/my');
      if (response.data && response.data.success) {
        setBookings(response.data.data);
      }
    } catch (err) {
      console.error('Fetch bookings error:', err);
      const message = err.response?.data?.message || 'Failed to retrieve bookings.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const requestCancelBooking = (bookingId) => {
    setConfirmModalId(bookingId);
  };

  const handleCancelBooking = async () => {
    const bookingId = confirmModalId;
    if (!bookingId) return;

    setConfirmModalId(null);
    setCancellingId(bookingId);
    try {
      const response = await axiosInstance.patch(`/bookings/${bookingId}/cancel`);
      if (response.data && response.data.success) {
        toast.success('Reservation cancelled successfully.');
        
        // Optimistic UI update: update booking status in local state immediately without full page reload
        setBookings((prev) =>
          prev.map((b) => (b._id === bookingId ? { ...b, status: 'cancelled' } : b))
        );
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to cancel the booking.';
      toast.error(message);
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <section className="section-pad bg-slate-50 min-h-screen pt-28">
      <div className="container-base">
        <SectionTitle
          title="My Facility Bookings"
          subtitle="Track your active sports arena bookings, view schedules, and manage cancellations easily."
        />

        <div className="max-w-4xl mx-auto mt-10">
          
          {/* loading Skeletons */}
          {loading ? (
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-white border border-slate-100 rounded-3xl p-6 flex flex-col sm:flex-row gap-6">
                  <div className="bg-slate-200 aspect-video rounded-2xl w-full sm:w-44 h-24" />
                  <div className="flex-1 flex flex-col gap-3 justify-center">
                    <div className="bg-slate-200 h-4 rounded w-1/3" />
                    <div className="bg-slate-200 h-3 rounded w-1/2" />
                    <div className="bg-slate-200 h-3 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : bookings.length === 0 ? (
            
            /* Empty State */
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <span className="text-5xl block mb-4">🗓️</span>
              <h3 className="text-lg font-bold text-slate-800 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                No active bookings found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                You haven&apos;t reserved any sports fields yet. Discover available courts near you and start playing!
              </p>
              <Link to="/facilities" className="btn-primary text-xs py-2.5 px-6">
                Browse Facilities
              </Link>
            </div>
          ) : (
            
            /* Bookings List */
            <div className="flex flex-col gap-4">
              {bookings.map((booking) => {
                const fac = booking.facility_id || booking.facility;
                if (!fac) return null;

                const isCancelled = booking.status === 'cancelled';
                const activeSport = fac.facility_type || fac.sport || 'Football';
                const activeDate = booking.booking_date || booking.date;
                const activeSlot = booking.time_slot || booking.timeSlot;
                const activeHours = booking.hours || booking.duration;
                const activePrice = booking.total_price || booking.totalPrice;

                return (
                  <div
                    key={booking._id}
                    className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all hover:shadow-md"
                  >
                    
                    {/* Facility details */}
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      {/* img turf */}
                      <div className="w-full sm:w-36 aspect-video sm:aspect-square rounded-2xl overflow-hidden border border-slate-100 flex-shrink-0">
                        <img
                          src={fac.img}
                          alt={fac.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* metadata details */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="badge-sky text-[9px] px-2 py-0.5 flex items-center gap-1">
                            {sportIcons[activeSport]} {activeSport}
                          </span>
                          <span
                            className={`text-[9px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full inline-flex ${
                              isCancelled
                                ? 'bg-red-50 text-red-600 border border-red-100'
                                : booking.status === 'pending'
                                ? 'bg-amber-50 text-amber-600 border border-amber-100'
                                : 'bg-green-50 text-green-600 border border-green-100'
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>

                        <h3 className="font-bold text-base text-slate-800 leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                          {fac.name}
                        </h3>

                        <div className="flex flex-col gap-1 mt-2 text-xs text-slate-400">
                          <span className="flex items-center gap-1.5"><FaRegCalendarAlt className="text-green-600" /> Match Date: <strong>{activeDate}</strong></span>
                          <span className="flex items-center gap-1.5"><FaHistory className="text-green-600" /> Timeslot: <strong>{activeSlot} ({activeHours} {Number(activeHours) === 1 ? 'Hour' : 'Hours'})</strong></span>
                          <span>📍 {fac.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Pricing and Action cancel */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 gap-4">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Total Pricing</span>
                        <span className="text-lg font-black text-slate-800" style={{ fontFamily: 'var(--font-mono)' }}>
                          ৳{activePrice}
                        </span>
                      </div>

                      {!isCancelled && (
                        <button
                          onClick={() => requestCancelBooking(booking._id)}
                          disabled={cancellingId === booking._id}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-red-600 border border-red-100 hover:bg-red-50 transition-all cursor-pointer inline-flex items-center gap-1"
                        >
                          <FaBan />
                          {cancellingId === booking._id ? 'Cancelling...' : 'Cancel'}
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>

      {/* ── Custom Confirmation Modal ─────────────────────────── */}
      {confirmModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-100 p-6 text-center">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              <FaBan />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Cancel Reservation?
            </h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Are you sure you want to cancel this booking? This action cannot be undone and you will lose your timeslot.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setConfirmModalId(null)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer flex-1"
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancelBooking}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-all cursor-pointer flex-1 shadow-md shadow-red-500/20"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyBookings;
