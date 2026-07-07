import { motion } from 'framer-motion';
import { CheckCircle2, Video, Mic, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const packages = [
    {
      name: "Basic Studio",
      price: "₹22,000",
      period: "/ Month",
      features: [
        "15 Professional Reels (per month)",
        "Professional Video Shoot",
        "Premium Video Editing",
        "YouTube Management",
        "Instagram Management"
      ],
      highlight: false
    },
    {
      name: "Premium Studio",
      price: "₹35,000",
      period: "/ Month",
      features: [
        "15 Professional Reels (per month)",
        "Professional Video Shoot",
        "Premium Video Editing",
        "Content Strategy Support",
        "YouTube Management",
        "Instagram Management",
        "Facebook Management",
        "LinkedIn Management",
        "Threads Management",
        "X (Twitter) Management"
      ],
      highlight: true
    }
  ];

  const additionalServices = [
    {
      title: "Drone Shoot",
      price: "₹2,700 / Project",
      icon: Camera,
      features: [
        "Professional Drone Cinematography",
        "4K Aerial Footage",
        "Basic Color Correction"
      ]
    },
    {
      title: "Podcast Shoot",
      price: "₹11,000",
      duration: "Up to 1 Hour",
      icon: Mic,
      features: [
        "Multi-Camera Shoot",
        "Professional Audio Recording",
        "Premium Editing",
        "Intro & Outro",
        "Motion Graphics",
        "Color Grading",
        "Audio Enhancement"
      ]
    },
    {
      title: "Long Format Video",
      price: "₹4,500 / Video",
      duration: "Up to 10 Minutes",
      icon: Video,
      features: [
        "Professional Camera Shoot",
        "Premium Editing",
        "Motion Graphics & Animations",
        "Audio Sound Design",
        "Professional Assets & Visuals",
        "Color Grading",
        "Thumbnail Support (Optional)"
      ]
    }
  ];

  const whyChooseUs = [
    "Professional Camera Shoot",
    "Premium Video Editing",
    "Motion Graphics & Animation",
    "Cinematic Color Grading",
    "Professional Audio Enhancement",
    "High-Quality Visual Assets",
    "Social Media Optimized Content",
    "Dedicated Creative Team"
  ];

  return (
    <div className="pt-24 md:pt-32 pb-20 md:pb-32 min-h-screen bg-transparent text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/3 h-[600px] bg-[var(--color-primary)]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/3 h-[600px] bg-[var(--color-primary)]/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-[2px] w-12 bg-[var(--color-primary)] rounded-full" />
            <span className="text-white text-xs font-bold tracking-[0.3em] uppercase glass-card px-4 py-1.5 rounded-full">Pricing</span>
            <div className="h-[2px] w-12 bg-[var(--color-primary)] rounded-full" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter text-white">Content Creation Packages</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Choose the perfect package to elevate your real estate brand's digital presence.
          </p>
        </motion.div>

        {/* Main Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-5xl mx-auto">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card p-8 rounded-[2.5rem] relative overflow-hidden flex flex-col ${pkg.highlight ? 'border-[var(--color-primary)]/50 shadow-[0_0_30px_rgba(230,57,70,0.15)]' : ''}`}
            >
              {pkg.highlight && (
                <div className="absolute top-0 right-0 bg-[var(--color-primary)] text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl tracking-wider">
                  RECOMMENDED
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2 text-white">{pkg.name}</h3>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl font-black text-[var(--color-primary)]">{pkg.price}</span>
                <span className="text-gray-400 font-medium mb-1">{pkg.period}</span>
              </div>
              
              <div className="space-y-4 flex-grow mb-8">
                {pkg.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Link to="/contact" className={`block text-center w-full py-4 rounded-xl font-bold tracking-wide transition-all duration-300 ${pkg.highlight ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-brand-red-dark)] hover:scale-[1.02] shadow-[0_0_20px_rgba(230,57,70,0.3)]' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                GET STARTED
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter">Additional Services</h2>
            <p className="text-gray-400 font-light">Customized solutions for your specific production needs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalServices.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-8 rounded-[2rem] hover:border-[var(--color-primary)]/30 transition-colors group"
              >
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] transition-all duration-500">
                  <service.icon className="w-6 h-6 text-[var(--color-primary)] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <div className="text-2xl font-black text-[var(--color-primary)] mb-1">{service.price}</div>
                {service.duration && <div className="text-xs text-gray-400 mb-6 uppercase tracking-wider">{service.duration}</div>}
                {!service.duration && <div className="mb-6 h-4"></div>}
                
                <ul className="space-y-3">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]/50 mt-1.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8 md:p-12 rounded-[3rem] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)]/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="text-center mb-10 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Why Choose Estate Studio?</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            {whyChooseUs.map((reason, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
                <span className="text-sm font-medium text-gray-200">{reason}</span>
              </div>
            ))}
          </div>
        </motion.div>
        
      </div>
    </div>
  );
};

export default Pricing;
