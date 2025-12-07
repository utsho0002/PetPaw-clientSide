import React from 'react';
import { FaStar } from 'react-icons/fa6';
import { Link } from 'react-router';

const Card = ({singleData}) => {
    return (
        <div>
            <div className="card bg-base-100  shadow-sm">
        <figure>
          <img
            src={singleData.image}
            alt="Plants"
            className="h-[350px] w-full"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-xl">
            {singleData.name}
            <div className="badge badge-secondary">{singleData.category}</div>
          </h2>

          <div className="card-actions justify-between mt-2">
            <div className="badge badge-outline text-[18px] p-4 text-green-800 font-semibold">
              Price: ${singleData.price}
            </div>
            <Link to={`/pet-details/${singleData._id}`}>
              <div className="badge badge-outline text-[18px] p-4 text-red-500 font-semibold">View Details</div>
            </Link>
          </div>
        </div>
      </div>
        </div>
    );
};

export default Card;