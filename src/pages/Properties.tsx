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
    <div className="pt-24 pb-24 px-6 bg-bg-light min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold text-primary-blue mb-4">Property Listings</h1>
          <p className="text-gray-500">Discover the best properties across Nigeria's prime locations.</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-8 rounded-3xl shadow-sm mb-12 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 text-primary-blue font-bold">
              <Filter size={20} />
              <span>Search & Filters</span>
            </div>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                placeholder="Search by name, location or description..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="w-full bg-bg-light border border-gray-100 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary-teal transition-all"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Area</label>
              <select 
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                className="w-full bg-bg-light border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-teal"
              >
                {areas.map(area => <option key={area} value={area}>{area}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Type</label>
              <select 
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className="w-full bg-bg-light border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-teal"
              >
                {types.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Purpose</label>
              <select 
                value={filters.purpose}
                onChange={(e) => setFilters({...filters, purpose: e.target.value})}
                className="w-full bg-bg-light border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-teal"
              >
                {purposes.map(purpose => <option key={purpose} value={purpose}>{purpose}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price Range</label>
              <select 
                value={filters.priceRange}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                className="w-full bg-bg-light border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-teal"
              >
                {priceRanges.map(range => <option key={range} value={range}>{range}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Bedrooms</label>
              <select 
                value={filters.beds}
                onChange={(e) => setFilters({...filters, beds: e.target.value})}
                className="w-full bg-bg-light border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-teal"
              >
                {bedOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="flex items-end">
              <button 
                onClick={() => setFilters({search: '', location: 'All', type: 'All', purpose: 'All', priceRange: 'All', beds: 'All', baths: 'All'})}
                className="w-full bg-primary-blue/5 text-primary-blue font-bold py-3 rounded-xl hover:bg-primary-blue hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <X size={16} />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8 flex justify-between items-center">
          <p className="text-gray-500 text-sm">Showing <span className="font-bold text-primary-blue">{filteredProperties.length}</span> properties</p>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-primary-blue mb-2">No properties found</h3>
            <p className="text-gray-400">Try adjusting your filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
