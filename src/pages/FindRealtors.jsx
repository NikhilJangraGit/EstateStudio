import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin, Briefcase, Star, Shield, Loader2, ArrowRight, MessageCircle, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const FindRealtors = () => {
  const [realtors, setRealtors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { API_URL } = useAuth();

  useEffect(() => {
    const fetchRealtors = async () => {
      try {
        const res = await fetch(`${API_URL}/realtors`);
        const data = await res.json();
        setRealtors(data);
      } catch (error) {
        console.error('Failed to fetch realtors:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRealtors();
  }, [API_URL]);

  const filteredRealtors = realtors.filter(realtor => 
    realtor.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    realtor.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    realtor.specialization?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--color-background)] pt-24 pb-20">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-primary)]/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-widest uppercase mb-6">
            Find Your <span className="text-[var(--color-primary)]">Realtor</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            Connect with the industry's most trusted and high-performing real estate professionals in your city.
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name, city, or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/50 transition-all shadow-xl"
            />
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-10 h-10 text-[var(--color-primary)] animate-spin" />
          </div>
        ) : filteredRealtors.length === 0 ? (
          <div className="text-center text-gray-500 mt-20 text-xl">
            No realtors found matching your search.
          </div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredRealtors.map((realtor) => (
              <motion.div 
                key={realtor.uid}
                variants={fadeUp}
                className="glass-card rounded-[2rem] p-6 flex flex-col group relative overflow-hidden"
              >
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--color-primary)]/10 rounded-full blur-[40px] group-hover:bg-[var(--color-primary)]/20 transition-colors duration-500 pointer-events-none" />
                
                <div className="flex items-start gap-4 mb-4 relative z-10">
                  <div className="relative shrink-0">
                    {realtor.photoData ? (
                       <img 
                       src={realtor.photoData} 
                       alt={realtor.name} 
                       className="w-20 h-20 rounded-2xl object-cover border-2 border-white/10 group-hover:border-[var(--color-primary)]/50 transition-colors"
                     />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-2xl font-bold text-white border-2 border-white/10 group-hover:border-[var(--color-primary)]/50 transition-colors">
                        {realtor.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    {realtor.isVerified && (
                      <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-black flex items-center gap-1 shadow-lg" title="Verified Profile">
                        <Shield className="w-3 h-3" />
                        PRO
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white group-hover:text-[var(--color-primary)] transition-colors truncate">{realtor.name}</h3>
                    <div className="flex items-center text-[var(--color-primary)] mt-1">
                      <Star className="w-4 h-4 fill-[var(--color-primary)]" />
                      <span className="ml-1 text-sm font-bold">5.0</span>
                      <span className="mx-2 text-gray-600">•</span>
                      <span className="text-xs font-medium text-gray-400 bg-white/5 px-2 py-0.5 rounded-md truncate">Verified</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-8 relative z-10 flex-grow">
                  <div className="flex items-center text-sm text-gray-300">
                    <MapPin className="w-4 h-4 mr-3 text-[var(--color-primary)]" />
                    {realtor.city || 'Not specified'}
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Briefcase className="w-4 h-4 mr-3 text-[var(--color-primary)]" />
                    {realtor.specialization || 'General Real Estate'}
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-3 mt-4 leading-relaxed font-light bg-black/20 p-3 rounded-xl border border-white/5">
                    {realtor.bio || 'This realtor has not provided a bio yet. Contact them to learn more about their expertise.'}
                  </p>
                </div>

                <div className="flex gap-2 w-full relative z-10">
                  <Link 
                    to={`/book-realtor/${realtor.uid}`}
                    className="flex-1 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-brand-red-dark)] text-center text-xs font-bold text-white transition-all duration-300 flex items-center justify-center gap-1.5 shadow-lg group/btn"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Consult
                  </Link>
                  <a 
                    href={`https://wa.me/919999999999?text=Hi%20${encodeURIComponent(realtor.name)},%20I%20found%20your%20profile%20on%20Estate%20Studio.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-center text-xs font-bold text-white transition-all duration-300 flex items-center justify-center gap-1.5 shadow-lg"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FindRealtors;
