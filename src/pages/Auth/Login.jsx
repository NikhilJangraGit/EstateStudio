import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'realtor';
  const isUser = role === 'user';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      return setError('Please fill in all fields');
    }

    setLoading(true);
    try {
      const user = await login(email, password);
      if (user.role === 'user' || isUser) {
        navigate('/realtors');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const inputBase = 'w-full bg-white/[0.04] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/50 transition-all text-sm';

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 flex items-center justify-center bg-[var(--color-background)] relative overflow-hidden px-4">
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[var(--color-primary)]/8 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-primary)]/5 blur-[150px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="glass-card p-8 md:p-10 rounded-[2.5rem]">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{isUser ? 'User Login' : 'Realtor Login'}</h1>
            <p className="text-gray-400 text-sm font-light">
              {isUser 
                ? 'Sign in to browse properties and contact top realtors' 
                : 'Sign in to manage your realtor profile and leads'}
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/40 rounded-xl flex items-start gap-3 text-red-300"
            >
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com" 
                  className={inputBase} 
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className={inputBase} 
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold tracking-wide transition-all duration-300 text-sm flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white hover:bg-[var(--color-brand-red-dark)] hover:scale-[1.02] shadow-[0_0_20px_rgba(230,57,70,0.3)] mt-2 ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  SIGN IN
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-8">
            {isUser ? "Don't have an account? " : "Don't have a realtor account? "}
            <Link to={`/signup?role=${role}`} className="text-[var(--color-primary)] hover:text-white transition-colors font-semibold">
              {isUser ? 'Sign Up' : 'Apply Now'}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
