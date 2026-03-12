import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Clock, Globe } from 'lucide-react';

const Contact = () => {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/2348000000000?text=${encodeURIComponent("Hello, I'd like to inquire about your properties.")}`, '_blank');
  };

  return (
    <div className="pt-24 bg-bg-paper min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-0 rounded-[3rem] overflow-hidden shadow-2xl bg-bg-card border border-border-subtle">
          {/* Contact Info - Dark Side */}
          <div className="bg-primary-blue text-white p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/10 rounded-full -mr-32 -mt-32" />
            <div className="relative z-10">
              <p className="text-accent-gold font-medium tracking-[0.3em] uppercase text-xs mb-6">Contact Us</p>
              <h1 className="font-serif text-5xl md:text-6xl font-light mb-10 leading-tight">
                Let's <span className="italic">Begin</span> Your Journey
              </h1>
              <p className="text-white/60 text-lg mb-16 font-sans leading-relaxed max-w-md">
                Whether you are looking for a luxury residence or a strategic investment, our team is here to guide you with absolute discretion.
              </p>

              <div className="space-y-10">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-white transition-all">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-2">Our Office</h4>
                    <p className="text-white/40 text-sm leading-relaxed">
                      15 Admiralty Way, Lekki Phase 1,<br />Lagos, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-white transition-all">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-2">Direct Line</h4>
                    <p className="text-white/40 text-sm leading-relaxed">+234 800 000 0000</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-white transition-all">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-2">Email</h4>
                    <p className="text-white/40 text-sm leading-relaxed">concierge@smartrealty.ng</p>
                  </div>
                </div>
              </div>

              <div className="mt-20 pt-10 border-t border-white/10 flex gap-6">
                {['Instagram', 'LinkedIn', 'Twitter'].map((social, i) => (
                  <a key={i} href="#" className="text-xs uppercase tracking-widest text-white/40 hover:text-accent-gold transition-colors font-bold">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form - Light Side */}
          <div className="p-12 md:p-20 bg-white">
            <h3 className="font-serif text-3xl text-primary-blue mb-10">Send an Inquiry</h3>
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-primary-teal uppercase tracking-[0.2em]">Full Name</label>
                  <input type="text" className="w-full bg-bg-paper/50 border-b border-border-subtle py-3 focus:outline-none focus:border-accent-gold transition-all font-sans" placeholder="John Doe" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-primary-teal uppercase tracking-[0.2em]">Email Address</label>
                  <input type="email" className="w-full bg-bg-paper/50 border-b border-border-subtle py-3 focus:outline-none focus:border-accent-gold transition-all font-sans" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-primary-teal uppercase tracking-[0.2em]">Interest</label>
                <select className="w-full bg-bg-paper/50 border-b border-border-subtle py-3 focus:outline-none focus:border-accent-gold transition-all font-sans appearance-none">
                  <option>Property Purchase</option>
                  <option>Investment Advisory</option>
                  <option>Property Management</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-primary-teal uppercase tracking-[0.2em]">Message</label>
                <textarea rows={4} className="w-full bg-bg-paper/50 border-b border-border-subtle py-3 focus:outline-none focus:border-accent-gold transition-all font-sans resize-none" placeholder="Tell us about your requirements..."></textarea>
              </div>
              <button className="w-full bg-primary-blue text-white font-bold py-5 rounded-xl hover:bg-accent-gold transition-all shadow-xl shadow-primary-blue/10 uppercase tracking-widest text-xs">
                Send Message
              </button>
            </form>

            <div className="mt-16 pt-10 border-t border-border-subtle text-center">
              <p className="text-text-muted text-sm mb-6">Prefer instant communication?</p>
              <button 
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-3 text-primary-teal font-bold hover:text-accent-gold transition-colors uppercase tracking-widest text-xs"
              >
                <MessageCircle size={18} />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-24 rounded-[3rem] overflow-hidden shadow-2xl h-[500px] border border-border-subtle relative group">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.728551469004!2d3.4735!3d6.43!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf452da351577%3A0x456a2a5a3031f215!2sAdmiralty%20Way%2C%20Lekki%20Phase%201%20106104%2C%20Lagos!5e0!3m2!1sen!2sng!4v1710240000000!5m2!1sen!2sng" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale group-hover:grayscale-0 transition-all duration-1000"
          ></iframe>
          <div className="absolute top-10 left-10 bg-white p-8 rounded-2xl shadow-2xl border border-border-subtle max-w-xs pointer-events-none group-hover:opacity-0 transition-opacity">
            <h4 className="font-serif text-xl text-primary-blue mb-2">Visit Our Studio</h4>
            <p className="text-text-muted text-sm leading-relaxed">Experience our curated portfolio in person at our Lekki Phase 1 office.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
