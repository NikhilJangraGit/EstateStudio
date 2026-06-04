import { motion } from 'framer-motion';
import { ArrowRight, Play, TrendingUp, Users, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  return (
    <div className="w-full bg-[var(--color-brand-black)] text-white">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[900px] flex items-center pt-20 overflow-hidden rounded-b-[3rem] shadow-2xl">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[var(--color-brand-black)] z-10" />
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
            <motion.div variants={fadeUp} className="flex items-center space-x-4 mb-8 mt-12 md:mt-0">
              <div className="h-[2px] w-12 md:w-16 bg-[var(--color-primary)] rounded-full" />
              <span className="text-white text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">The Market Authority</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 md:mb-8 leading-[1.1] tracking-tighter">
              Architects of Growth for <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">Elite Agents.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg md:text-2xl text-gray-300 mb-10 md:mb-12 max-w-2xl leading-relaxed font-light">
              Precision-engineered marketing and cinematic production for the 1%. 
              We translate architectural excellence into market dominance.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/contact" className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wide hover:bg-[var(--color-brand-red-dark)] hover:scale-105 transition-all duration-300 inline-flex items-center justify-center group shadow-[0_0_40px_rgba(211,47,47,0.3)]">
                INITIATE PROTOCOL
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Results That Speak For Us */}
      <section className="py-20 relative z-10 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="bg-[#1A1A1A] border border-white/10 rounded-[2rem] p-6 md:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-8"
          >
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 sm:gap-6 lg:w-1/4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[var(--color-primary)] flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(211,47,47,0.4)]">
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white leading-tight uppercase tracking-wide">Results That<br className="hidden sm:block"/>Speak For Us</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12 lg:w-3/4 lg:border-l lg:border-white/10 lg:pl-12">
              {[
                { value: "50+", label: "Projects Marketed" },
                { value: "5 Lakh+", label: "Leads Generated" },
                { value: "15+", label: "Happy Partners" },
                { value: "5X", label: "Average ROI For Partners" }
              ].map((stat, i) => (
                <motion.div key={i} variants={fadeUp} className="text-center lg:text-left">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-1 md:mb-2 tracking-tight whitespace-nowrap">{stat.value}</h3>
                  <p className="text-xs md:text-sm font-medium text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-primary)]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-20 text-center mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-widest uppercase mb-4">
              What We Do For You
            </h2>
            <div className="h-1 w-24 bg-[var(--color-primary)] mx-auto rounded-full" />
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {[
              {
                title: "1. VIDEO MARKETING",
                desc: "High converting videos & reels that attract & engage buyers.",
                icon: Play
              },
              {
                title: "2. SOCIAL MEDIA MARKETING",
                desc: "Strategic posting, ad campaigns & audience growth.",
                icon: Users
              },
              {
                title: "3. LEAD GENERATION",
                desc: "Reels + Ads + Funnels to generate verified leads for your projects.",
                icon: TrendingUp,
                isMain: true
              },
              {
                title: "4. CONTENT SCRIPT WRITING",
                desc: "Powerful scripts that create impact & drive inquiries.",
                icon: Shield
              },
              {
                title: "5. ANCHORS",
                desc: "Professional anchors to represent your brand & project confidently.",
                icon: Users
              }
            ].map((service, i) => (
              <motion.div key={i} variants={fadeUp} className={`relative p-8 rounded-3xl flex flex-col items-center text-center transition-all duration-500 group ${service.isMain ? 'bg-[var(--color-primary)]/10 border-2 border-[var(--color-primary)] shadow-[0_0_30px_rgba(211,47,47,0.2)]' : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-2'}`}>
                {service.isMain && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-primary)] text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                    (Our Main Focus)
                  </div>
                )}
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${service.isMain ? 'bg-[var(--color-primary)] shadow-[0_0_20px_rgba(211,47,47,0.5)]' : 'bg-white/10 group-hover:bg-[var(--color-primary)] group-hover:scale-110'}`}>
                  <service.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className={`text-lg font-bold mb-4 tracking-wide ${service.isMain ? 'text-[var(--color-primary)]' : 'text-white'}`}>{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-20 md:py-32 bg-[var(--color-primary)] rounded-3xl md:rounded-[3rem] mx-4 sm:mx-8 mb-20 md:mb-32 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-20 text-center mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-widest uppercase mb-4">
              How We Work
            </h2>
            <div className="h-1 w-24 bg-white/50 mx-auto rounded-full" />
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8"
          >
            {[
              {
                title: "1. YOU REGISTER",
                desc: "Join Estate Studio as our partner.",
                icon: Users
              },
              {
                title: "2: WE PLAN",
                desc: "We understand your project & audience.",
                icon: TrendingUp
              },
              {
                title: "3: WE CREATE CONTENT",
                desc: "We create videos, reels, content & run campaigns.",
                icon: Play
              },
              {
                title: "4: WE GENERATE LEADS",
                desc: "We bring you high-quality, verified leads consistently.",
                icon: Users
              },
              {
                title: "5: YOU CLOSE DEALS",
                desc: "You focus on closing, we keep your pipeline full.",
                icon: Shield
              }
            ].map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mb-6 border border-white/20 group-hover:bg-white group-hover:scale-110 transition-all duration-500 shadow-xl">
                  <step.icon className="w-10 h-10 text-white group-hover:text-[var(--color-primary)] transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{step.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Elite Only CTA */}
      <section className="py-32 bg-[var(--color-brand-black)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-[var(--color-primary)]/20 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-white/5 backdrop-blur-2xl border border-white/10 p-16 md:p-24 rounded-[3rem] shadow-2xl"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter leading-tight text-white">
              Market Exclusivity. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">By Invitation Only.</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              We operate on a strict 1% territory acceptance protocol. Partner with Estate Studio to secure your market dominance before your competitors do.
            </p>
            <Link to="/contact" className="bg-[var(--color-primary)] text-white px-10 py-5 rounded-full text-sm font-bold tracking-widest hover:bg-white hover:text-[var(--color-brand-black)] hover:scale-105 transition-all duration-300 inline-flex items-center group shadow-[0_0_40px_rgba(211,47,47,0.4)]">
              REQUEST A BRIEFING
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
