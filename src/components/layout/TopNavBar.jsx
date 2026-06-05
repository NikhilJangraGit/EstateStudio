import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
];

const TopNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed w-full z-50 top-0 transition-all duration-300 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-white">
              ESTATE<span className="text-[var(--color-primary)]">STUDIO</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-[var(--color-primary)] ${
                  location.pathname === link.path ? 'text-[var(--color-primary)]' : 'text-gray-400'
                }`}
              >
                {link.name.toUpperCase()}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-full text-sm font-bold tracking-wide hover:bg-[var(--color-brand-red-dark)] hover:scale-105 transition-all shadow-[0_0_20px_rgba(230,57,70,0.4)]"
            >
              PARTNER WITH US
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[var(--color-primary)] transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-3xl border-b border-white/10 shadow-2xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-white hover:text-[var(--color-primary)] transition-colors"
                >
                  {link.name.toUpperCase()}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center mt-4 bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl text-base font-bold hover:bg-[var(--color-brand-red-dark)] transition-colors shadow-lg shadow-[var(--color-primary)]/20"
              >
                PARTNER WITH US
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default TopNavBar;
