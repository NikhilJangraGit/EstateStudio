import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Search,
  ArrowRight,
  BadgeCheck,
  Star,
  Building2,
} from 'lucide-react';
import CustomSelect from '../components/ui/CustomSelect';
import { demoRealtors } from '../data/realtors';

const inputBase =
  'w-full bg-white/[0.04] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/50 focus:bg-white/[0.06] transition-all duration-300 text-sm';

const BookMyRealtor = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const navigate = useNavigate();

  const filteredRealtors = demoRealtors.filter((r) => {
    const matchesSearch =
      !searchQuery ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = !filterCity || r.city === filterCity;
    return matchesSearch && matchesCity;
  });

  const cities = [...new Set(demoRealtors.map((r) => r.city))];

  return (
    <div className="pt-24 md:pt-32 pb-20 md:pb-32 min-h-screen bg-transparent text-white relative overflow-hidden">
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[var(--color-primary)]/8 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-primary)]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-[2px] w-12 bg-[var(--color-primary)] rounded-full" />
            <span className="text-white text-xs font-bold tracking-[0.3em] uppercase glass-card px-4 py-1.5 rounded-full">
              Find Your Realtor
            </span>
            <div className="h-[2px] w-12 bg-[var(--color-primary)] rounded-full" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter text-white">
            Book My{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-red-400">
              Realtor
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Browse our trusted network of verified real estate professionals. Find the perfect realtor for your property needs and book a consultation.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-10 max-w-3xl mx-auto"
        >
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or specialization..."
              className={inputBase}
            />
          </div>
          <CustomSelect
            name="filterCity"
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            placeholder="All Cities"
            options={[
              { value: '', label: 'All Cities' },
              ...cities.map((city) => ({ value: city, label: city }))
            ]}
            className="w-full md:w-48"
          />
        </motion.div>

        {/* Realtor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredRealtors.map((realtor, i) => (
            <motion.div
              key={realtor.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => navigate(`/book-realtor/${realtor.id}`)}
              className="glass-card p-6 rounded-[2rem] relative overflow-hidden group flex flex-col h-full cursor-pointer hover:shadow-[0_0_30px_rgba(230,57,70,0.2)] transition-shadow duration-300"
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/0 to-[var(--color-primary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 flex flex-col flex-grow">
                {/* Top Row: Photo + Info */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="relative shrink-0">
                    <img
                      src={realtor.image}
                      alt={realtor.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-white/10 group-hover:border-[var(--color-primary)]/40 transition-colors"
                    />
                    {realtor.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[var(--color-primary)] rounded-full flex items-center justify-center border-2 border-[#111]">
                        <BadgeCheck className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-white truncate">{realtor.name}</h3>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{realtor.city}</span>
                      <span className="mx-1">•</span>
                      <span>{realtor.experience}</span>
                    </div>
                    <span className="inline-block bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full text-xs text-gray-300">
                      {realtor.specialization}
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-400 text-sm font-light leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {realtor.bio}
                </p>

                {/* Stats & Book Row */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-semibold text-white">{realtor.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Building2 className="w-3.5 h-3.5" />
                      <span className="text-xs">{realtor.deals} deals</span>
                    </div>
                  </div>
                  <Link
                    to={`/book-realtor/${realtor.id}`}
                    className="text-xs font-bold text-[var(--color-primary)] flex items-center gap-1 group-hover:gap-2 transition-all hover:text-white"
                  >
                    BOOK NOW
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredRealtors.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No realtors found matching your search.</p>
          </div>
        )}

        {/* CTA for Realtors */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8 glass-card p-8 rounded-[2rem] max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-bold mb-2 text-white">Are you a Realtor?</h3>
          <p className="text-gray-400 text-sm font-light mb-5">
            Join our network and get discovered by thousands of potential clients. Register your profile today.
          </p>
          <Link
            to="/realtor-profile"
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-red-600 transition-all hover:scale-[1.02]"
          >
            Register as a Realtor
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default BookMyRealtor;
