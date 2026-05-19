import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-hot-toast';
import SectionTitle from '../components/shared/SectionTitle';
import { FaPlus, FaTrash, FaPen, FaTimes, FaFutbol, FaSwimmer } from 'react-icons/fa';
import { GiTennisBall, GiBasketballBall, GiShuttlecock, GiGymBag } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';

const sportIcons = {
  Football: <FaFutbol />,
  Tennis: <GiTennisBall />,
  Swimming: <FaSwimmer />,
  Basketball: <GiBasketballBall />,
  Badminton: <GiShuttlecock />,
  'CrossFit & Gym': <GiGymBag />,
};

const sportsList = ['Football', 'Tennis', 'Swimming', 'Basketball', 'Badminton', 'CrossFit & Gym'];

const ManageFacilities = () => {
  const { user } = useAuth();
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  
  // Edit Modal State
  const [editingFacility, setEditingFacility] = useState(null);
  const [editName, setEditName] = useState('');
  const [editSport, setEditSport] = useState('Football');
  const [editLocation, setEditLocation] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editHours, setEditHours] = useState('');
  const [editImg, setEditImg] = useState('');
  const [editTag, setEditTag] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchMyFacilities = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/facilities');
      if (response.data && response.data.success) {
        const owned = response.data.data.filter(
          (fac) => fac.owner?._id === user?.id || fac.owner === user?.id || fac.owner_email === user?.email
        );
        setFacilities(owned);
      }
    } catch (err) {
      toast.error('Failed to load owned facilities.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyFacilities();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleDelete = async (facilityId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this facility? This will remove it permanently.'
    );
    if (!confirmDelete) return;

    setDeletingId(facilityId);
    try {
      const response = await axiosInstance.delete(`/facilities/${facilityId}`);
      if (response.data && response.data.success) {
        toast.success('Facility removed successfully.');
        setFacilities((prev) => prev.filter((fac) => fac._id !== facilityId));
      }
    } catch (err) {
      toast.error('Failed to delete facility.');
    } finally {
      setDeletingId(null);
    }
  };

  // Open Edit Modal and prefill form
  const handleOpenEditModal = (fac) => {
    setEditingFacility(fac);
    setEditName(fac.name);
    setEditSport(fac.facility_type || fac.sport);
    setEditLocation(fac.location);
    setEditPrice(fac.price_per_hour || fac.price);
    setEditHours(fac.hours);
    setEditImg(fac.img);
    setEditTag(fac.tag || 'Popular');
  };

  const handleCloseEditModal = () => {
    setEditingFacility(null);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editName || !editSport || !editLocation || !editPrice || !editImg) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setUpdating(true);
    try {
      const payload = {
        name: editName,
        facility_type: editSport,
        sport: editSport,
        location: editLocation,
        price_per_hour: Number(editPrice),
        price: Number(editPrice),
        hours: editHours,
        img: editImg,
        tag: editTag,
      };

      const response = await axiosInstance.put(`/facilities/${editingFacility._id}`, payload);
      if (response.data && response.data.success) {
        toast.success('Facility updated successfully!');
        
        // Dynamic MERN UI Update
        setFacilities((prev) =>
          prev.map((f) => (f._id === editingFacility._id ? response.data.data : f))
        );
        handleCloseEditModal();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update facility.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="section-pad bg-slate-50 min-h-screen pt-28"
    >
      <div className="container-base">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <SectionTitle
            title="Manage My Sports Facilities"
            subtitle="View, track, and manage sports complexes, pitches, or courts owned by you."
            center={false}
          />
          <Link to="/add-facility" className="btn-primary text-xs py-2.5 px-5 flex items-center gap-1">
            <FaPlus /> Add Facility
          </Link>
        </div>

        <div className="max-w-6xl mx-auto mt-10">
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-3xl h-80 w-full" />
              ))}
            </div>
          ) : facilities.length === 0 ? (
            
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <span className="text-5xl block mb-4">🏟️</span>
              <h3 className="text-lg font-bold text-slate-800 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                No registered facilities found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                You haven&apos;t registered any sports venues yet. Click below to add your first football turf or court!
              </p>
              <Link to="/add-facility" className="btn-primary text-xs py-2.5 px-6">
                Add First Facility
              </Link>
            </div>
          ) : (
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map((fac) => (
                <motion.div
                  key={fac._id}
                  layout
                  className="card-base flex flex-col h-full bg-white border border-slate-100 shadow-sm"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={fac.img && fac.img !== 'null' && fac.img !== 'undefined' && fac.img.trim() !== '' ? fac.img : '/hero-bg.png'}
                      alt={fac.name || 'Facility'}
                      className="w-full h-full object-cover"
                      onError={(e) => { 
                        if (e.currentTarget.src !== window.location.origin + '/hero-bg.png') {
                          e.currentTarget.src = '/hero-bg.png'; 
                        }
                      }}
                    />
                    <span className="absolute top-3 left-3 badge-orange text-[10px]">
                      {fac.tag}
                    </span>
                    <span className="absolute top-3 right-3 badge-sky text-[10px] flex items-center gap-1">
                      {sportIcons[fac.facility_type || fac.sport]} {fac.facility_type || fac.sport}
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

                    <div className="flex flex-col gap-1 mb-4 text-xs text-slate-400">
                      <span>📍 {fac.location}</span>
                      <span>⏰ {fac.hours}</span>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 gap-2">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Price per hour</span>
                        <p
                          className="text-base font-black text-slate-800"
                          style={{ fontFamily: 'var(--font-mono)' }}
                        >
                          ৳{fac.price_per_hour || fac.price}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        {/* Edit CTA */}
                        <button
                          onClick={() => handleOpenEditModal(fac)}
                          className="p-2.5 rounded-xl text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer text-xs"
                          aria-label="Edit facility"
                        >
                          <FaPen />
                        </button>
                        
                        {/* Delete CTA */}
                        <button
                          onClick={() => handleDelete(fac._id)}
                          disabled={deletingId === fac._id}
                          className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-600 border border-red-100 hover:bg-red-50 transition-all cursor-pointer flex items-center gap-1"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* ── STUNNING GLASS EDIT MODAL ─────────────────────────── */}
      <AnimatePresence>
        {editingFacility && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-100"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>
                  Update Facility Details
                </h3>
                <button
                  onClick={handleCloseEditModal}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all cursor-pointer"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Modal Body Form */}
              <form onSubmit={handleUpdateSubmit} className="p-6 flex flex-col gap-4 max-h-[75vh] overflow-y-auto">
                
                {/* Facility Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Facility Name *
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border text-sm text-slate-800 outline-none focus:ring-2 focus:ring-green-500/20"
                    required
                  />
                </div>

                {/* Sport Category dropdown */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Sport Category *
                  </label>
                  <select
                    value={editSport}
                    onChange={(e) => setEditSport(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border text-sm text-slate-800 outline-none focus:ring-2 focus:ring-green-500/20 bg-white"
                    required
                  >
                    {sportsList.map((sp) => (
                      <option key={sp} value={sp}>{sp}</option>
                    ))}
                  </select>
                </div>

                {/* Address */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Location Address *
                  </label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border text-sm text-slate-800 outline-none focus:ring-2 focus:ring-green-500/20"
                    required
                  />
                </div>

                {/* Price and hours side-by-side */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Price / Hr (৳) *
                    </label>
                    <input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border text-sm text-slate-800 outline-none focus:ring-2 focus:ring-green-500/20"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Operating Hours *
                    </label>
                    <input
                      type="text"
                      value={editHours}
                      onChange={(e) => setEditHours(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border text-sm text-slate-800 outline-none focus:ring-2 focus:ring-green-500/20"
                      required
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    value={editImg}
                    onChange={(e) => setEditImg(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border text-sm text-slate-800 outline-none focus:ring-2 focus:ring-green-500/20"
                    required
                  />
                </div>

                {/* Feature Tag */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Feature Tag
                  </label>
                  <input
                    type="text"
                    value={editTag}
                    onChange={(e) => setEditTag(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border text-sm text-slate-800 outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>

                {/* Save CTA */}
                <button
                  type="submit"
                  disabled={updating}
                  className="btn-primary text-sm py-3 justify-center w-full mt-4 font-bold cursor-pointer"
                >
                  {updating ? 'Saving changes...' : 'Save Changes'}
                </button>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default ManageFacilities;
