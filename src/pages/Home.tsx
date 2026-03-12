import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Search, MessageCircle, Star, Calendar, Phone } from 'lucide-react';
import { SITE_DATA } from '../data';
import PropertyCard from '../components/PropertyCard';

const Home = () => {
  const navigate = useNavigate();
  const [heroFilters, setHeroFilters] = useState({
    location: 'All',
    type: 'All',
    priceRange: 'All'
  });

  const locations = ['All', ...new Set(SITE_DATA.properties.map(p => {
    const parts = p.location.split(',');
    return parts.length > 1 ? parts[parts.length - 1].trim() : p.location.trim();
  }))];
  const areas = ['All', ...new Set(SITE_DATA.properties.map(p => p.location.split(',')[0].trim()))];
  const types = ['All', ...new Set(SITE_DATA.properties.map(p => p.type))];
  const priceRanges = [
    'All',
    'Under ₦50M',
    '₦50M - ₦100M',
    '₦100M - ₦200M',
    '₦200M - ₦500M',
    'Over ₦500M'
  ];

  const handleSearch = () => {
    navigate('/properties', { state: heroFilters });
  };

  const handleWhatsApp = (propertyName?: string) => {
    const message = propertyName 
      ? `Hello, I'm interested in ${propertyName}`
      : "Hello, I'm interested in your real estate services.";
    window.open(`https://wa.me/2348000000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  const openCalendar = () => {
    window.open('https://calendly.com/smartrealty', '_blank');
  };

  return (
    <div className="pt-0">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/lagos/1920/1080" 
            alt="Lagos Skyline" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary-blue/60" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl text-white font-bold mb-6 leading-tight"
          >
            Find Your Dream Home<br />in Nigeria
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          >
            Luxury apartments, duplexes, and prime land in Lagos and Abuja.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white p-4 md:p-3 rounded-3xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-4 max-w-5xl mx-auto mb-10"
          >
            <div className="flex-1 w-full px-4 flex flex-col items-start border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                <MapPin size={12} /> Area
              </span>
              <select 
                value={heroFilters.location}
                onChange={(e) => setHeroFilters({...heroFilters, location: e.target.value})}
                className="bg-transparent w-full focus:outline-none text-sm font-bold text-primary-blue appearance-none cursor-pointer"
              >
                {areas.map(area => <option key={area} value={area}>{area}</option>)}
              </select>
            </div>
            
            <div className="flex-1 w-full px-4 flex flex-col items-start border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                <Star size={12} /> Property Type
              </span>
              <select 
                value={heroFilters.type}
                onChange={(e) => setHeroFilters({...heroFilters, type: e.target.value})}
                className="bg-transparent w-full focus:outline-none text-sm font-bold text-primary-blue appearance-none cursor-pointer"
              >
                {types.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            
            <div className="flex-1 w-full px-4 flex flex-col items-start">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                <Search size={12} /> Price Range
              </span>
              <select 
                value={heroFilters.priceRange}
                onChange={(e) => setHeroFilters({...heroFilters, priceRange: e.target.value})}
                className="bg-transparent w-full focus:outline-none text-sm font-bold text-primary-blue appearance-none cursor-pointer"
              >
                {priceRanges.map(range => <option key={range} value={range}>{range}</option>)}
              </select>
            </div>
            
            <button 
              onClick={handleSearch}
              className="bg-primary-teal text-white w-full md:w-auto px-10 py-5 rounded-full font-bold hover:bg-[#15806D] transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-primary-teal/20"
            >
              <Search size={20} />
              <span>Search Properties</span>
            </button>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={openCalendar}
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-primary-blue transition-all flex items-center justify-center gap-3 group"
            >
              <Calendar size={20} className="group-hover:scale-110 transition-transform" />
              <span>Book Appointment</span>
            </button>
            <button 
              onClick={() => handleWhatsApp()}
              className="w-full sm:w-auto bg-[#25D366] text-white px-8 py-4 rounded-full font-bold hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/20 group"
            >
              <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
              <span>Talk to Support</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="font-display text-4xl font-bold text-primary-blue mb-4">Featured Properties</h2>
              <p className="text-gray-500">Handpicked luxury listings in prime locations.</p>
            </div>
            <button 
              onClick={() => navigate('/properties')}
              className="text-primary-teal font-bold flex items-center gap-2 hover:gap-3 transition-all mt-4 md:mt-0"
            >
              Browse All Listings <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SITE_DATA.properties.slice(0, 3).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-24 px-6 bg-primary-blue text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Our Premium Services</h2>
            <p className="text-white/60 max-w-2xl mx-auto">We provide a comprehensive suite of real estate services tailored to the Nigerian market.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Property Sales",
                desc: "Expert guidance in buying and selling luxury residential and commercial properties.",
                icon: <Star size={32} />
              },
              {
                title: "Property Management",
                desc: "Full-service management for landlords, ensuring maximum ROI and tenant satisfaction.",
                icon: <MapPin size={32} />
              },
              {
                title: "Investment Advisory",
                desc: "Strategic advice for real estate investors looking to capitalize on Nigeria's growth.",
                icon: <Search size={32} />
              }
            ].map((service, idx) => (
              <div key={idx} className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white hover:text-primary-blue transition-all duration-500">
                <div className="w-16 h-16 bg-primary-teal/20 text-primary-teal rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary-blue/10">
                  {service.icon}
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-white/60 group-hover:text-gray-500 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 bg-bg-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-primary-blue mb-4">Why Choose Smart Realty</h2>
            <p className="text-gray-500">We provide the expertise and support you need to secure your future.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {SITE_DATA.profile.whyWorkWith.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-teal/10 text-primary-teal rounded-xl flex items-center justify-center mb-6">
                  <Star size={24} />
                </div>
                <h3 className="font-display text-xl font-bold text-primary-blue mb-4">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/chidi/800/1000" 
                alt="Chidi Eze" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-accent-gold p-8 rounded-2xl shadow-xl text-white hidden md:block">
              <p className="text-4xl font-bold mb-1">12+</p>
              <p className="text-sm font-medium opacity-90 uppercase tracking-widest">Years Experience</p>
            </div>
          </div>
          <div>
            <h2 className="font-display text-4xl font-bold text-primary-blue mb-6">Meet Your Consultant</h2>
            <p className="text-primary-teal font-bold text-xl mb-6">{SITE_DATA.profile.name}</p>
            <p className="text-gray-500 leading-relaxed mb-8 text-lg">
              {SITE_DATA.profile.bio}
            </p>
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-bg-light rounded-full flex items-center justify-center text-primary-teal">
                  <Star size={20} />
                </div>
                <span className="font-bold text-sm">Trustworthy</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-bg-light rounded-full flex items-center justify-center text-primary-teal">
                  <Star size={20} />
                </div>
                <span className="font-bold text-sm">Transparent</span>
              </div>
            </div>
            <button onClick={() => handleWhatsApp()} className="bg-primary-blue text-white px-8 py-4 rounded-full font-bold hover:bg-primary-teal transition-all flex items-center gap-2">
              <MessageCircle size={20} />
              <span>Contact Chidi</span>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-primary-blue text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 border-2 border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-96 h-96 border-2 border-white rounded-full" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Trusted by Homeowners</h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">Real stories from our happy clients who found their perfect properties across Nigeria.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {SITE_DATA.testimonials.map((t, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 flex flex-col h-full hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex gap-1 text-accent-gold mb-8">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                
                <p className="text-xl italic mb-10 leading-relaxed text-white/90 flex-grow">
                  "{t.text}"
                </p>
                
                <div className="flex items-center gap-5 pt-8 border-t border-white/10">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary-teal shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <img 
                      src={t.image} 
                      alt={t.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{t.name}</p>
                    <p className="text-sm text-primary-teal font-medium">{t.location}, Nigeria</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 px-6 bg-bg-light">
        <div className="max-w-5xl mx-auto bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-teal/5 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-blue/5 rounded-full -ml-32 -mb-32" />
          
          <div className="relative z-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-blue mb-6">Stay Updated with Nigeria's Property Market</h2>
            <p className="text-gray-500 mb-10 max-w-xl mx-auto">Subscribe to our newsletter and receive the latest property listings, market trends, and investment opportunities directly in your inbox.</p>
            
            <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 bg-bg-light border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary-teal"
                required
              />
              <button type="submit" className="bg-primary-blue text-white font-bold px-8 py-4 rounded-2xl hover:bg-primary-teal transition-all shadow-lg shadow-primary-blue/20">
                Subscribe Now
              </button>
            </form>
            <p className="text-[10px] text-gray-400 mt-6 uppercase tracking-widest">No spam, only valuable property insights.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
