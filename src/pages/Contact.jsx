import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Agency: '',
    Market: '',
    Objective: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg(''); // clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzWKw_w0uJ_8J8ROLDZcRiH_1OVWHsErJ8Uigc7qsVurGFvaSJbAuOTQjEBbwVs5ksYwg/exec'; 

    try {
      const data = new FormData();
      
      // Inject Timestamp directly from the website so the script doesn't have to guess
      data.append('Timestamp', new Date().toLocaleString());

      Object.keys(formData).forEach(key => data.append(key, formData[key]));

      await fetch(scriptURL, { method: 'POST', body: data, mode: 'no-cors' });
      
      setIsSuccess(true);
      setFormData({ Name: '', Email: '', Phone: '', Agency: '', Market: '', Objective: '' });
    } catch (error) {
      console.error('Error!', error.message);
      setErrorMsg('there is an error please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles = "w-full bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[var(--color-primary)]/70 focus:border-transparent outline-none transition-all duration-300 focus:shadow-[0_0_30px_rgba(211,47,47,0.25)] hover:bg-white/10 placeholder-white/30";

  return (
    <div className="pt-24 md:pt-32 pb-20 md:pb-32 min-h-screen bg-[var(--color-brand-black)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--color-primary)]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 md:p-16 shadow-2xl rounded-[3rem]">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-[var(--color-primary)]/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-12 h-12 text-[var(--color-primary)]" />
                </div>
                <h2 className="text-4xl font-bold text-white mb-4">Briefing Received</h2>
                <p className="text-gray-400 text-lg max-w-lg mx-auto">
                  Thank you for your interest. Our team will review your information and contact you shortly if there is a mutual fit.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 text-[var(--color-primary)] hover:text-white transition-colors uppercase tracking-widest text-sm font-bold"
                >
                  Submit Another Briefing
                </button>
              </motion.div>
            ) : (
              <>
                <h1 className="text-5xl font-bold mb-4 tracking-tighter text-white">The Briefing</h1>
                <p className="text-gray-400 mb-10 leading-relaxed font-light text-lg">
                  We partner exclusively with elite real estate professionals. Please provide detailed information about your current market position and objectives so our team can evaluate the potential for a partnership.
                </p>

                {errorMsg && (
                  <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center text-red-500">
                    <AlertCircle className="w-5 h-5 mr-3" />
                    <p className="font-medium">{errorMsg}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Full Name</label>
                      <input required type="text" name="Name" value={formData.Name} onChange={handleChange} className={inputStyles} placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Email Address</label>
                      <input required type="email" name="Email" value={formData.Email} onChange={handleChange} className={inputStyles} placeholder="john@eliteagency.in" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Mobile Number</label>
                      <input required type="tel" name="Phone" value={formData.Phone} onChange={handleChange} className={inputStyles} placeholder="+91 98765 43210" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Agency</label>
                      <input required type="text" name="Agency" value={formData.Agency} onChange={handleChange} className={inputStyles} placeholder="Elite Agency International" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Primary Market</label>
                    <input required type="text" name="Market" value={formData.Market} onChange={handleChange} className={inputStyles} placeholder="Enter your primary market (e.g., South Mumbai)" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Primary Objective</label>
                    <textarea required name="Objective" value={formData.Objective} onChange={handleChange} rows="4" className={`${inputStyles} resize-none`} placeholder="Describe what you are looking to achieve..."></textarea>
                  </div>

                  <button disabled={isSubmitting} type="submit" className={`bg-[var(--color-primary)] text-white px-8 py-5 rounded-full text-sm font-bold tracking-widest hover:bg-[var(--color-brand-red-dark)] hover:scale-[1.02] transition-all duration-300 inline-flex items-center group w-full justify-center shadow-[0_0_40px_rgba(211,47,47,0.3)] ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}>
                    {isSubmitting ? 'SUBMITTING...' : 'SUBMIT BRIEFING'}
                    {!isSubmitting && <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
