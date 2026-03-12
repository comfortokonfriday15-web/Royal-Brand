import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, MessageCircle } from 'lucide-react';
import { SITE_DATA } from '../data';

const About = () => {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/2348000000000?text=${encodeURIComponent("Hello, I'd like to learn more about your services.")}`, '_blank');
  };

  return (
    <div className="pt-24 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
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
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-blue mb-6">Meet Your Consultant</h1>
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
            <button onClick={handleWhatsApp} className="bg-primary-blue text-white px-8 py-4 rounded-full font-bold hover:bg-primary-teal transition-all flex items-center gap-2">
              <MessageCircle size={20} />
              <span>Contact Chidi</span>
            </button>
          </div>
        </div>

        <div className="bg-bg-light rounded-[3rem] p-12 md:p-20 mb-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-blue mb-4">Our Core Values</h2>
            <p className="text-gray-500">The foundation of our success in the Nigerian real estate market.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: 'Integrity', desc: 'We maintain the highest standards of honesty and transparency in every transaction.' },
              { title: 'Excellence', desc: 'We strive to provide superior service and expert guidance to all our clients.' },
              { title: 'Innovation', desc: 'We leverage modern technology to make property search and acquisition seamless.' }
            ].map((value, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary-teal mx-auto mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-display text-xl font-bold text-primary-blue mb-4">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-blue mb-6">Our Mission</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              To redefine the real estate experience in Nigeria by providing transparent, professional, and technology-driven services that empower individuals to find their perfect homes and build generational wealth through property investment.
            </p>
            <ul className="space-y-4">
              {[
                'Verified property listings with clear titles',
                'Expert market analysis and investment advice',
                'Seamless end-to-end transaction support',
                'Personalized property matching services'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-primary-blue font-medium">
                  <CheckCircle2 size={20} className="text-primary-teal" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl aspect-video">
            <img 
              src="https://picsum.photos/seed/mission/1000/600" 
              alt="Smart Realty Mission" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
