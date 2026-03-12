import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, MessageCircle } from 'lucide-react';
import { SITE_DATA } from '../data';

const About = () => {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/2348000000000?text=${encodeURIComponent("Hello, I'd like to learn more about your services.")}`, '_blank');
  };

  return (
    <div className="pt-24 bg-bg-paper min-h-screen">
      {/* Hero Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-teal/5 -skew-x-12 transform translate-x-1/4" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-serif text-6xl md:text-8xl font-light text-primary-blue mb-8 leading-tight">
                Defining <br />
                <span className="italic text-accent-gold">Excellence</span>
              </h1>
              <p className="text-primary-teal font-medium tracking-[0.3em] uppercase text-xs mb-10">The Smart Realty Story</p>
              <p className="text-text-muted text-lg leading-relaxed mb-10 font-sans max-w-lg">
                For over a decade, we have been the silent force behind some of Nigeria's most significant real estate transactions. Our approach is simple: absolute transparency, unwavering integrity, and a deep understanding of luxury.
              </p>
              <button 
                onClick={handleWhatsApp}
                className="bg-primary-blue text-white px-10 py-5 rounded-full font-bold hover:bg-accent-gold transition-all shadow-xl shadow-primary-blue/10 flex items-center gap-3 group uppercase tracking-widest text-xs"
              >
                <MessageCircle size={18} className="group-hover:rotate-12 transition-transform" />
                <span>Connect with us</span>
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white">
                <img 
                  src="https://picsum.photos/seed/chidi/800/1000" 
                  alt="Chidi Eze" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-accent-gold p-10 rounded-[2rem] shadow-2xl text-white hidden md:block">
                <p className="text-5xl font-serif mb-1">12+</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Years of Mastery</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-32 px-6 bg-primary-blue text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 border border-white rounded-full" />
          <div className="absolute bottom-20 right-20 w-64 h-64 border border-white rounded-full" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div>
              <p className="text-accent-gold font-medium tracking-[0.3em] uppercase text-[10px] mb-6">Our Purpose</p>
              <h2 className="font-serif text-5xl font-light mb-10 leading-tight">
                Mission & <span className="italic text-accent-gold">Core Values</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-12 font-sans">
                Our mission is to redefine the luxury real estate landscape in Nigeria by providing a seamless, transparent, and highly personalized experience for every client. We are committed to excellence in every detail.
              </p>
              <div className="space-y-12">
                {[
                  { 
                    title: "Unwavering Integrity", 
                    desc: "Trust is the cornerstone of our business. We maintain the highest ethical standards, ensuring absolute transparency in every transaction and legal verification for every property.",
                    icon: <CheckCircle2 size={20} />
                  },
                  { 
                    title: "Client Satisfaction", 
                    desc: "We prioritize your vision above all else. Our concierge-level service is designed to exceed expectations, delivering results that align perfectly with your lifestyle and investment goals.",
                    icon: <Star size={20} />
                  },
                  { 
                    title: "Market Expertise", 
                    desc: "With over 12 years of mastery in the Nigerian market, we provide deep insights and strategic advisory that empower our clients to make informed, high-value decisions.",
                    icon: <CheckCircle2 size={20} />
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="w-14 h-14 rounded-full border border-accent-gold/30 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-white transition-all shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-serif text-2xl mb-3 font-light">{item.title}</h4>
                      <p className="text-white/40 text-sm leading-relaxed font-sans font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6 pt-12">
                <div className="aspect-square rounded-[2rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                  <img src="https://picsum.photos/seed/luxury1/600/600" alt="Luxury" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-[3/4] rounded-[2rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                  <img src="https://picsum.photos/seed/luxury2/600/800" alt="Luxury" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="space-y-6">
                <div className="aspect-[3/4] rounded-[2rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                  <img src="https://picsum.photos/seed/luxury3/600/800" alt="Luxury" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-square rounded-[2rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                  <img src="https://picsum.photos/seed/luxury4/600/600" alt="Luxury" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-bg-paper">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Properties Sold", val: "500+" },
              { label: "Happy Clients", val: "1.2k" },
              { label: "Prime Locations", val: "15" },
              { label: "Awards Won", val: "08" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-serif text-6xl text-primary-blue mb-2">{stat.val}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-teal">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
