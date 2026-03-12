import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Phone, Mail, MapPin, ArrowRight, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-white border-t border-gray-100 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-1">
          <div className="font-display font-bold text-3xl text-primary-blue mb-6">Smart Realty</div>
          <p className="text-gray-500 mb-8 leading-relaxed">
            The premier real estate consultancy for modern property acquisition and investment in Nigeria.
          </p>
          <div className="flex space-x-5">
            {[
              { icon: <Instagram size={20} />, href: '#' },
              { icon: <Linkedin size={20} />, href: '#' },
              { icon: <MessageCircle size={20} />, href: '#' }
            ].map((social, i) => (
              <a key={i} href={social.href} className="w-10 h-10 rounded-full bg-bg-light flex items-center justify-center text-primary-blue hover:bg-primary-teal hover:text-white transition-all duration-300">
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] mb-8 text-primary-blue">Quick Navigation</h4>
          <div className="flex flex-col space-y-4 text-gray-500 font-medium">
            <Link to="/" className="hover:text-primary-teal transition-colors">Home</Link>
            <Link to="/properties" className="hover:text-primary-teal transition-colors">Property Listings</Link>
            <Link to="/about" className="hover:text-primary-teal transition-colors">About Chidi Eze</Link>
            <Link to="/contact" className="hover:text-primary-teal transition-colors">Contact Support</Link>
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] mb-8 text-primary-blue">Contact Details</h4>
          <div className="space-y-5 text-gray-500">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-primary-teal/10 flex items-center justify-center text-primary-teal shrink-0">
                <Phone size={16} />
              </div>
              <span className="text-sm">+234 800 000 0000</span>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-primary-teal/10 flex items-center justify-center text-primary-teal shrink-0">
                <Mail size={16} />
              </div>
              <span className="text-sm">chidi@smartrealtydemo.ng</span>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-primary-teal/10 flex items-center justify-center text-primary-teal shrink-0">
                <MapPin size={16} />
              </div>
              <span className="text-sm">Lekki Phase 1, Lagos, Nigeria</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] mb-8 text-primary-blue">Market Insights</h4>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">Join 5,000+ investors receiving our weekly property market analysis.</p>
          <form className="space-y-3">
            <input type="email" placeholder="Your email address" className="bg-bg-light border border-gray-100 rounded-xl px-4 py-3 text-sm w-full focus:outline-none focus:border-primary-teal transition-all" />
            <button className="w-full bg-primary-blue text-white font-bold py-3 rounded-xl hover:bg-primary-teal transition-all flex items-center justify-center gap-2 group">
              <span>Subscribe</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-gray-100 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">
        <p>© 2026 Smart Realty Nigeria. All Rights Reserved.</p>
        <div className="flex space-x-8 mt-6 md:mt-0">
          <a href="#" className="hover:text-primary-teal transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary-teal transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary-teal transition-colors">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
