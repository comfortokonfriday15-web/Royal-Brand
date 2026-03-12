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
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled || !isHome ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className={`font-display font-bold text-2xl tracking-tight ${scrolled || !isHome ? 'text-primary-blue' : 'text-white'}`}>
            Smart Realty
          </Link>
          
          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center space-x-8 text-sm font-semibold ${scrolled || !isHome ? 'text-text-dark' : 'text-white/90'}`}>
            <Link to="/" className="hover:text-primary-teal transition-colors">Home</Link>
            <Link to="/properties" className="hover:text-primary-teal transition-colors">Properties</Link>
            <Link to="/about" className="hover:text-primary-teal transition-colors">About</Link>
            <Link to="/contact" className="hover:text-primary-teal transition-colors">Contact</Link>
            <button 
              onClick={() => setShowBookingModal(true)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-all font-bold ${scrolled || !isHome ? 'bg-primary-blue text-white hover:bg-primary-teal' : 'bg-white text-primary-blue hover:bg-primary-teal hover:text-white'}`}
            >
              <Calendar size={16} />
              <span>Book Appointment</span>
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
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowBookingModal(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
              
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary-teal/10 text-primary-teal rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar size={32} />
                </div>
                <h3 className="font-display text-2xl text-primary-blue font-bold">Book an Appointment</h3>
                <p className="text-gray-500 text-sm mt-2">
                  Schedule a consultation with Chidi Eze to discuss your real estate needs.
                </p>
              </div>

              <form className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full bg-bg-light border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-teal" />
                <input type="email" placeholder="Email Address" className="w-full bg-bg-light border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-teal" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" className="w-full bg-bg-light border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-teal" />
                  <select className="w-full bg-bg-light border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-teal">
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                  </select>
                </div>
                <textarea placeholder="Tell us more about your interest..." rows={3} className="w-full bg-bg-light border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-teal resize-none"></textarea>
                
                <button className="w-full bg-primary-blue text-white font-bold py-4 rounded-xl hover:bg-primary-teal transition-all shadow-lg shadow-primary-blue/20">
                  Confirm Booking
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-50 flex justify-center gap-6">
                <button className="text-gray-400 hover:text-primary-teal transition-colors"><Phone size={20} /></button>
                <button className="text-gray-400 hover:text-primary-teal transition-colors"><Mail size={20} /></button>
                <button className="text-gray-400 hover:text-primary-teal transition-colors"><MessageCircle size={20} /></button>
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
