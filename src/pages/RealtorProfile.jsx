import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import {
  CheckCircle2,
  User,
  Mail,
  Phone,
  BadgeCheck,
  Globe,
  MapPin,
  Briefcase,
  Star,
  AlertCircle,
  Loader2,
  ArrowRight,
  Shield,
  Sparkles,
  Clock,
} from 'lucide-react';
import CustomSelect from '../components/ui/CustomSelect';

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;
const SCRIPT_URL = import.meta.env.VITE_REALTOR_SCRIPT_URL;

// Custom SVG icons for social/brand icons not in lucide-react
const InstagramIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const inputBase =
  'w-full bg-white/[0.04] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/50 focus:bg-white/[0.06] transition-all duration-300 text-sm';

const inputBaseNoIcon =
  'w-full bg-white/[0.04] border border-white/10 rounded-xl py-3.5 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/50 focus:bg-white/[0.06] transition-all duration-300 text-sm';

const sectionTitle =
  'text-lg font-bold text-white border-b border-white/10 pb-4 mb-6 flex items-center gap-3';

const RealtorProfile = () => {
  // ── Form State ──
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    experience: '',
    specialization: '',
    bio: '',
    instagram: '',
    youtube: '',
    linkedin: '',
    facebook: '',
    twitter: '',
    website: '',
  });

  const [wantsVerification, setWantsVerification] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  // ── Handlers ──
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    setErrorMsg('');
  }, []);

  const validate = useCallback(() => {
    const errors = {};
    if (!form.fullName.trim()) errors.fullName = 'Name is required';
    if (!form.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = 'Enter a valid email';
    if (!form.phone.trim()) errors.phone = 'Phone number is required';
    else if (!/^[+]?[\d\s-]{10,15}$/.test(form.phone.replace(/\s/g, '')))
      errors.phone = 'Enter a valid phone number';
    if (!form.bio.trim()) errors.bio = 'Please write a short bio';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [form]);

  const submitToSheet = useCallback(
    async (paymentId = '') => {
      const data = new FormData();
      data.append('Timestamp', new Date().toLocaleString());
      data.append('Name', form.fullName);
      data.append('Email', form.email);
      data.append('Phone', form.phone);
      data.append('City', form.city);
      data.append('Experience', form.experience);
      data.append('Specialization', form.specialization);
      data.append('Bio', form.bio);
      data.append('Instagram', form.instagram);
      data.append('YouTube', form.youtube);
      data.append('LinkedIn', form.linkedin);
      data.append('Facebook', form.facebook);
      data.append('Twitter', form.twitter);
      data.append('Website', form.website);
      data.append('VerificationBadge', wantsVerification ? 'Yes' : 'No');
      data.append('PaymentID', paymentId);

      await fetch(SCRIPT_URL, { method: 'POST', body: data, mode: 'no-cors' });
    },
    [form, wantsVerification]
  );

  const openRazorpay = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!window.Razorpay) {
        reject(new Error('Razorpay SDK not loaded. Please refresh and try again.'));
        return;
      }

      const options = {
        key: RAZORPAY_KEY,
        amount: 24900, // ₹249 in paise
        currency: 'INR',
        name: 'Estate Studio',
        description: 'Verification Badge – Realtor Profile',
        image: '',
        prefill: {
          name: form.fullName,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: '#E63946',
          backdrop_color: 'rgba(0,0,0,0.85)',
        },
        modal: {
          ondismiss: () => {
            reject(new Error('Payment was cancelled. Your form data is saved — try again when ready.'));
          },
        },
        handler: (response) => {
          resolve(response.razorpay_payment_id);
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', (response) => {
        reject(
          new Error(
            response.error?.description || 'Payment failed. Please try again.'
          )
        );
      });

      rzp.open();
    });
  }, [form]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validate()) return;

      setIsSubmitting(true);
      setErrorMsg('');

      try {
        if (wantsVerification) {
          // Payment flow
          const paymentId = await openRazorpay();
          await submitToSheet(paymentId);
        } else {
          // Free flow
          await submitToSheet();
        }
        setIsSuccess(true);
      } catch (err) {
        setErrorMsg(err.message || 'Something went wrong. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [validate, wantsVerification, openRazorpay, submitToSheet]
  );

  const resetForm = () => {
    setForm({
      fullName: '',
      email: '',
      phone: '',
      city: '',
      experience: '',
      specialization: '',
      bio: '',
      instagram: '',
      youtube: '',
      linkedin: '',
      facebook: '',
      twitter: '',
      website: '',
    });
    setWantsVerification(false);
    setIsSuccess(false);
    setErrorMsg('');
    setValidationErrors({});
  };

  // ── Field Error Helper ──
  const FieldError = ({ field }) =>
    validationErrors[field] ? (
      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" />
        {validationErrors[field]}
      </p>
    ) : null;

  // ── Render ──
  return (
    <div className="pt-24 md:pt-32 pb-20 md:pb-32 min-h-screen bg-transparent text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[var(--color-primary)]/8 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-primary)]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/3 blur-[200px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-[2px] w-12 bg-[var(--color-primary)] rounded-full" />
            <span className="text-white text-xs font-bold tracking-[0.3em] uppercase glass-card px-4 py-1.5 rounded-full">
              Join the Network
            </span>
            <div className="h-[2px] w-12 bg-[var(--color-primary)] rounded-full" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter text-white">
            Register as a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-red-400">Realtor</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Join Estate Studio's realtor network. Create your profile and let us promote you to the right audience of high-net-worth clients.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            /* ── Success Screen ── */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="glass-card p-10 md:p-16 rounded-[2.5rem] text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(34,197,94,0.3)]"
              >
                <CheckCircle2 className="w-12 h-12 text-green-400" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Profile Submitted!
              </h2>

              {wantsVerification ? (
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/30 px-5 py-2.5 rounded-full mb-4">
                    <BadgeCheck className="w-5 h-5 text-[var(--color-primary)]" />
                    <span className="text-sm font-bold text-[var(--color-primary)]">
                      Verification Badge Purchased
                    </span>
                  </div>
                  <p className="text-gray-300 text-lg max-w-lg mx-auto font-light">
                    Payment successful! Your verified profile will be live within 24-48 hours. Our team will reach out to you shortly.
                  </p>
                </div>
              ) : (
                <p className="text-gray-300 text-lg max-w-lg mx-auto font-light mb-8">
                  Your profile has been received. Our team will review it and get back to you shortly.
                </p>
              )}

              <button
                onClick={resetForm}
                className="text-[var(--color-primary)] hover:text-white transition-colors uppercase tracking-widest text-sm font-bold"
              >
                Submit Another Profile
              </button>
            </motion.div>
          ) : (
            /* ── Form ── */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
              className="glass-card p-6 md:p-10 rounded-[2.5rem] relative overflow-hidden"
            >
              {/* Decorative corner glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--color-primary)]/10 blur-[80px] rounded-full pointer-events-none" />

              {/* Error banner */}
              <AnimatePresence>
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8 p-4 bg-red-500/10 border border-red-500/40 rounded-xl flex items-start gap-3 text-red-300"
                  >
                    <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                    <p className="text-sm font-medium">{errorMsg}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-10">
                {/* ─── Section 1: Personal Details ─── */}
                <div>
                  <h3 className={sectionTitle}>
                    <User className="w-5 h-5 text-[var(--color-primary)]" />
                    Personal Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                        Full Name <span className="text-[var(--color-primary)]">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
                        <input
                          type="text"
                          name="fullName"
                          value={form.fullName}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={inputBase}
                        />
                      </div>
                      <FieldError field="fullName" />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                        Email Address <span className="text-[var(--color-primary)]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className={inputBase}
                        />
                      </div>
                      <FieldError field="email" />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                        Phone Number <span className="text-[var(--color-primary)]">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className={inputBase}
                        />
                      </div>
                      <FieldError field="phone" />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                        City
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
                        <input
                          type="text"
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          placeholder="e.g. Gurugram"
                          className={inputBase}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                        Experience
                      </label>
                      <CustomSelect
                        name="experience"
                        value={form.experience}
                        onChange={handleChange}
                        placeholder="Select experience"
                        icon={Clock}
                        options={[
                          { value: '', label: 'Select experience' },
                          { value: '0-2 Years', label: '0 – 2 Years' },
                          { value: '2-5 Years', label: '2 – 5 Years' },
                          { value: '5-10 Years', label: '5 – 10 Years' },
                          { value: '10+ Years', label: '10+ Years' },
                        ]}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                        Specialization
                      </label>
                      <CustomSelect
                        name="specialization"
                        value={form.specialization}
                        onChange={handleChange}
                        placeholder="Select specialization"
                        icon={Briefcase}
                        options={[
                          { value: '', label: 'Select specialization' },
                          { value: 'Residential', label: 'Residential' },
                          { value: 'Commercial', label: 'Commercial' },
                          { value: 'Luxury', label: 'Luxury' },
                          { value: 'Plots & Land', label: 'Plots & Land' },
                          { value: 'Builder/Developer', label: 'Builder / Developer' },
                          { value: 'All Types', label: 'All Types' },
                        ]}
                      />
                    </div>
                  </div>
                </div>

                {/* ─── Section 2: Professional Bio ─── */}
                <div>
                  <h3 className={sectionTitle}>
                    <Star className="w-5 h-5 text-[var(--color-primary)]" />
                    Professional Bio <span className="text-[var(--color-primary)] text-sm">*</span>
                  </h3>
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us about yourself, your achievements, and why clients should choose you..."
                    className={`${inputBaseNoIcon} resize-none`}
                  />
                  <FieldError field="bio" />
                </div>

                {/* ─── Section 3: Social Media Links ─── */}
                <div>
                  <h3 className={sectionTitle}>
                    <Globe className="w-5 h-5 text-[var(--color-primary)]" />
                    Social Media & Links
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative">
                      <InstagramIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
                      <input type="url" name="instagram" value={form.instagram} onChange={handleChange} placeholder="Instagram Profile URL" className={inputBase} />
                    </div>
                    <div className="relative">
                      <YoutubeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
                      <input type="url" name="youtube" value={form.youtube} onChange={handleChange} placeholder="YouTube Channel URL" className={inputBase} />
                    </div>
                    <div className="relative">
                      <LinkedinIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
                      <input type="url" name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="LinkedIn Profile URL" className={inputBase} />
                    </div>
                    <div className="relative">
                      <FacebookIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
                      <input type="url" name="facebook" value={form.facebook} onChange={handleChange} placeholder="Facebook Profile URL" className={inputBase} />
                    </div>
                    <div className="relative">
                      <TwitterIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
                      <input type="url" name="twitter" value={form.twitter} onChange={handleChange} placeholder="X (Twitter) Profile URL" className={inputBase} />
                    </div>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
                      <input type="url" name="website" value={form.website} onChange={handleChange} placeholder="Personal Website URL" className={inputBase} />
                    </div>
                  </div>
                </div>

                {/* ─── Section 4: Verification Badge ─── */}
                <div>
                  <h3 className={sectionTitle}>
                    <Shield className="w-5 h-5 text-[var(--color-primary)]" />
                    Verification Badge
                  </h3>

                  <div
                    onClick={() => setWantsVerification(!wantsVerification)}
                    className={`cursor-pointer border-2 rounded-2xl p-6 md:p-8 transition-all duration-500 relative overflow-hidden group ${
                      wantsVerification
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 shadow-[0_0_30px_rgba(230,57,70,0.15)]'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]'
                    }`}
                  >
                    {/* Background shimmer */}
                    {wantsVerification && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-primary)]/5 to-transparent animate-pulse pointer-events-none" />
                    )}

                    <div className="flex items-start gap-4 relative z-10">
                      <div
                        className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                          wantsVerification
                            ? 'border-[var(--color-primary)] bg-[var(--color-primary)] scale-110'
                            : 'border-gray-500'
                        }`}
                      >
                        {wantsVerification && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </div>

                      <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h4 className="text-lg font-bold text-white">
                            Get the Verification Badge
                          </h4>
                          <BadgeCheck className="w-6 h-6 text-[var(--color-primary)]" />
                        </div>
                        <p className="text-sm text-gray-300 font-light mb-4 leading-relaxed">
                          Stand out from the crowd with a verified badge on your profile. Build instant trust and authority with potential clients.
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-end gap-1">
                            <span className="text-3xl font-black text-[var(--color-primary)]">
                              ₹249
                            </span>
                            <span className="text-sm font-medium text-gray-400 mb-1">
                              / One-time
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full">
                              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                              <span className="text-xs text-gray-300">Verified Badge</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full">
                              <ArrowRight className="w-3.5 h-3.5 text-green-400" />
                              <span className="text-xs text-gray-300">Priority Listing</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ─── Submit Button ─── */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4.5 rounded-xl font-bold tracking-wide transition-all duration-300 text-lg flex items-center justify-center gap-3 ${
                      isSubmitting
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : wantsVerification
                        ? 'bg-gradient-to-r from-[var(--color-primary)] to-red-500 text-white hover:from-[var(--color-brand-red-dark)] hover:to-[var(--color-primary)] hover:scale-[1.01] shadow-[0_0_30px_rgba(230,57,70,0.35)]'
                        : 'bg-white/10 text-white hover:bg-white/20 hover:scale-[1.01]'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        PROCESSING...
                      </>
                    ) : wantsVerification ? (
                      <>
                        <Shield className="w-5 h-5" />
                        PAY ₹249 & SUBMIT PROFILE
                      </>
                    ) : (
                      <>
                        <ArrowRight className="w-5 h-5" />
                        SUBMIT PROFILE FOR FREE
                      </>
                    )}
                  </button>

                  {wantsVerification && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1.5"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      Secure payment via Razorpay. Your data is safe.
                    </motion.p>
                  )}
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RealtorProfile;
