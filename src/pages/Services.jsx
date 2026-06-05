import { motion } from 'framer-motion';
import { 
  Video, 
  Scissors, 
  Focus, 
  Star, 
  Users, 
  TrendingUp, 
  Share2, 
  Mic, 
  PenTool, 
  Megaphone, 
  Presentation, 
  Calendar 
} from 'lucide-react';

const Services = () => {
  const servicesList = [
    {
      title: "Real Estate Video Shoot",
      desc: "High-quality, cinematic property tours that highlight the best features of your real estate projects.",
      icon: Video
    },
    {
      title: "Video Editing",
      desc: "Professional video editing to create engaging, fast-paced, and high-converting real estate reels and videos.",
      icon: Scissors
    },
    {
      title: "Drone Shoot",
      desc: "Stunning aerial cinematography that showcases the scale, location, and true grandeur of your properties.",
      icon: Focus
    },
    {
      title: "Branding",
      desc: "Complete visual identity engineering to separate you from the noise and establish you as a market authority.",
      icon: Star
    },
    {
      title: "Lead Generation",
      desc: "Precision-targeted funnels designed to acquire high-intent buyer and seller leads consistently.",
      icon: Users
    },
    {
      title: "Performance Marketing",
      desc: "Data-driven marketing campaigns that maximize ROI and ensure your projects get the visibility they deserve.",
      icon: TrendingUp
    },
    {
      title: "Social Media Marketing",
      desc: "Strategic content planning and community management to grow your audience and build trust.",
      icon: Share2
    },
    {
      title: "Podcast Production",
      desc: "End-to-end podcast creation to establish thought leadership in the real estate industry.",
      icon: Mic
    },
    {
      title: "Content Creation",
      desc: "Impactful scripting, copywriting, and storytelling that resonates with your high-net-worth audience.",
      icon: PenTool
    },
    {
      title: "Ad Marketing",
      desc: "Sophisticated Meta and Google ad campaigns to dominate your local market search and social feeds.",
      icon: Megaphone
    },
    {
      title: "Real Estate Seminar Marketing",
      desc: "Comprehensive marketing coverage for your seminars to ensure maximum attendance and engagement.",
      icon: Presentation
    },
    {
      title: "Event Coverage",
      desc: "Professional photo and video coverage of your project launches, broker meets, and real estate events.",
      icon: Calendar
    }
  ];

  return (
    <div className="pt-24 md:pt-32 pb-20 md:pb-32 min-h-screen bg-transparent text-white relative overflow-hidden">
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
            <span className="text-white text-xs font-bold tracking-[0.3em] uppercase glass-card px-4 py-1.5 rounded-full">Our Services</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-white">The Arsenal</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-20 font-light leading-relaxed">
            Our comprehensive suite of high-performance marketing and production services, engineered exclusively for elite real estate professionals.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {servicesList.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                className="glass-card p-8 rounded-[2.5rem] flex flex-col h-full group relative overflow-hidden"
              >
                {/* Background glowing number */}
                <div className="absolute -bottom-6 -right-6 text-[120px] font-black text-white/5 group-hover:text-[var(--color-primary)]/10 transition-colors duration-700 pointer-events-none select-none z-0">
                  {(i + 1).toString().padStart(2, '0')}
                </div>
                
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/0 via-transparent to-[var(--color-primary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-[1.5rem] flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-xl">
                      <service.icon className="w-7 h-7 text-[var(--color-primary)] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 tracking-wide text-white group-hover:text-[var(--color-primary)] transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed font-light flex-grow mb-6">
                    {service.desc}
                  </p>

                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
