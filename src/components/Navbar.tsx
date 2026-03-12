import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, Phone, Mail, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const isHome = location.pathname === '/';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled || !isHome ? 'bg-bg-card/90 backdrop-blur-xl shadow-sm py-4 border-b border-border-subtle' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className={`font-serif font-light text-3xl tracking-tight ${scrolled || !isHome ? 'text-primary-blue' : 'text-white'}`}>
            Smart <span className="italic text-accent-gold">Realty</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center space-x-12 text-[10px] font-bold uppercase tracking-[0.2em] ${scrolled || !isHome ? 'text-primary-blue' : 'text-white/90'}`}>
            <Link to="/" className="hover:text-accent-gold transition-colors">Home</Link>
            <Link to="/properties" className="hover:text-accent-gold transition-colors">Properties</Link>
            <Link to="/about" className="hover:text-accent-gold transition-colors">About</Link>
            <Link to="/contact" className="hover:text-accent-gold transition-colors">Contact</Link>
            <button 
              onClick={() => setShowBookingModal(true)}
              className={`flex items-center gap-3 px-8 py-3 rounded-full transition-all duration-500 shadow-xl ${scrolled || !isHome ? 'bg-primary-blue text-white hover:bg-accent-gold shadow-primary-blue/10' : 'bg-white text-primary-blue hover:bg-accent-gold hover:text-white shadow-white/10'}`}
            >
              <Calendar size={14} />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden ${scrolled || !isHome ? 'text-text-dark' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowBookingModal(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-bg-card rounded-[3rem] p-12 max-w-xl w-full shadow-2xl relative border border-border-subtle"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowBookingModal(false)}
                className="absolute top-8 right-8 text-primary-teal hover:text-accent-gold transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-bg-paper text-accent-gold rounded-full flex items-center justify-center mx-auto mb-6 border border-border-subtle">
                  <Calendar size={32} />
                </div>
                <h3 className="font-serif text-3xl text-primary-blue font-light">Book a <span className="italic">Consultation</span></h3>
                <p className="text-text-muted text-sm mt-4 font-sans leading-relaxed">
                  Schedule a private session with our lead consultant to explore exclusive opportunities.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-primary-teal uppercase tracking-[0.2em]">Full Name</label>
                    <input type="text" className="w-full bg-bg-paper/50 border-b border-border-subtle py-3 focus:outline-none focus:border-accent-gold transition-all font-sans" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-primary-teal uppercase tracking-[0.2em]">Email Address</label>
                    <input type="email" className="w-full bg-bg-paper/50 border-b border-border-subtle py-3 focus:outline-none focus:border-accent-gold transition-all font-sans" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-primary-teal uppercase tracking-[0.2em]">Preferred Date</label>
                    <input type="date" className="w-full bg-bg-paper/50 border-b border-border-subtle py-3 focus:outline-none focus:border-accent-gold transition-all font-sans" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-primary-teal uppercase tracking-[0.2em]">Time of Day</label>
                    <select className="w-full bg-bg-paper/50 border-b border-border-subtle py-3 focus:outline-none focus:border-accent-gold transition-all font-sans appearance-none">
                      <option>Morning (9am - 12pm)</option>
                      <option>Afternoon (12pm - 4pm)</option>
                      <option>Evening (4pm - 7pm)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-primary-teal uppercase tracking-[0.2em]">Interest</label>
                  <textarea rows={2} className="w-full bg-bg-paper/50 border-b border-border-subtle py-3 focus:outline-none focus:border-accent-gold transition-all font-sans resize-none" placeholder="Briefly describe your requirements..."></textarea>
                </div>
                
                <button className="w-full bg-primary-blue text-white font-bold py-5 rounded-2xl hover:bg-accent-gold transition-all shadow-xl shadow-primary-blue/10 uppercase tracking-widest text-xs">
                  Confirm Consultation
                </button>
              </form>

              <div className="mt-10 pt-10 border-t border-border-subtle flex justify-center gap-10">
                <button className="text-primary-teal hover:text-accent-gold transition-colors"><Phone size={20} /></button>
                <button className="text-primary-teal hover:text-accent-gold transition-colors"><Mail size={20} /></button>
                <button className="text-primary-teal hover:text-accent-gold transition-colors"><MessageCircle size={20} /></button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-30 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-6 text-xl font-display font-bold text-primary-blue">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-left border-b border-gray-100 pb-4">Home</Link>
              <Link to="/properties" onClick={() => setMobileMenuOpen(false)} className="text-left border-b border-gray-100 pb-4">Properties</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-left border-b border-gray-100 pb-4">About</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-left border-b border-gray-100 pb-4">Contact</Link>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowBookingModal(true);
                }}
                className="bg-primary-blue text-white px-6 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-primary-blue/20 flex items-center justify-center gap-3"
              >
                <Calendar size={20} />
                <span>Book Appointment</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
