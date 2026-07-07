import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  User,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  Loader2,
  BadgeCheck,
  Clock,
  MessageSquare,
  ArrowLeft,
} from 'lucide-react';
import CustomSelect from '../components/ui/CustomSelect';
import { demoRealtors } from '../data/realtors';

const SCRIPT_URL = import.meta.env.VITE_REALTOR_SCRIPT_URL;

const inputBase =
  'w-full bg-white/[0.04] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/50 focus:bg-white/[0.06] transition-all duration-300 text-sm';

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedRealtor, setSelectedRealtor] = useState(null);

  useEffect(() => {
    if (id) {
      const realtor = demoRealtors.find((r) => r.id === parseInt(id));
      if (realtor) {
        setSelectedRealtor(realtor);
      }
    }
  }, [id]);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    propertyType: '',
    budget: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    setErrorMsg('');
  }, []);

  const validate = useCallback(() => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Name is required';
    if (!form.phone.trim()) errors.phone = 'Phone is required';
    if (!form.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [form]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validate()) return;

      setIsSubmitting(true);
      setErrorMsg('');

      try {
        // Mock saving lead to the database securely for the assigned realtor
        // In a real app with Firebase: await addDoc(collection(db, 'leads'), { ...newLead })
        const newLead = {
          id: 'LD-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
          name: form.name,
          email: form.email,
          phone: form.phone,
          city: form.city,
          propertyType: form.propertyType,
          budget: form.budget,
          message: form.message,
          realtorId: selectedRealtor ? selectedRealtor.id.toString() : 'unassigned', // Assigns strictly to this realtor
          timestamp: new Date().toLocaleString()
        };

        const existingLeads = JSON.parse(localStorage.getItem('estate_studio_leads') || '[]');
        existingLeads.push(newLead);
        localStorage.setItem('estate_studio_leads', JSON.stringify(existingLeads));

        // Still send to Google Sheets for backup if needed (Optional, keeping the old logic for fallback)
        const data = new FormData();
        data.append('Timestamp', new Date().toLocaleString());
        data.append('Type', 'Realtor Booking');
        data.append('Name', form.name);
        data.append('Email', form.email);
        data.append('Phone', form.phone);
        data.append('City', form.city);
        data.append('PropertyType', form.propertyType);
        data.append('Budget', form.budget);
        data.append('Message', form.message);
        data.append('SelectedRealtor', selectedRealtor ? selectedRealtor.name : 'General Inquiry');

        try {
          await fetch(SCRIPT_URL, { method: 'POST', body: data, mode: 'no-cors' });
        } catch (e) {
          console.error("Google sheet backup failed", e);
        }

        setIsSuccess(true);
      } catch (err) {
        setErrorMsg('Something went wrong. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [validate, form, selectedRealtor]
  );

  const resetAll = () => {
    navigate('/book-my-realtor');
  };

  const FieldError = ({ field }) =>
    validationErrors[field] ? (
      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" />
        {validationErrors[field]}
      </p>
    ) : null;

  return (
    <div className="pt-24 md:pt-32 pb-20 md:pb-32 min-h-screen bg-transparent text-white relative overflow-hidden">
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[var(--color-primary)]/8 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-primary)]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Realtors
        </button>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="booking-form"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--color-primary)]/10 blur-[80px] rounded-full pointer-events-none" />

              {/* Selected Realtor Banner */}
              {selectedRealtor ? (
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl mb-8">
                  <img
                    src={selectedRealtor.image}
                    alt={selectedRealtor.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white">{selectedRealtor.name}</h4>
                      {selectedRealtor.verified && (
                        <BadgeCheck className="w-4 h-4 text-[var(--color-primary)]" />
                      )}
                    </div>
                    <p className="text-xs text-gray-400">
                      {selectedRealtor.specialization} • {selectedRealtor.city}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mb-8">
                  <span className="text-[var(--color-primary)] text-xs font-bold tracking-[0.3em] uppercase">
                    General Inquiry
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">Book a Consultation</h3>
              <p className="text-gray-400 text-sm font-light mb-8">
                Fill in your details and we'll connect you with{' '}
                {selectedRealtor ? selectedRealtor.name : 'the right realtor'}.
              </p>

              <AnimatePresence>
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 bg-red-500/10 border border-red-500/40 rounded-xl flex items-start gap-3 text-red-300"
                  >
                    <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                    <p className="text-sm font-medium">{errorMsg}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                      Your Name <span className="text-[var(--color-primary)]">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Full name"
                        className={inputBase}
                      />
                    </div>
                    <FieldError field="name" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                      Email <span className="text-[var(--color-primary)]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
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
                      Phone <span className="text-[var(--color-primary)]">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
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
                      Your City
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                      Property Type
                    </label>
                    <CustomSelect
                      name="propertyType"
                      value={form.propertyType}
                      onChange={handleChange}
                      placeholder="Select type"
                      options={[
                        { value: '', label: 'Select type' },
                        { value: 'Residential', label: 'Residential' },
                        { value: 'Commercial', label: 'Commercial' },
                        { value: 'Plot/Land', label: 'Plot / Land' },
                        { value: 'Luxury Villa', label: 'Luxury Villa' },
                        { value: 'Office Space', label: 'Office Space' },
                        { value: 'Other', label: 'Other' },
                      ]}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                      Budget Range
                    </label>
                    <CustomSelect
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      placeholder="Select budget"
                      options={[
                        { value: '', label: 'Select budget' },
                        { value: 'Under ₹50 Lakh', label: 'Under ₹50 Lakh' },
                        { value: '₹50 Lakh - ₹1 Cr', label: '₹50 Lakh – ₹1 Cr' },
                        { value: '₹1 Cr - ₹3 Cr', label: '₹1 Cr – ₹3 Cr' },
                        { value: '₹3 Cr - ₹5 Cr', label: '₹3 Cr – ₹5 Cr' },
                        { value: '₹5 Cr+', label: '₹5 Cr+' },
                      ]}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                    <MessageSquare className="w-3.5 h-3.5 inline mr-1" />
                    Your Requirements
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Tell us what you're looking for..."
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-3.5 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/50 transition-all text-sm resize-none"
                  />
                </div>

                <div className="flex flex-col gap-3 mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl font-bold tracking-wide transition-all duration-300 text-lg flex items-center justify-center gap-3 bg-gradient-to-r from-[var(--color-primary)] to-red-500 text-white hover:from-[var(--color-brand-red-dark)] hover:to-[var(--color-primary)] hover:scale-[1.01] shadow-[0_0_30px_rgba(230,57,70,0.3)] ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        SUBMITTING...
                      </>
                    ) : (
                      <>
                        <Clock className="w-5 h-5" />
                        BOOK CONSULTATION
                      </>
                    )}
                  </button>

                  {selectedRealtor && selectedRealtor.whatsapp && (
                    <a
                      href={`https://wa.me/${selectedRealtor.whatsapp}?text=Hi ${selectedRealtor.name}, I found your profile on Estate Studio and want to discuss my property requirements.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 rounded-xl font-bold tracking-wide transition-all duration-300 text-lg flex items-center justify-center gap-3 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366] hover:text-white hover:shadow-[0_0_30px_rgba(37,211,102,0.3)]"
                    >
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      CHAT ON WHATSAPP
                    </a>
                  )}
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Booking Confirmed!</h2>
              <p className="text-gray-300 text-lg max-w-lg mx-auto font-light mb-8">
                {selectedRealtor
                  ? `We've received your request. ${selectedRealtor.name} will get in touch with you within 24 hours.`
                  : "We've received your request. Our team will connect you with the right realtor shortly."}
              </p>
              <button
                onClick={resetAll}
                className="text-[var(--color-primary)] hover:text-white transition-colors uppercase tracking-widest text-sm font-bold"
              >
                Back to Realtors
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookingForm;
