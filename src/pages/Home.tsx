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
    <div className="pt-0 bg-bg-paper">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-house.png"
            alt="Lagos Skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary-blue/70" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-accent-gold font-medium tracking-[0.4em] uppercase text-xs mb-8">The Pinnacle of Living</p>
            <h1 className="font-serif text-6xl md:text-8xl text-white font-light mb-8 leading-tight">
              Discover Your <br />
              <span className="italic">Perfect Estate</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/60 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-sans font-light"
          >
            Curating Nigeria's most exclusive residential and investment opportunities with absolute discretion.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-bg-card p-4 md:p-3 rounded-3xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-4 max-w-5xl mx-auto mb-12 border border-white/10"
          >
            <div className="flex-1 w-full px-6 flex flex-col items-start border-b md:border-b-0 md:border-r border-border-subtle pb-4 md:pb-0">
              <span className="text-[10px] font-bold text-primary-teal uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                <MapPin size={12} /> Area
              </span>
              <select
                value={heroFilters.location}
                onChange={(e) => setHeroFilters({ ...heroFilters, location: e.target.value })}
                className="bg-transparent w-full focus:outline-none text-sm font-bold text-primary-blue appearance-none cursor-pointer font-sans"
              >
                {areas.map(area => <option key={area} value={area}>{area}</option>)}
              </select>
            </div>

            <div className="flex-1 w-full px-6 flex flex-col items-start border-b md:border-b-0 md:border-r border-border-subtle pb-4 md:pb-0">
              <span className="text-[10px] font-bold text-primary-teal uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                <Star size={12} /> Property Type
              </span>
              <select
                value={heroFilters.type}
                onChange={(e) => setHeroFilters({ ...heroFilters, type: e.target.value })}
                className="bg-transparent w-full focus:outline-none text-sm font-bold text-primary-blue appearance-none cursor-pointer font-sans"
              >
                {types.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>

            <div className="flex-1 w-full px-6 flex flex-col items-start">
              <span className="text-[10px] font-bold text-primary-teal uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                <Search size={12} /> Price Range
              </span>
              <select
                value={heroFilters.priceRange}
                onChange={(e) => setHeroFilters({ ...heroFilters, priceRange: e.target.value })}
                className="bg-transparent w-full focus:outline-none text-sm font-bold text-primary-blue appearance-none cursor-pointer font-sans"
              >
                {priceRanges.map(range => <option key={range} value={range}>{range}</option>)}
              </select>
            </div>

            <button
              onClick={handleSearch}
              className="bg-primary-blue text-white w-full md:w-auto px-12 py-5 rounded-full font-bold hover:bg-accent-gold transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-xl shadow-primary-blue/20 uppercase tracking-widest text-xs"
            >
              <Search size={18} />
              <span>Explore</span>
            </button>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button
              onClick={openCalendar}
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full font-bold hover:bg-white hover:text-primary-blue transition-all flex items-center justify-center gap-3 group uppercase tracking-widest text-xs"
            >
              <Calendar size={18} className="group-hover:scale-110 transition-transform" />
              <span>Book Consultation</span>
            </button>
            <button
              onClick={() => handleWhatsApp()}
              className="w-full sm:w-auto bg-primary-teal text-white px-10 py-5 rounded-full font-bold hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary-teal/20 group uppercase tracking-widest text-xs"
            >
              <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
              <span>Private Inquiry</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-32 px-6 bg-bg-paper">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div>
              <p className="text-accent-gold font-medium tracking-[0.3em] uppercase text-[10px] mb-4">The Selection</p>
              <h2 className="font-playfair text-5xl font-light text-text-dark-alt mb-4">Featured Property</h2>
              <p className="text-primary-teal/60 font-sans italic">Handpicked luxury listings in prime locations.</p>
            </div>
            <button
              onClick={() => navigate('/properties')}
              className="text-accent-gold-alt font-bold flex items-center gap-3 hover:gap-5 transition-all mt-6 md:mt-0 uppercase tracking-widest text-xs border border-accent-gold-alt px-8 py-4 rounded-full"
            >
              View All Properties <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {SITE_DATA.properties.slice(0, 3).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-32 px-6 bg-primary-blue text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <p className="text-accent-gold font-medium tracking-[0.3em] uppercase text-[10px] mb-6">Our Expertise</p>
            <h2 className="font-serif text-5xl md:text-6xl font-light mb-8 leading-tight">Bespoke Real Estate <span className="italic">Solutions</span></h2>
            <p className="text-white/40 max-w-2xl mx-auto font-sans font-light text-lg">We provide a comprehensive suite of services tailored for the discerning investor.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                title: "Property Sales",
                desc: "Expert guidance in acquiring and disposing of high-value residential and commercial assets.",
                icon: <Star size={28} />
              },
              {
                title: "Asset Management",
                desc: "Strategic management of your real estate portfolio to ensure sustained growth and ROI.",
                icon: <MapPin size={28} />
              },
              {
                title: "Investment Advisory",
                desc: "Data-driven insights and market intelligence for high-net-worth individuals.",
                icon: <Search size={28} />
              }
            ].map((service, idx) => (
              <div key={idx} className="group text-center">
                <div className="w-20 h-20 bg-white/5 text-accent-gold rounded-full flex items-center justify-center mb-10 mx-auto border border-white/10 group-hover:bg-accent-gold group-hover:text-white transition-all duration-500">
                  {service.icon}
                </div>
                <h3 className="font-serif text-2xl font-light mb-6">{service.title}</h3>
                <p className="text-white/40 group-hover:text-white/70 leading-relaxed font-sans font-light transition-colors">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 px-6 bg-bg-paper">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-primary-teal font-medium tracking-[0.3em] uppercase text-[10px] mb-6">The Smart Advantage</p>
            <h2 className="font-serif text-5xl font-light text-primary-blue mb-6">Why Discerning Clients <span className="italic">Choose Us</span></h2>
          </div>

          <div className="grid md:grid-cols-4 gap-10">
            {SITE_DATA.profile.whyWorkWith.map((item, index) => (
              <div key={index} className="bg-bg-card p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-border-subtle group">
                <div className="w-12 h-12 bg-bg-paper text-accent-gold rounded-xl flex items-center justify-center mb-8 group-hover:bg-accent-gold group-hover:text-white transition-all">
                  <Star size={20} />
                </div>
                <h3 className="font-serif text-xl font-bold text-primary-blue mb-4">{item.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed font-sans font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-primary-blue text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 border border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] border border-white rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <p className="text-accent-gold font-medium tracking-[0.3em] uppercase text-[10px] mb-6">Client Stories</p>
            <h2 className="font-serif text-5xl md:text-6xl font-light mb-8 leading-tight">Trusted by <span className="italic">Visionaries</span></h2>
            <p className="text-white/40 max-w-2xl mx-auto font-sans font-light text-lg">Real experiences from those who found their sanctuary with us.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {SITE_DATA.testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-md p-12 rounded-[3rem] border border-white/10 flex flex-col h-full hover:bg-white/10 transition-all duration-500 group"
              >
                <div className="flex gap-1 text-accent-gold mb-10">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>

                <p className="font-serif text-2xl italic mb-12 leading-relaxed text-white/90 flex-grow">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-6 pt-10 border-t border-white/10">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-accent-gold shadow-2xl group-hover:scale-110 transition-transform duration-700">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <p className="font-serif text-xl font-bold">{t.name}</p>
                    <p className="text-[10px] text-accent-gold font-bold uppercase tracking-[0.2em]">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 px-6 bg-bg-paper">
        <div className="max-w-5xl mx-auto bg-primary-blue rounded-[4rem] p-16 md:p-24 shadow-2xl relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/5 rounded-full -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-teal/5 rounded-full -ml-48 -mb-48" />

          <div className="relative z-10">
            <p className="text-accent-gold font-medium tracking-[0.3em] uppercase text-[10px] mb-8">The Insider</p>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-white mb-8 leading-tight">Stay Ahead of the <span className="italic">Market</span></h2>
            <p className="text-white/40 mb-12 max-w-xl mx-auto font-sans font-light text-lg">Receive exclusive off-market listings and curated property insights directly to your inbox.</p>

            <form className="flex flex-col md:flex-row gap-6 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-accent-gold transition-all font-sans"
                required
              />
              <button type="submit" className="bg-accent-gold text-white font-bold px-12 py-5 rounded-2xl hover:bg-white hover:text-primary-blue transition-all shadow-2xl uppercase tracking-widest text-xs">
                Subscribe
              </button>
            </form>
            <p className="text-[10px] text-white/20 mt-10 uppercase tracking-[0.3em] font-bold">Absolute Privacy Guaranteed.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
