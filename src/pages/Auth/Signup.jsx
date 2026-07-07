import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle, Loader2, ArrowRight, Camera, MapPin, Briefcase, Clock, FileText, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'realtor';
  const isUser = role === 'user';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Extra realtor fields
  const [city, setCity] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState(null); // base64 string
  const [payNow, setPayNow] = useState(false);
  
  const fileInputRef = useRef(null);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup, API_URL } = useAuth();
  const navigate = useNavigate();

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openRazorpay = (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        // 1. Create order on backend
        const orderRes = await fetch(`${API_URL}/payment/create-order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: 249,
            currency: 'INR',
            receipt: `verify_${user.uid}`,
            notes: { uid: user.uid, purpose: 'realtor_verification' }
          })
        });
        const order = await orderRes.json();
        if (!orderRes.ok) throw new Error(order.error || 'Order creation failed');

        // 2. Fetch Razorpay key
        const keyRes = await fetch(`${API_URL}/payment/key`);
        const { key } = await keyRes.json();

        // 3. Open Razorpay checkout
        const options = {
          key,
          amount: order.amount,
          currency: order.currency,
          name: 'Estate Studio',
          description: 'Realtor Profile Verification',
          order_id: order.id,
          prefill: {
            name: user.name,
            email: user.email
          },
          theme: { color: '#E63946' },
          handler: async function (response) {
            // 4. Verify payment on backend
            try {
              const verifyRes = await fetch(`${API_URL}/payment/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  uid: user.uid
                })
              });
              const verifyData = await verifyRes.json();
              if (verifyRes.ok && verifyData.success) {
                // Update local user state
                localStorage.setItem('estate_studio_user', JSON.stringify(verifyData.user));
                resolve(true);
              } else {
                reject(new Error(verifyData.error || 'Verification failed'));
              }
            } catch (err) {
              reject(err);
            }
          },
          modal: {
            ondismiss: function () {
              resolve(false); // User closed without paying
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response) {
          reject(new Error(response.error.description || 'Payment failed'));
        });
        rzp.open();
      } catch (err) {
        reject(err);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password) {
      return setError('Please fill in all fields');
    }

    if (!isUser) {
      if (!city || !specialization || !experience || !bio) {
        return setError('Please fill in all realtor details');
      }
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);
    try {
      // Always register as unverified first
      const extraData = isUser ? {} : {
        city,
        specialization,
        experience,
        bio,
        photoData: photo,
        isVerified: false
      };
      
      const user = await signup(email, password, name, role, extraData);

      if (isUser) {
        navigate('/realtors');
        return;
      }

      // If realtor selected payNow, open Razorpay
      if (payNow) {
        try {
          const paid = await openRazorpay(user);
          if (paid) {
            alert('₹249 Payment successful! Your profile is now verified.');
          } else {
            alert('Payment skipped. You can verify later from your dashboard.');
          }
        } catch (payErr) {
          console.error('Payment error:', payErr);
          alert('Payment failed. You can verify later from your dashboard.');
        }
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create account.');
    } finally {
      setLoading(false);
    }
  };

  const inputBase = 'w-full bg-white/[0.04] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/50 transition-all text-sm';

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 flex items-center justify-center bg-[var(--color-background)] relative overflow-hidden px-4">
      <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-[var(--color-primary)]/8 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--color-primary)]/5 blur-[150px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg z-10"
      >
        <div className="glass-card p-8 md:p-10 rounded-[2.5rem]">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{isUser ? 'Create an Account' : 'Join as Realtor'}</h1>
            <p className="text-gray-400 text-sm font-light">
              {isUser 
                ? 'Create an account to find your dream property' 
                : 'Create an account to manage your listings and leads securely'}
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
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rajesh Sharma" 
                  className={inputBase} 
                />
              </div>
            </div>

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

            {!isUser && (
              <div className="space-y-5 pt-2 border-t border-white/10">
                <h3 className="text-sm font-bold text-white mb-2">Professional Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">City</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Mumbai" className={inputBase} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Specialization</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} placeholder="Luxury Homes" className={inputBase} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Experience</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="e.g. 5+ Years" className={inputBase} />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Bio</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-4 w-4 h-4 text-gray-500" />
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell clients about your expertise..." className={`${inputBase} min-h-[100px] resize-none pt-3.5`} />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Profile Photo</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-24 bg-white/5 border border-dashed border-white/20 rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
                  >
                    {photo ? (
                      <img src={photo} alt="Profile" className="w-16 h-16 rounded-full object-cover shadow-lg" />
                    ) : (
                      <div className="flex flex-col items-center text-gray-400">
                        <Camera className="w-6 h-6 mb-1" />
                        <span className="text-xs">Click to upload</span>
                      </div>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
                  </div>
                </div>
                
                <div 
                  className="bg-gradient-to-r from-[var(--color-primary)]/10 to-transparent border border-[var(--color-primary)]/30 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-[var(--color-primary)]/20 transition-colors" 
                  onClick={() => setPayNow(!payNow)}
                >
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5 flex items-center gap-2">
                      <CheckCircle className={`w-4 h-4 ${payNow ? 'text-[var(--color-primary)]' : 'text-gray-500'}`} />
                      Verify Profile Now
                    </h4>
                    <p className="text-xs text-gray-400 ml-6">Pay ₹249 to get the verified badge instantly.</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${payNow ? 'bg-[var(--color-primary)] border-[var(--color-primary)]' : 'border-gray-500'}`}>
                    {payNow && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                  </div>
                </div>
              </div>
            )}

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
                  CREATE ACCOUNT
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-8">
            Already have an account?{' '}
            <Link to={`/login?role=${role}`} className="text-[var(--color-primary)] hover:text-white transition-colors font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
