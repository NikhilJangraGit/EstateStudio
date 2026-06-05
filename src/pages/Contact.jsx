import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle, MapPin, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Phone: '',
    Email: '',
    Message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzWKw_w0uJ_8J8ROLDZcRiH_1OVWHsErJ8Uigc7qsVurGFvaSJbAuOTQjEBbwVs5ksYwg/exec'; 

    try {
      const data = new FormData();
      data.append('Timestamp', new Date().toLocaleString());
      Object.keys(formData).forEach(key => data.append(key, formData[key]));

      await fetch(scriptURL, { method: 'POST', body: data, mode: 'no-cors' });
      
      setIsSuccess(true);
      setFormData({ Name: '', Phone: '', Email: '', Message: '' });
    } catch (error) {
      console.error('Error!', error.message);
      setErrorMsg('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles = "w-full bg-black/40 backdrop-blur-[30px] border border-white/10 text-white rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[var(--color-primary)]/70 focus:border-white/30 outline-none transition-all duration-300 hover:bg-black/60 hover:border-white/20 placeholder-white/20 shadow-inner";

  return (
    <div className="pt-24 md:pt-32 pb-20 md:pb-32 min-h-screen bg-transparent relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--color-primary)]/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl font-bold mb-8 tracking-tighter text-white">Get In Touch</h1>
            <p className="text-gray-400 mb-12 leading-relaxed font-light text-lg">
              Ready to dominate your market? Reach out to us and let's discuss how Estate Studio can be the ultimate marketing partner for your real estate business.
            </p>

            <div className="space-y-8 mb-12">
              <div className="flex items-start">
                <div className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center mr-6 shrink-0">
                  <MapPin className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Office Address</h4>
                  <p className="text-gray-400 font-light leading-relaxed">
                    21/22 S Block, Office Number 17, <br />
                    Sector 24, Gurugram, <br />
                    Haryana, India
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center mr-6 shrink-0">
                  <Mail className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Email Us</h4>
                  <p className="text-gray-400 font-light leading-relaxed">contact@estatestudio.in</p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="w-full h-64 md:h-80 rounded-[2rem] overflow-hidden glass-card relative p-1">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14030.730248443315!2d77.0863032!3d28.4891107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1936c53545bb%3A0xc1bdf2a16d7a4cb2!2sSector%2024%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '1.8rem' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[80%] contrast-125 opacity-70 hover:grayscale-[30%] hover:opacity-100 transition-all duration-500 mix-blend-screen"
              ></iframe>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="glass-card-strong p-10">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-[var(--color-primary)]/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(230,57,70,0.3)]">
                    <CheckCircle2 className="w-12 h-12 text-[var(--color-primary)]" />
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4">Message Sent</h2>
                  <p className="text-gray-400 text-lg max-w-lg mx-auto">
                    Thank you for reaching out. Our team will get back to you shortly.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 text-[var(--color-primary)] hover:text-white transition-colors uppercase tracking-widest text-sm font-bold"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-3xl font-bold mb-8 text-white">Send a Message</h3>
                  {errorMsg && (
                    <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center text-red-400">
                      <AlertCircle className="w-5 h-5 mr-3" />
                      <p className="font-medium">{errorMsg}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">Name</label>
                      <input required type="text" name="Name" value={formData.Name} onChange={handleChange} className={inputStyles} placeholder="Your Name" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">Mobile Number</label>
                      <input required type="tel" name="Phone" value={formData.Phone} onChange={handleChange} className={inputStyles} placeholder="Your Mobile Number" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">Email</label>
                      <input required type="email" name="Email" value={formData.Email} onChange={handleChange} className={inputStyles} placeholder="Your Email Address" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">Message</label>
                      <textarea required name="Message" value={formData.Message} onChange={handleChange} rows="5" className={`${inputStyles} resize-none`} placeholder="How can we help you?"></textarea>
                    </div>

                    <button disabled={isSubmitting} type="submit" className={`bg-[var(--color-primary)] text-white px-8 py-5 rounded-full text-sm font-bold tracking-widest hover:bg-[var(--color-brand-red-dark)] hover:scale-[1.02] transition-all duration-300 inline-flex items-center group w-full justify-center shadow-[0_10px_30px_rgba(230,57,70,0.3)] ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}>
                      {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                      {!isSubmitting && <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
