import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Clock, Globe } from 'lucide-react';

const Contact = () => {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/2348000000000?text=${encodeURIComponent("Hello, I'd like to inquire about your properties.")}`, '_blank');
  };

  return (
    <div className="pt-24 pb-24 bg-bg-light min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-blue mb-4">Get in Touch</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">Have questions about a property or want to discuss an investment? We're here to help.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary-teal/10 text-primary-teal rounded-xl flex items-center justify-center mb-6">
                <Phone size={24} />
              </div>
              <h3 className="font-display text-xl font-bold text-primary-blue mb-2">Call Us</h3>
              <p className="text-gray-500 text-sm mb-4">Available Mon-Sat, 9am - 6pm</p>
              <a href="tel:+2348000000000" className="text-primary-teal font-bold">+234 800 000 0000</a>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary-teal/10 text-primary-teal rounded-xl flex items-center justify-center mb-6">
                <Mail size={24} />
              </div>
              <h3 className="font-display text-xl font-bold text-primary-blue mb-2">Email Us</h3>
              <p className="text-gray-500 text-sm mb-4">We'll respond within 24 hours</p>
              <a href="mailto:chidi@smartrealtydemo.ng" className="text-primary-teal font-bold">chidi@smartrealtydemo.ng</a>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary-teal/10 text-primary-teal rounded-xl flex items-center justify-center mb-6">
                <MapPin size={24} />
              </div>
              <h3 className="font-display text-xl font-bold text-primary-blue mb-2">Visit Us</h3>
              <p className="text-gray-500 text-sm mb-4">Our main office in Lagos</p>
              <p className="text-primary-blue font-bold">Lekki Phase 1, Lagos, Nigeria</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 h-full">
              <h3 className="font-display text-2xl font-bold text-primary-blue mb-8">Send us a Message</h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                    <input type="text" className="w-full bg-bg-light border border-gray-100 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-primary-teal" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                    <input type="email" className="w-full bg-bg-light border border-gray-100 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-primary-teal" placeholder="john@example.com" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                    <input type="tel" className="w-full bg-bg-light border border-gray-100 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-primary-teal" placeholder="+234..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Subject</label>
                    <select className="w-full bg-bg-light border border-gray-100 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-primary-teal">
                      <option>General Inquiry</option>
                      <option>Property Viewing</option>
                      <option>Selling my Property</option>
                      <option>Investment Advice</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Your Message</label>
                  <textarea rows={5} className="w-full bg-bg-light border border-gray-100 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-primary-teal resize-none" placeholder="How can we help you?"></textarea>
                </div>

                <div className="flex flex-col md:flex-row gap-4 pt-4">
                  <button type="submit" className="flex-1 bg-primary-blue text-white font-bold py-4 rounded-xl hover:bg-primary-teal transition-all">
                    Send Message
                  </button>
                  <button type="button" onClick={handleWhatsApp} className="flex-1 bg-[#25D366] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2">
                    <MessageCircle size={20} />
                    <span>Chat on WhatsApp</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="w-full h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.728551469504!2d3.467362314769977!3d6.43534599534407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4532688796b%3A0x6335193988f553!2sLekki%20Phase%201%2C%20Lagos!5e0!3m2!1sen!2sng!4v1647084567890!5m2!1sen!2sng" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Smart Realty Office Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
