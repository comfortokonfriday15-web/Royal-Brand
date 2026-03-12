import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, ArrowRight } from 'lucide-react';

interface PropertyCardProps {
  property: {
    id: string;
    name: string;
    location: string;
    type: string;
    purpose: string;
    price: string;
    image: string;
    details?: {
      beds?: number;
      baths?: number;
      sqft?: string;
    };
  };
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="bg-bg-card rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-border-subtle group">
      <Link to={`/properties/${property.id}`} className="block relative aspect-[4/3] overflow-hidden">
        <img 
          src={property.image} 
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-6 left-6 flex gap-2">
          <span className="bg-primary-blue/80 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest">
            {property.purpose}
          </span>
          <span className="bg-accent-gold/80 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest">
            {property.type}
          </span>
        </div>
        <div className="absolute bottom-6 right-6">
          <div className="bg-bg-card/90 backdrop-blur-md p-3 rounded-2xl shadow-xl text-primary-blue">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-60">Investment</p>
            <p className="font-serif text-xl font-bold">{property.price}</p>
          </div>
        </div>
      </Link>
      
      <div className="p-10">
        <div className="flex items-center gap-2 text-accent-gold mb-4">
          <MapPin size={14} />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{property.location}</span>
        </div>
        
        <Link to={`/properties/${property.id}`}>
          <h3 className="font-serif text-2xl font-light text-primary-blue mb-6 group-hover:text-primary-teal transition-colors line-clamp-1">
            {property.name}
          </h3>
        </Link>
        
        {property.details && (
          <div className="flex items-center justify-between py-6 border-y border-border-subtle mb-8 font-display">
            {property.details.beds && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-bg-paper flex items-center justify-center text-primary-teal">
                  <Bed size={14} />
                </div>
                <span className="text-xs font-bold text-text-muted-alt">{property.details.beds} <span className="text-[10px] text-text-muted-alt uppercase tracking-widest ml-1">Beds</span></span>
              </div>
            )}
            {property.details.baths && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-bg-paper flex items-center justify-center text-primary-teal">
                  <Bath size={14} />
                </div>
                <span className="text-xs font-bold text-text-muted-alt">{property.details.baths} <span className="text-[10px] text-text-muted-alt uppercase tracking-widest ml-1">Baths</span></span>
              </div>
            )}
            {property.details.sqft && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-bg-paper flex items-center justify-center text-primary-teal">
                  <Square size={14} />
                </div>
                <span className="text-xs font-bold text-text-muted-alt">{property.details.sqft} <span className="text-[10px] text-text-muted-alt uppercase tracking-widest ml-1">Sqm</span></span>
              </div>
            )}
          </div>
        )}
        
        <Link 
          to={`/properties/${property.id}`}
          className="w-full bg-accent-gold-alt text-white font-bold py-4 rounded-2xl hover:opacity-90 transition-all duration-500 uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 group/btn shadow-lg shadow-accent-gold-alt/20"
        >
          View Details
          <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
