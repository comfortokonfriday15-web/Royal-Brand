import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square } from 'lucide-react';

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
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      <Link to={`/properties/${property.id}`} className="block">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={property.image} 
            alt={property.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4 bg-primary-teal text-white px-3 py-1 rounded-full text-xs font-bold">
            {property.purpose}
          </div>
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-primary-blue px-3 py-1 rounded-full text-xs font-bold">
            {property.type}
          </div>
        </div>
      </Link>
      <div className="p-6">
        <Link to={`/properties/${property.id}`}>
          <h3 className="font-display text-xl font-bold text-primary-blue mb-2 hover:text-primary-teal transition-colors line-clamp-1">{property.name}</h3>
        </Link>
        <p className="text-gray-400 text-sm flex items-center gap-1 mb-4">
          <MapPin size={14} /> {property.location}
        </p>
        
        {property.details && (
          <div className="flex items-center gap-4 mb-6 text-gray-500 text-sm">
            {property.details.beds && (
              <div className="flex items-center gap-1">
                <Bed size={16} className="text-primary-teal" />
                <span>{property.details.beds} Beds</span>
              </div>
            )}
            {property.details.baths && (
              <div className="flex items-center gap-1">
                <Bath size={16} className="text-primary-teal" />
                <span>{property.details.baths} Baths</span>
              </div>
            )}
            {property.details.sqft && (
              <div className="flex items-center gap-1">
                <Square size={16} className="text-primary-teal" />
                <span>{property.details.sqft} sqm</span>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between border-t border-gray-50 pt-4">
          <span className="text-primary-teal font-bold text-lg">{property.price}</span>
          <Link 
            to={`/properties/${property.id}`}
            className="text-primary-blue font-bold text-sm hover:text-primary-teal transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
