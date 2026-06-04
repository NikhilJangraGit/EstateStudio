import { motion } from 'framer-motion';

const Services = () => {
  return (
    <div className="pt-24 md:pt-32 pb-20 md:pb-32 min-h-screen bg-[var(--color-brand-black)] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-[600px] bg-[var(--color-primary)]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-[600px] bg-[var(--color-primary)]/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center space-x-4 mb-8">
            <div className="h-[2px] w-16 bg-[var(--color-primary)] rounded-full" />
            <span className="text-white text-xs font-bold tracking-[0.3em] uppercase bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">The Arsenal</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter text-white">Market Supremacy</h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-24 font-light leading-relaxed">
            Our comprehensive suite of high-performance marketing and production services, engineered for elite real estate professionals.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Cinematic Reel & Video Production",
                desc: "We don't just shoot property tours; we craft visual narratives. Our 4K cinematic tours and drone captures are designed to evoke emotion and justify premium valuations.",
                features: ["4K Property Tours", "Aerial/Drone Cinematography", "Agent Brand Documentaries", "Social Media Micro-Reels"]
              },
              {
                title: "Strategic Lead Generation",
                desc: "Precision targeting meets high-converting funnels. We deploy sophisticated Meta Ads and Search strategies to dominate your local market and acquire high-net-worth buyer and seller leads.",
                features: ["Meta (Facebook/Instagram) Ads", "Google Search Dominance", "Retargeting Infrastructure", "CRM Integration"]
              },
              {
                title: "Architectural Branding",
                desc: "Your brand should be as impeccable as the properties you represent. We engineer visual identities that command authority and separate you from the noise.",
                features: ["Visual Identity Design", "Premium Listing Presentations", "Custom Web Platforms", "Brand Collateral"]
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2rem] hover:bg-white/10 hover:-translate-y-2 transition-all duration-500 group flex flex-col"
              >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[var(--color-primary)]/20 group-hover:scale-110 transition-all duration-500">
                  <span className="text-[var(--color-primary)] font-bold text-2xl">{(i + 1).toString().padStart(2, '0')}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight text-white">{service.title}</h3>
                <p className="text-gray-400 mb-8 leading-relaxed font-light flex-grow">{service.desc}</p>
                <ul className="space-y-4">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-center text-sm font-medium text-gray-300">
                      <div className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full mr-4 shadow-[0_0_10px_rgba(211,47,47,0.8)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
