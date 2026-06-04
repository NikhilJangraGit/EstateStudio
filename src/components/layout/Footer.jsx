import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-white pt-32 pb-10 border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-primary)]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20">
          <div>
            <Link to="/" className="text-3xl font-bold tracking-tighter text-white block mb-6">
              ESTATE<span className="text-[var(--color-primary)]">STUDIO</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-light">
              Architects of Growth for Elite Agents. Precision-engineered marketing and cinematic production for the 1%.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-8 text-gray-500">Services</h4>
            <ul className="space-y-4 text-sm text-gray-300 font-light">
              <li><Link to="/services" className="hover:text-[var(--color-primary)] transition-colors">Cinematic Production</Link></li>
              <li><Link to="/services" className="hover:text-[var(--color-primary)] transition-colors">Strategic Lead Gen</Link></li>
              <li><Link to="/services" className="hover:text-[var(--color-primary)] transition-colors">Architectural Branding</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-8 text-gray-500">Company</h4>
            <ul className="space-y-4 text-sm text-gray-300 font-light">
              <li><Link to="/contact" className="hover:text-[var(--color-primary)] transition-colors">The Briefing</Link></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Privacy Protocol</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-light tracking-wide">
          <p>&copy; {new Date().getFullYear()} Estate Studio. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Vimeo</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
