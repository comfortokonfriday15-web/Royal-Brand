import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Search, MapPin, Filter, X } from 'lucide-react';
import { SITE_DATA } from '../data';
import PropertyCard from '../components/PropertyCard';

const Properties = () => {
  const locationState = useLocation();
  const [filters, setFilters] = useState({
    search: '',
    location: 'All',
    type: 'All',
    purpose: 'All',
    priceRange: 'All',
    beds: 'All',
    baths: 'All'
  });

  useEffect(() => {
    if (locationState.state) {
      setFilters(prev => ({
        ...prev,
        ...locationState.state
      }));
    }
  }, [locationState.state]);

  const areas = ['All', ...new Set(SITE_DATA.properties.map(p => p.location.split(',')[0].trim()))];
  const cities = ['All', ...new Set(SITE_DATA.properties.map(p => {
    const parts = p.location.split(',');
    return parts.length > 1 ? parts[parts.length - 1].trim() : p.location.trim();
  }))];
  const types = ['All', ...new Set(SITE_DATA.properties.map(p => p.type))];
  const purposes = ['All', ...new Set(SITE_DATA.properties.map(p => p.purpose))];
  const bedOptions = ['All', '1+', '2+', '3+', '4+', '5+'];
  const priceRanges = [
    'All',
    'Under ₦50M',
    '₦50M - ₦100M',
    '₦100M - ₦200M',
    '₦200M - ₦500M',
    'Over ₦500M'
  ];

  const parsePrice = (priceStr: string) => {
    // Remove currency symbol, commas and any text like "/year" or "/night"
    const numericPart = priceStr.replace(/[^0-9]/g, '');
    return parseInt(numericPart, 10) || 0;
  };

  const filteredProperties = SITE_DATA.properties.filter(p => {
    const searchLower = filters.search.toLowerCase();
    const matchSearch = !filters.search || 
      p.name.toLowerCase().includes(searchLower) || 
      p.location.toLowerCase().includes(searchLower) ||
      (p.description && p.description.toLowerCase().includes(searchLower));

    const matchLocation = filters.location === 'All' || p.location.includes(filters.location);
    const matchType = filters.type === 'All' || p.type === filters.type;
    const matchPurpose = filters.purpose === 'All' || p.purpose === filters.purpose;
    
    const propertyBeds = p.details?.beds || 0;
    const matchBeds = filters.beds === 'All' || propertyBeds >= parseInt(filters.beds);

    const propertyBaths = p.details?.baths || 0;
    const matchBaths = filters.baths === 'All' || propertyBaths >= parseInt(filters.baths);

    const price = parsePrice(p.price);
    let matchPrice = true;
    if (filters.priceRange !== 'All') {
      if (filters.priceRange === 'Under ₦50M') matchPrice = price < 50000000;
      else if (filters.priceRange === '₦50M - ₦100M') matchPrice = price >= 50000000 && price <= 100000000;
      else if (filters.priceRange === '₦100M - ₦200M') matchPrice = price > 100000000 && price <= 200000000;
      else if (filters.priceRange === '₦200M - ₦500M') matchPrice = price > 200000000 && price <= 500000000;
      else if (filters.priceRange === 'Over ₦500M') matchPrice = price > 500000000;
    }

    return matchSearch && matchLocation && matchType && matchPurpose && matchBeds && matchBaths && matchPrice;
  });

  return (
    <div className="pt-24 pb-24 px-6 bg-bg-paper min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-light text-primary-blue mb-4">Curated Collection</h1>
          <p className="text-primary-teal font-medium tracking-widest uppercase text-xs">Exceptional Properties Across Nigeria</p>
        </div>

        {/* Filters */}
        <div className="bg-bg-card p-10 rounded-[2rem] shadow-sm mb-16 border border-border-subtle">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-3 text-primary-blue font-serif text-2xl italic">
              <Filter size={24} className="text-accent-gold" />
              <span>Refine Search</span>
            </div>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-teal/40" size={18} />
              <input 
                type="text"
                placeholder="Search by name, location..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="w-full bg-bg-paper/50 border border-border-subtle rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-accent-gold transition-all font-sans"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-primary-teal uppercase tracking-[0.2em]">Area</label>
              <select 
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                className="w-full bg-bg-paper/30 border border-border-subtle rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-gold appearance-none cursor-pointer font-sans"
              >
                {areas.map(area => <option key={area} value={area}>{area}</option>)}
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-primary-teal uppercase tracking-[0.2em]">Type</label>
              <select 
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className="w-full bg-bg-paper/30 border border-border-subtle rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-gold appearance-none cursor-pointer font-sans"
              >
                {types.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-primary-teal uppercase tracking-[0.2em]">Purpose</label>
              <select 
                value={filters.purpose}
                onChange={(e) => setFilters({...filters, purpose: e.target.value})}
                className="w-full bg-bg-paper/30 border border-border-subtle rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-gold appearance-none cursor-pointer font-sans"
              >
                {purposes.map(purpose => <option key={purpose} value={purpose}>{purpose}</option>)}
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-primary-teal uppercase tracking-[0.2em]">Price Range</label>
              <select 
                value={filters.priceRange}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                className="w-full bg-bg-paper/30 border border-border-subtle rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-gold appearance-none cursor-pointer font-sans"
              >
                {priceRanges.map(range => <option key={range} value={range}>{range}</option>)}
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-primary-teal uppercase tracking-[0.2em]">Bedrooms</label>
              <select 
                value={filters.beds}
                onChange={(e) => setFilters({...filters, beds: e.target.value})}
                className="w-full bg-bg-paper/30 border border-border-subtle rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-gold appearance-none cursor-pointer font-sans"
              >
                {bedOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="flex items-end">
              <button 
                onClick={() => setFilters({search: '', location: 'All', type: 'All', purpose: 'All', priceRange: 'All', beds: 'All', baths: 'All'})}
                className="w-full bg-primary-blue text-white font-bold py-4 rounded-xl hover:bg-accent-gold transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-blue/10 font-sans text-xs uppercase tracking-widest"
              >
                <X size={14} />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-10 flex justify-between items-center border-b border-border-subtle pb-6">
          <p className="text-primary-teal font-serif italic text-lg">Showing <span className="font-bold text-primary-blue not-italic">{filteredProperties.length}</span> exquisite properties</p>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-10">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-bg-card rounded-[3rem] border border-dashed border-border-subtle">
            <div className="w-20 h-20 bg-bg-paper text-accent-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={36} />
            </div>
            <h3 className="font-serif text-3xl text-primary-blue mb-3">No matches found</h3>
            <p className="text-primary-teal/60 font-sans">Perhaps try adjusting your criteria to find your perfect estate.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
