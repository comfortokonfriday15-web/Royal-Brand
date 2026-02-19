import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, MapPin, Bed, Bath, Square, Star, ChevronRight, Phone, Mail, Instagram, Linkedin, Smartphone, QrCode } from 'lucide-react';
import VoiceAgentWidget from './components/VoiceAgentWidget';
import { SITE_DATA } from './data';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileAccess, setShowMobileAccess] = useState(false);
  const appUrl = process.env.APP_URL || window.location.href;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-cream font-sans text-text-primary selection:bg-accent-gold selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className={`font-serif font-bold text-2xl tracking-tight ${scrolled ? 'text-text-primary' : 'text-white'}`}>
            Robyn Brand
          </div>
          
          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center space-x-8 text-sm font-medium ${scrolled ? 'text-accent-charcoal' : 'text-white/90'}`}>
            <button onClick={() => scrollToSection('about')} className="hover:text-accent-gold transition-colors">Profile</button>
            <button onClick={() => scrollToSection('listings')} className="hover:text-accent-gold transition-colors">Properties</button>
            <button onClick={() => scrollToSection('why-us')} className="hover:text-accent-gold transition-colors">Compass</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-accent-gold transition-colors">Contact</button>
            <button 
              onClick={() => setShowMobileAccess(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${scrolled ? 'border-accent-charcoal text-accent-charcoal hover:bg-accent-charcoal hover:text-white' : 'border-white text-white hover:bg-white hover:text-accent-charcoal'}`}
            >
              <Smartphone size={16} />
              <span>Mobile Access</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden ${scrolled ? 'text-text-primary' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Access Modal */}
      <AnimatePresence>
        {showMobileAccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowMobileAccess(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowMobileAccess(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-gold/10 text-accent-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode size={24} />
                </div>
                <h3 className="font-serif text-2xl text-text-primary mb-2">Test on Mobile</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Scan this QR code to access the site on your mobile device and test the voice agent.
                </p>
                
                <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-inner inline-block mb-6">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(appUrl)}`}
                    alt="QR Code" 
                    className="w-48 h-48"
                  />
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-500 break-all border border-gray-100">
                  {appUrl}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-30 bg-white pt-24 px-6 md:hidden"
        >
          <div className="flex flex-col space-y-6 text-xl font-serif text-text-primary">
            <button onClick={() => scrollToSection('about')} className="text-left border-b border-gray-100 pb-4">Profile</button>
            <button onClick={() => scrollToSection('listings')} className="text-left border-b border-gray-100 pb-4">Properties</button>
            <button onClick={() => scrollToSection('why-us')} className="text-left border-b border-gray-100 pb-4">Compass</button>
            <button onClick={() => scrollToSection('contact')} className="text-left border-b border-gray-100 pb-4">Contact</button>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/luxuryhouseexterior/1920/1080" 
            alt="Luxury Real Estate" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight"
          >
            Luxury Real Estate<br />Spring TX
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/90 text-lg md:text-xl font-light mb-10 tracking-wide"
          >
            Premier Real Estate in Spring, Texas.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onClick={() => scrollToSection('listings')}
            className="bg-accent-gold text-white px-8 py-4 rounded-full font-medium tracking-wide hover:bg-[#B08D4B] transition-colors duration-300"
          >
            Explore Properties
          </motion.button>
        </div>
      </section>

      {/* Brand Statement / Bio */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl text-text-primary mb-6 leading-tight">
              {SITE_DATA.profile.tagline}
            </h2>
            <div className="w-20 h-1 bg-accent-gold mb-8" />
            <p className="text-accent-charcoal leading-relaxed mb-8 text-lg">
              {SITE_DATA.profile.bio}
            </p>
            <button onClick={() => scrollToSection('listings')} className="text-accent-gold font-medium border-b border-accent-gold pb-1 hover:text-[#B08D4B] hover:border-[#B08D4B] transition-colors inline-flex items-center gap-2">
              VIEW CURRENT LISTINGS <ArrowRight size={16} />
            </button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100">
              <img 
                src="https://picsum.photos/seed/robyn/800/1000" 
                alt="Robyn Brand" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl rounded-lg max-w-xs hidden md:block">
              <p className="font-serif text-xl italic text-text-primary">"Your home is your sanctuary, and I treat it as such."</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Property */}
      <section className="py-24 px-6 bg-bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-text-primary mb-4">Featured Property</h2>
            <p className="text-accent-charcoal uppercase tracking-widest text-sm">The Crown Jewel of Spring</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-0 shadow-2xl rounded-3xl overflow-hidden bg-white">
            <div className="relative h-[400px] lg:h-auto">
              <img 
                src={SITE_DATA.properties[0].image} 
                alt={SITE_DATA.properties[0].name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 bg-accent-gold text-white px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-sm">
                Just Listed
              </div>
            </div>
            <div className="p-12 flex flex-col justify-center">
              <h3 className="font-serif text-3xl text-text-primary mb-2">{SITE_DATA.properties[0].name}</h3>
              <p className="text-accent-gold font-medium mb-6">{SITE_DATA.properties[0].tagline}</p>
              <p className="text-accent-charcoal mb-8 leading-relaxed">
                {SITE_DATA.properties[0].description}
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="flex items-center gap-3 text-accent-charcoal">
                  <Bed className="text-accent-gold" size={20} />
                  <span>{SITE_DATA.properties[0].details.beds} Beds</span>
                </div>
                <div className="flex items-center gap-3 text-accent-charcoal">
                  <Bath className="text-accent-gold" size={20} />
                  <span>{SITE_DATA.properties[0].details.baths} Baths</span>
                </div>
                <div className="flex items-center gap-3 text-accent-charcoal">
                  <Square className="text-accent-gold" size={20} />
                  <span>{SITE_DATA.properties[0].details.sqft} Sq Ft</span>
                </div>
                <div className="flex items-center gap-3 text-accent-charcoal">
                  <MapPin className="text-accent-gold" size={20} />
                  <span>{SITE_DATA.properties[0].details.lot} Lot</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-8">
                <span className="font-serif text-2xl text-text-primary">{SITE_DATA.properties[0].price}</span>
                <button className="bg-accent-gold text-white px-6 py-3 rounded-lg hover:bg-[#B08D4B] transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button onClick={() => scrollToSection('listings')} className="inline-flex items-center gap-2 text-accent-gold border border-accent-gold px-8 py-3 rounded-full hover:bg-accent-gold hover:text-white transition-all duration-300 uppercase text-sm tracking-widest font-medium">
              View All Properties
            </button>
          </div>
        </div>
      </section>

      {/* Why Work With Robyn */}
      <section id="why-us" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-4xl text-text-primary mb-16 text-center">Why Work With Robyn</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SITE_DATA.profile.whyWorkWith.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 border border-gray-100 rounded-xl hover:shadow-lg transition-shadow duration-300 bg-white group"
              >
                <div className="w-12 h-12 bg-bg-cream rounded-full flex items-center justify-center mb-6 text-accent-gold group-hover:bg-accent-gold group-hover:text-white transition-colors">
                  <Star size={24} />
                </div>
                <h3 className="font-serif text-xl mb-4 text-text-primary">{item.title}</h3>
                <p className="text-accent-charcoal text-sm leading-relaxed opacity-80">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Listings */}
      <section id="listings" className="py-24 px-6 bg-bg-cream">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-4xl text-text-primary mb-16 text-center">Exclusive Listings</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {SITE_DATA.properties.slice(1).map((property) => (
              <div key={property.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-text-primary mb-2">{property.name}</h3>
                  <p className="text-accent-gold font-medium mb-4">{property.price}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>Spring, TX</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-white border-t border-gray-200 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="font-serif font-bold text-2xl text-text-primary mb-6">Robyn Brand</div>
            <p className="text-accent-charcoal mb-6 max-w-xs">
              Providing exceptional service in the Spring and Woodlands luxury real estate market.
            </p>
            <div className="flex space-x-4 text-accent-charcoal">
              <a href="#" className="hover:text-accent-gold transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-accent-gold transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-sans font-bold text-sm uppercase tracking-widest mb-6 text-text-primary">Contact</h4>
            <div className="space-y-4 text-accent-charcoal">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-accent-gold" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-accent-gold" />
                <span>robyn.brand@compass.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-accent-gold" />
                <span>Compass RE Texas, LLC</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-sans font-bold text-sm uppercase tracking-widest mb-6 text-text-primary">Navigation</h4>
            <div className="grid grid-cols-2 gap-2 text-accent-charcoal">
              <button onClick={() => scrollToSection('about')} className="text-left hover:text-accent-gold">Profile</button>
              <button onClick={() => scrollToSection('listings')} className="text-left hover:text-accent-gold">Properties</button>
              <button onClick={() => scrollToSection('why-us')} className="text-left hover:text-accent-gold">Compass Advantage</button>
              <button onClick={() => scrollToSection('contact')} className="text-left hover:text-accent-gold">Contact</button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>Compass Real Estate © 2024. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-accent-gold">Privacy Policy</a>
            <a href="#" className="hover:text-accent-gold">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* AI Voice Agent Widget */}
      <VoiceAgentWidget />
    </div>
  );
}

export default App;
