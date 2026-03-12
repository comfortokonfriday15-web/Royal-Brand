import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Square, Share2, Heart, Phone, Mail, MessageCircle, Calendar, CheckCircle2, ArrowLeft } from 'lucide-react';
import { SITE_DATA } from '../data';

const PropertyDetail = () => {
  const { id } = useParams();
  const property = SITE_DATA.properties.find(p => p.id === id);
  const [activeTab, setActiveTab] = useState('overview');
  const [bookingDate, setBookingDate] = useState('');

  if (!property) {
    return (
      <div className="pt-32 pb-24 px-6 text-center">
        <h2 className="text-2xl font-bold text-primary-blue mb-4">Property not found</h2>
        <Link to="/properties" className="text-primary-teal font-bold">Back to listings</Link>
      </div>
    );
  }

  const handleWhatsApp = () => {
    const message = `Hello, I'm interested in ${property.name} (${property.id})`;
    window.open(`https://wa.me/2348000000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="pt-24 pb-24 bg-bg-light min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumbs */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/properties" className="hover:text-primary-teal flex items-center gap-1">
            <ArrowLeft size={14} /> Back to Listings
          </Link>
          <span>/</span>
          <span className="text-primary-blue font-medium">{property.name}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Gallery Placeholder */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl mb-8 group">
              <img 
                src={property.image} 
                alt={property.name} 
                className="w-full aspect-video object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 right-6 flex gap-3">
                <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-primary-blue hover:bg-white transition-colors shadow-lg">
                  <Heart size={20} />
                </button>
                <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-primary-blue hover:bg-white transition-colors shadow-lg">
                  <Share2 size={20} />
                </button>
              </div>
              <div className="absolute bottom-6 left-6 bg-primary-teal text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                {property.purpose}
              </div>
            </div>

            {/* Title & Price */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h1 className="font-display text-3xl font-bold text-primary-blue mb-2">{property.name}</h1>
                  <p className="text-gray-500 flex items-center gap-2">
                    <MapPin size={18} className="text-primary-teal" /> {property.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-primary-teal text-3xl font-bold">{property.price}</p>
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">{property.type}</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-50">
                <div className="text-center">
                  <div className="w-10 h-10 bg-bg-light rounded-full flex items-center justify-center text-primary-teal mx-auto mb-2">
                    <Bed size={20} />
                  </div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Bedrooms</p>
                  <p className="text-primary-blue font-bold">{property.details?.beds || 'N/A'}</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-bg-light rounded-full flex items-center justify-center text-primary-teal mx-auto mb-2">
                    <Bath size={20} />
                  </div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Bathrooms</p>
                  <p className="text-primary-blue font-bold">{property.details?.baths || 'N/A'}</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-bg-light rounded-full flex items-center justify-center text-primary-teal mx-auto mb-2">
                    <Square size={20} />
                  </div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Area</p>
                  <p className="text-primary-blue font-bold">{property.details?.sqft || 'N/A'} sqm</p>
                </div>
              </div>

              {/* Description */}
              <div className="mt-8">
                <h3 className="font-display text-xl font-bold text-primary-blue mb-4">Description</h3>
                <p className="text-gray-500 leading-relaxed">
                  {property.description || "This exceptional property offers a perfect blend of luxury and comfort. Featuring high-end finishes, spacious rooms, and a prime location, it's an ideal choice for those seeking a premium lifestyle in Nigeria."}
                </p>
              </div>
            </div>

            {/* Features/Amenities */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="font-display text-xl font-bold text-primary-blue mb-6">Amenities & Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['24/7 Security', 'Swimming Pool', 'Gym', 'CCTV', 'Fitted Kitchen', 'Borehole', 'Ample Parking', 'Boys Quarters'].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-500 text-sm">
                    <CheckCircle2 size={16} className="text-primary-teal" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Inquiry & Booking */}
          <div className="space-y-8">
            {/* Inquiry Form */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-32">
              <h3 className="font-display text-xl font-bold text-primary-blue mb-6">Inquire About This Property</h3>
              
              <div className="space-y-4 mb-8">
                <input type="text" placeholder="Full Name" className="w-full bg-bg-light border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-teal" />
                <input type="email" placeholder="Email Address" className="w-full bg-bg-light border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-teal" />
                <input type="tel" placeholder="Phone Number" className="w-full bg-bg-light border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-teal" />
                <textarea placeholder="Your Message" rows={4} className="w-full bg-bg-light border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-teal resize-none"></textarea>
              </div>

              <button className="w-full bg-primary-blue text-white font-bold py-4 rounded-xl hover:bg-primary-teal transition-all mb-4">
                Send Inquiry
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <button onClick={handleWhatsApp} className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all text-sm">
                  <MessageCircle size={18} /> WhatsApp
                </button>
                <button className="flex items-center justify-center gap-2 bg-accent-gold text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all text-sm">
                  <Phone size={18} /> Call Agent
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-50">
                <h4 className="font-display font-bold text-primary-blue mb-4 flex items-center gap-2">
                  <Calendar size={18} className="text-primary-teal" />
                  Schedule a Viewing
                </h4>
                <input 
                  type="date" 
                  className="w-full bg-bg-light border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-teal mb-4"
                  onChange={(e) => setBookingDate(e.target.value)}
                />
                <button className="w-full border-2 border-primary-teal text-primary-teal font-bold py-3 rounded-xl hover:bg-primary-teal hover:text-white transition-all text-sm">
                  Book Viewing
                </button>
              </div>
            </div>

            {/* Agent Profile Card */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="https://picsum.photos/seed/chidi/100/100" 
                  alt="Chidi Eze" 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-primary-blue">{SITE_DATA.profile.name}</h4>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{SITE_DATA.profile.title}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {SITE_DATA.profile.bio}
              </p>
              <Link to="/about" className="text-primary-teal text-sm font-bold hover:underline">View Profile</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
