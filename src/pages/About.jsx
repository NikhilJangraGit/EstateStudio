import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-24 md:pt-32 pb-20 md:pb-32 min-h-screen bg-transparent text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/3 h-[600px] bg-[var(--color-primary)]/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center space-x-4 mb-8">
            <div className="h-[2px] w-16 bg-[var(--color-primary)] rounded-full" />
            <span className="text-white text-xs font-bold tracking-[0.3em] uppercase glass-card px-4 py-1.5 rounded-full">Company Profile</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-white">
            Your Ultimate <br /> <span className="text-[var(--color-primary)]">Marketing Partner.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-16 font-light leading-relaxed">
            Estate Studio is a premier real estate marketing company that provides comprehensive marketing solutions for builders, brokers, developers, and real estate brands. 
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            <div className="glass-card-strong p-10">
              <h3 className="text-2xl font-bold mb-4 text-white">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed font-light">
                To revolutionize real estate marketing by providing elite, performance-driven solutions that elevate our partners' brands and ensure market dominance on a global scale.
              </p>
            </div>
            <div className="glass-card-strong p-10">
              <h3 className="text-2xl font-bold mb-4 text-white">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed font-light">
                We bridge the gap between architectural excellence and the right audience. Through cinematic production, targeted lead generation, and strategic branding, we translate your real estate assets into unmatched market value.
              </p>
            </div>
          </div>

          <div className="mb-24">
            <h2 className="text-4xl font-bold mb-12 tracking-tight text-white text-center">Leadership & Team</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {[
                {
                  name: "Mr. Rishabh Raj",
                  role: "Chief Growth Officer (CGO)",
                  desc: "Rishabh Raj leads business growth, client acquisition, and marketing initiatives at Estate Studio. With experience in the real estate industry since 2022, he specializes in building strong relationships with builders, developers, brokers, and real estate professionals. He oversees business development, strategic partnerships, digital marketing, lead generation, and brand expansion. His focus is on driving sustainable growth, increasing market presence, and creating effective marketing strategies that help real estate businesses generate quality leads and achieve higher revenue growth.",
                  image: "/team/amit.jpg"
                },
                {
                  name: "Mr. Amit Parmar",
                  role: "Chief Production Officer (CPO)",
                  desc: "Amit Parmar is the Chief Production Officer of Estate Studio, leading all production and creative operations. With experience in the real estate industry since 2024, he specializes in real estate content creation, professional property shoots, video production, drone cinematography, and post-production management. He ensures that every project is executed with high-quality visuals, creative storytelling, and professional standards, helping builders, brokers, and real estate brands showcase their properties effectively and generate better market engagement.",
                  image: "/team/amit_parmar.PNG"
                }
              ].map((member, idx) => (
                <div key={idx} className="glass-card rounded-[2.5rem] overflow-hidden group border border-white/5 flex flex-col relative">
                  {/* Subtle background glow */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-primary)]/10 blur-[60px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="h-[28rem] w-full relative overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-700 opacity-80 group-hover:opacity-100 grayscale-[50%] group-hover:grayscale-0" />
                  </div>
                  <div className="p-8 md:p-10 bg-black/40 backdrop-blur-md flex-1 flex flex-col relative z-10 border-t border-white/5">
                    <h4 className="text-3xl font-bold text-white mb-2 tracking-tight group-hover:text-[var(--color-primary)] transition-colors duration-300">{member.name}</h4>
                    <p className="text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase mb-6">{member.role}</p>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
                      {member.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
