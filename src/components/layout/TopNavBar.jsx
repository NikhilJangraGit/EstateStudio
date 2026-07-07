import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, Briefcase } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Find Realtors', path: '/realtors' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
];

const TopNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();

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
            {currentUser ? (
              currentUser.role === 'realtor' ? (
                <Link
                  to="/dashboard"
                  className="text-sm font-medium tracking-wide text-gray-400 hover:text-white transition-colors"
                >
                  DASHBOARD
                </Link>
              ) : (
                <button
                  onClick={logout}
                  className="text-sm font-medium tracking-wide text-gray-400 hover:text-white transition-colors"
                >
                  LOGOUT
                </button>
              )
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsAuthOpen(!isAuthOpen)}
                  onBlur={() => setTimeout(() => setIsAuthOpen(false), 200)}
                  className="flex items-center gap-2 text-sm font-bold tracking-wide bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-full border border-white/10 transition-all shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                  LOGIN / REGISTER
                  <ChevronDown className={`w-4 h-4 transition-transform ${isAuthOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isAuthOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-56 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-2 z-50 overflow-hidden"
                    >
                      <Link
                        to="/login?role=user"
                        className="flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                          <User className="w-4 h-4 text-blue-400" />
                        </div>
                        As User
                      </Link>
                      <Link
                        to="/login?role=realtor"
                        className="flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-colors">
                          <Briefcase className="w-4 h-4 text-[var(--color-primary)]" />
                        </div>
                        As Realtor
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
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
              {currentUser ? (
                currentUser.role === 'realtor' ? (
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-3 text-base font-medium text-white hover:text-[var(--color-primary)] transition-colors"
                  >
                    DASHBOARD
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="block px-3 py-3 text-base font-medium text-white hover:text-[var(--color-primary)] transition-colors text-left w-full"
                  >
                    LOGOUT
                  </button>
                )
              ) : (
                <div className="pt-4 pb-2 border-t border-white/10 mt-4">
                  <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Login / Register</p>
                  <Link
                    to="/login?role=user"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 text-base font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    <User className="w-5 h-5 text-blue-400" />
                    As User
                  </Link>
                  <Link
                    to="/login?role=realtor"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 text-base font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    <Briefcase className="w-5 h-5 text-[var(--color-primary)]" />
                    As Realtor
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default TopNavBar;
