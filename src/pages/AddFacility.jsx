import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-hot-toast';
import SectionTitle from '../components/shared/SectionTitle';

const sportsList = ['Football', 'Tennis', 'Swimming', 'Basketball', 'Badminton', 'CrossFit & Gym'];

const AddFacility = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [sport, setSport] = useState('Football');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [hours, setHours] = useState('6:00 AM – 11:00 PM');
  const [capacity, setCapacity] = useState('');
  const [img, setImg] = useState('');
  const [tag, setTag] = useState('Popular');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !sport || !location || !price || !img) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name,
        facility_type: sport,
        sport,
        location,
        price_per_hour: Number(price),
        price: Number(price),
        hours,
        capacity: Number(capacity || 10),
        img,
        tag,
      };

      const response = await axiosInstance.post('/facilities', payload);
      if (response.data && response.data.success) {
        toast.success(response.data.message || 'Facility registered successfully!');
        navigate('/manage-my-facilities');
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to register the facility.';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section-pad bg-slate-50 min-h-screen pt-28">
      <div className="container-base">
        <SectionTitle
          title="Add New Sports Facility"
          subtitle="List your sports complex, court, or swimming pool on SportNest to start receiving active reservations."
        />

        <div className="max-w-xl mx-auto mt-10">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg">
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              {/* Facility Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Facility / Complex Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Arena Football Club"
                  className="w-full px-3 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-green-500/20"
                  required
                />
              </div>

              {/* Sport Category dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Sport Category *
                </label>
                <select
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-green-500/20 bg-white"
                  required
                >
                  {sportsList.map((sp) => (
                    <option key={sp} value={sp}>{sp}</option>
                  ))}
                </select>
              </div>

              {/* Location description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Location / Address *
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Gulshan-2, Dhaka"
                  className="w-full px-3 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-green-500/20"
                  required
                />
              </div>

              {/* Price, Hours, and Capacity */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Hourly Price */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Price / Hour (৳) *
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 1200"
                    min="0"
                    className="w-full px-3 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-green-500/20"
                    required
                  />
                </div>

                {/* Operating hours */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Operating Hours *
                  </label>
                  <input
                    type="text"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    placeholder="e.g. 6:00 AM – 11:00 PM"
                    className="w-full px-3 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-green-500/20"
                    required
                  />
                </div>

                {/* Capacity */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Capacity *
                  </label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder="e.g. 10"
                    min="1"
                    className="w-full px-3 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-green-500/20"
                    required
                  />
                </div>

              </div>

              {/* Image URL */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Facility Image URL *
                </label>
                <input
                  type="url"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                  placeholder="e.g. https://images.unsplash.com/..."
                  className="w-full px-3 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-green-500/20"
                  required
                />
              </div>

              {/* Tag metadata */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Feature Tag
                </label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="e.g. Top Rated, Pro Turf, Olympic Size"
                  className="w-full px-3 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary text-sm py-3.5 justify-center w-full mt-2 font-bold cursor-pointer"
              >
                {submitting ? 'Registering Arena...' : 'Add Sports Facility'}
              </button>

            </form>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AddFacility;
