import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Phone, Mail, MapPin, ArrowRight, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary-blue text-white pt-32 pb-16 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/5 rounded-full -mr-48 -mt-48" />
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 mb-24 relative z-10">
        <div className="col-span-1 md:col-span-1">
          <div className="font-serif font-light text-3xl mb-8">
            Smart <span className="italic text-accent-gold">Realty</span>
          </div>
          <p className="text-white/40 mb-10 leading-relaxed font-sans font-light">
            Nigeria's most distinguished real estate consultancy, dedicated to the art of luxury living and strategic investment.
          </p>
          <div className="flex space-x-6">
            {[
              { icon: <Instagram size={18} />, href: '#' },
              { icon: <Linkedin size={18} />, href: '#' },
              { icon: <MessageCircle size={18} />, href: '#' }
            ].map((social, i) => (
              <a key={i} href={social.href} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-accent-gold hover:text-white hover:border-accent-gold transition-all duration-500">
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-10 text-accent-gold">Curated Navigation</h4>
          <div className="flex flex-col space-y-5 text-white/40 font-sans font-light">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/properties" className="hover:text-white transition-colors">Property Collection</Link>
            <Link to="/about" className="hover:text-white transition-colors">Our Philosophy</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Private Inquiry</Link>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-10 text-accent-gold">The Studio</h4>
          <div className="space-y-6 text-white/40 font-sans font-light">
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-white transition-all">
                <Phone size={16} />
              </div>
              <span className="text-sm pt-2">+234 800 000 0000</span>
            </div>
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-white transition-all">
                <Mail size={16} />
              </div>
              <span className="text-sm pt-2">concierge@smartrealty.ng</span>
            </div>
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-white transition-all">
                <MapPin size={16} />
              </div>
              <span className="text-sm pt-2">Lekki Phase 1, Lagos</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-10 text-accent-gold">The Insider</h4>
          <p className="text-white/40 text-sm mb-8 leading-relaxed font-sans font-light">Join our inner circle for off-market opportunities and market intelligence.</p>
          <form className="space-y-4">
            <input type="email" placeholder="Email Address" className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm w-full focus:outline-none focus:border-accent-gold transition-all text-white font-sans" />
            <button className="w-full bg-accent-gold text-white font-bold py-4 rounded-xl hover:bg-white hover:text-primary-blue transition-all flex items-center justify-center gap-3 group uppercase tracking-widest text-[10px]">
              <span>Subscribe</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold">
        <p>© 2026 Smart Realty Nigeria. All Rights Reserved.</p>
        <div className="flex space-x-10 mt-8 md:mt-0">
          <a href="#" className="hover:text-accent-gold transition-colors">Privacy</a>
          <a href="#" className="hover:text-accent-gold transition-colors">Terms</a>
          <a href="#" className="hover:text-accent-gold transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
