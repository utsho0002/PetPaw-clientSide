import React from 'react';
import { Link } from 'react-router';

const Card = ({ singleData }) => {
  return (
    <div className="group h-full">
      <div className="card bg-base-100 w-full shadow-md hover:shadow-2xl transition-all duration-300 border border-base-200 rounded-2xl overflow-hidden h-full">
        
        {/* Image Section with Zoom Effect */}
        <figure className="relative h-[280px] overflow-hidden">
          <img
            src={singleData.image}
            alt={singleData.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Optional: Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </figure>

        <div className="card-body p-5">
          {/* Title and Category Row */}
          <div className="flex justify-between items-start gap-2">
            <h2 className="card-title text-lg font-bold text-gray-800 leading-tight">
              {singleData.name}
            </h2>
            <div className="badge badge-secondary badge-outline text-xs font-semibold shrink-0">
              {singleData.category}
            </div>
          </div>

          {/* Spacer to push actions to bottom if content varies */}
          <div className="flex-grow"></div> 

          {/* Price and Action Row */}
          <div className="card-actions items-center justify-between mt-4 pt-4 border-t border-base-200">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Price</span>
              <span className="text-xl font-extrabold text-green-600">
                ${singleData.price}
              </span>
            </div>

            <Link to={`/pet-details/${singleData._id}`}>
              {/* Styled as a button but technically keeping your div structure */}
              <div className="btn btn-neutral btn-sm rounded-full px-6 shadow-md group-hover:bg-neutral-800 transition-colors">
                View Details
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;