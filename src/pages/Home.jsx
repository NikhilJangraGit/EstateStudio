import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, TrendingUp, Users, Shield, Star, MapPin, Briefcase, ChevronLeft, ChevronRight, Loader2, MessageCircle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [realtors, setRealtors] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const realtorsPerPage = 3;
  const indexOfLastRealtor = currentPage * realtorsPerPage;
  const indexOfFirstRealtor = indexOfLastRealtor - realtorsPerPage;
  const currentRealtors = realtors.slice(indexOfFirstRealtor, indexOfLastRealtor);
  const totalPages = Math.ceil(realtors.length / realtorsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const section = document.getElementById('featured-realtors');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-transparent text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] lg:min-h-[900px] flex items-center pt-24 pb-20 lg:pt-20 lg:pb-0 overflow-hidden rounded-b-[2rem] lg:rounded-b-[3rem] shadow-2xl">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[var(--color-brand-black)] z-10" />
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury modern architecture" 
            className="w-full h-full object-cover scale-105 animate-[slow-zoom_20s_ease-in-out_infinite_alternate]"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUp} className="flex items-center space-x-3 md:space-x-4 mb-6 md:mb-8">
              <div className="h-[2px] w-8 md:w-16 bg-[var(--color-primary)] rounded-full" />
              <span className="text-white text-[9px] md:text-xs font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase glass-card px-3 md:px-4 py-1.5 rounded-full break-words">Real Estate Ka Humsafar</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tighter break-words">
              Elevating Real Estate Brands to <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">Market Leaders.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-base sm:text-lg md:text-2xl text-gray-300 mb-8 md:mb-12 max-w-2xl leading-relaxed font-light">
              Complete marketing solutions for builders, brokers, and developers. From cinematic production to high-quality lead generation, we bring your vision to the right audience.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/contact" className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wide hover:bg-[var(--color-brand-red-dark)] hover:scale-105 transition-all duration-300 inline-flex items-center justify-center group shadow-[0_0_40px_rgba(230,57,70,0.4)] w-full sm:w-auto">
                PARTNER WITH US
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Estate Studio */}
      <section className="py-20 relative z-10 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
            {/* Title Card */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-5 glass-card-strong rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-center"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#E63946]/20 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-brand-red-dark)] flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(230,57,70,0.5)]">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight mb-4">
                  Why Choose <br/>
                  <span className="text-[var(--color-primary)]">Estate Studio?</span>
                </h2>
                <p className="text-gray-400 leading-relaxed font-light">
                  We don't just market properties; we engineer market dominance. Our data-driven approach and cinematic quality ensure unmatched results for our elite partners.
                </p>
              </div>
            </motion.div>
            
            {/* Stats Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { value: "50+", label: "Projects Marketed", glow: "from-blue-500/20" },
                { value: "5 Lakh+", label: "Leads Generated", glow: "from-[#E63946]/20" },
                { value: "15+", label: "Happy Partners", glow: "from-purple-500/20" },
                { value: "5X", label: "Average ROI", glow: "from-emerald-500/20" }
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                  className="glass-card rounded-[2.5rem] p-8 relative overflow-hidden group flex flex-col justify-center items-center text-center h-full min-h-[200px]"
                >
                  <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${stat.glow} to-transparent rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-700 pointer-events-none`} />
                  
                  <h3 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-2 group-hover:scale-110 transition-transform duration-500 tracking-tighter">
                    {stat.value}
                  </h3>
                  <p className="relative z-10 text-xs sm:text-sm md:text-base font-medium text-[var(--color-primary)] tracking-wide uppercase">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Highlights Section */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E63946]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-20 text-center mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-widest uppercase mb-4">
              Services Highlights
            </h2>
            <div className="h-1 w-24 bg-[var(--color-primary)] mx-auto rounded-full shadow-[0_0_20px_rgba(230,57,70,0.5)]" />
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]"
          >
            {[
              {
                title: "VIDEO MARKETING",
                desc: "High converting videos & reels that attract & engage buyers.",
                icon: Play,
                className: "md:col-span-1"
              },
              {
                title: "LEAD GENERATION",
                desc: "Reels + Ads + Funnels to generate high-intent, verified leads for your projects consistently and at scale.",
                icon: TrendingUp,
                isMain: true,
                className: "md:col-span-2 lg:col-span-2 lg:row-span-1 flex flex-col justify-center"
              },
              {
                title: "SOCIAL MEDIA",
                desc: "Strategic posting, ad campaigns & audience growth.",
                icon: Users,
                className: "md:col-span-1"
              },
              {
                title: "SCRIPT WRITING",
                desc: "Powerful scripts that create impact & drive inquiries.",
                icon: Shield,
                className: "md:col-span-1"
              },
              {
                title: "ANCHORS",
                desc: "Professional anchors to represent your brand & project confidently.",
                icon: Users,
                className: "md:col-span-1 lg:col-span-1"
              }
            ].map((service, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp} 
                className={`relative p-8 rounded-[2rem] flex items-start text-left transition-all duration-500 group overflow-hidden ${service.className || ''} ${service.isMain ? 'glass-card-strong border-[#E63946]/50' : 'glass-card flex flex-col justify-between'}`}
              >
                {/* Background Hover Glow */}
                <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-white/5 rounded-full blur-[40px] group-hover:bg-[#E63946]/20 transition-colors duration-500 z-0 pointer-events-none" />

                <div className="relative z-10 w-full flex flex-col h-full">
                  <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 transition-all duration-500 shadow-xl ${service.isMain ? 'bg-[var(--color-primary)] shadow-[0_0_30px_rgba(230,57,70,0.5)] group-hover:scale-110' : 'bg-white/5 border border-white/10 group-hover:bg-[var(--color-primary)] group-hover:scale-110 group-hover:border-[var(--color-primary)]'}`}>
                    <service.icon className={`w-8 h-8 ${service.isMain ? 'text-white' : 'text-gray-300 group-hover:text-white transition-colors'}`} />
                  </div>

                  <h3 className={`text-2xl font-bold mb-4 tracking-wide ${service.isMain ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'text-white group-hover:text-[var(--color-primary)] transition-colors'}`}>
                    {service.title}
                  </h3>
                  
                  <p className={`leading-relaxed ${service.isMain ? 'text-gray-200 text-base max-w-lg' : 'text-gray-400 text-sm'}`}>
                    {service.desc}
                  </p>
                </div>

                {service.isMain && (
                  <div className="absolute top-8 right-8 bg-[#E63946]/20 text-[var(--color-primary)] border border-[#E63946]/30 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-[0_0_20px_rgba(230,57,70,0.2)]">
                    Main Focus
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Realtors Section */}
      <section id="featured-realtors" className="py-20 relative">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-widest uppercase mb-4">
                Top Realtors
              </h2>
              <div className="h-1 w-24 bg-[var(--color-primary)] rounded-full shadow-[0_0_20px_rgba(230,57,70,0.5)]" />
              <p className="mt-4 text-gray-400 max-w-xl">
                Connect with the industry's most trusted and high-performing real estate professionals.
              </p>
            </div>
            
            <Link 
              to="/book-my-realtor" 
              className="bg-white/10 hover:bg-[var(--color-primary)] text-white border border-white/20 hover:border-[var(--color-primary)] px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all shadow-lg hover:shadow-[0_0_20px_rgba(230,57,70,0.4)] flex items-center whitespace-nowrap"
            >
              BOOK A REALTOR
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div 
            key={currentPage}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {loading ? (
              <div className="col-span-full flex justify-center py-20">
                <Loader2 className="w-10 h-10 text-[var(--color-primary)] animate-spin" />
              </div>
            ) : currentRealtors.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-20">
                No realtors found. Register to be the first!
              </div>
            ) : currentRealtors.map((realtor) => (
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
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-white/10 group-hover:border-[var(--color-primary)]/50 transition-colors"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-2xl font-bold text-white border-2 border-white/10 group-hover:border-[var(--color-primary)]/50 transition-colors">
                        {realtor.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    {realtor.isVerified && (
                      <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-black flex items-center gap-1 shadow-lg">
                        <Shield className="w-3 h-3" />
                        PRO
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[var(--color-primary)] transition-colors truncate">{realtor.name}</h3>
                    <div className="flex items-center text-[var(--color-primary)] mt-1">
                      <Star className="w-4 h-4 fill-[var(--color-primary)]" />
                      <span className="ml-1 text-sm font-bold">5.0</span>
                      <span className="mx-2 text-gray-600">•</span>
                      <span className="text-xs font-medium text-gray-400 bg-white/5 px-2 py-0.5 rounded-md">Verified</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-6 relative z-10 flex-grow">
                  <div className="flex items-center text-sm text-gray-300">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    {realtor.city || 'Not specified'}
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                    {realtor.specialization || 'General Real Estate'}
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2 mt-3 leading-relaxed">
                    {realtor.bio || 'This realtor has not provided a bio yet.'}
                  </p>
                </div>

                <div className="flex gap-2 w-full mt-auto relative z-10">
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 gap-4">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] disabled:opacity-50 disabled:hover:bg-white/5 disabled:hover:border-white/10 transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`w-10 h-10 rounded-full text-sm font-bold transition-all ${
                      currentPage === number 
                        ? 'bg-[var(--color-primary)] text-white shadow-[0_0_15px_rgba(230,57,70,0.5)]' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>

              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] disabled:opacity-50 disabled:hover:bg-white/5 disabled:hover:border-white/10 transition-all"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-[#E63946]/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-24 text-center mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-widest uppercase mb-4">
              How We Work
            </h2>
            <div className="h-1 w-24 bg-[var(--color-primary)] mx-auto rounded-full shadow-[0_0_20px_rgba(230,57,70,0.5)]" />
          </motion.div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-white/10" />
            <div className="hidden lg:block absolute top-12 left-[10%] h-[1px] bg-[var(--color-primary)] w-1/3 shadow-[0_0_15px_rgba(230,57,70,0.8)] animate-[pulse_3s_ease-in-out_infinite]" />

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-16 lg:gap-8"
            >
              {[
                { title: "REGISTER", desc: "Join Estate Studio as our partner.", icon: Users },
                { title: "PLAN", desc: "We understand your project & audience.", icon: TrendingUp },
                { title: "CREATE", desc: "We create videos, reels & run campaigns.", icon: Play },
                { title: "LEADS", desc: "We bring you verified leads consistently.", icon: Users },
                { title: "CLOSE", desc: "You focus on closing, we keep the pipeline full.", icon: Shield }
              ].map((step, i) => (
                <motion.div key={i} variants={fadeUp} className="flex flex-col items-center text-center group relative">
                  {/* Glowing step number background */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-8xl font-black text-white/5 group-hover:text-[#E63946]/10 transition-colors duration-700 pointer-events-none select-none z-0">
                    0{i + 1}
                  </div>

                  <div className="w-24 h-24 rounded-[2rem] bg-white/5 backdrop-blur-[40px] border border-white/10 flex items-center justify-center mb-8 relative z-10 group-hover:bg-[#E63946]/20 group-hover:border-[#E63946]/50 group-hover:-translate-y-2 transition-all duration-500 shadow-xl group-hover:shadow-[0_20px_40px_rgba(230,57,70,0.3)]">
                    <step.icon className="w-10 h-10 text-[var(--color-primary)] group-hover:text-white transition-colors duration-500" />
                    
                    {/* Inner glowing dot */}
                    <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 tracking-wide z-10 group-hover:text-[var(--color-primary)] transition-colors">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed z-10 max-w-[200px]">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Elite Only CTA */}
      <section className="py-32 bg-transparent relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-[0.05] mix-blend-lighten" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-[#E63946]/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="glass-card-strong p-16 md:p-24"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter leading-tight text-white">
              Your Vision. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-red-400">Our Strategy.</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Take the guesswork out of real estate marketing. Partner with Estate Studio to build a brand that commands authority and drives consistent, high-quality sales.
            </p>
            <Link to="/contact" className="bg-[var(--color-primary)] text-white px-10 py-5 rounded-full text-sm font-bold tracking-widest hover:bg-white hover:text-[var(--color-brand-black)] hover:scale-105 transition-all duration-300 inline-flex items-center group shadow-[0_0_40px_rgba(230,57,70,0.5)]">
              CONTACT US
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
