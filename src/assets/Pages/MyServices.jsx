import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router";
import { MdDeleteForever, MdOutlineCleaningServices } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import axios from "axios";
import { FaBoxOpen } from "react-icons/fa";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://pawmart-two.vercel.app/my-services?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.log(err));
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://pawmart-two.vercel.app/delete/${id}`)
          .then((res) => {
            const filteredData = services.filter((service) => service._id !== id);
            setServices(filteredData);
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Can't delete this item!",
            });
          });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen bg-base-200">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-base-100 p-6 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-3xl font-extrabold flex items-center gap-3">
            <MdOutlineCleaningServices className="text-primary" /> My Services
          </h2>
          <p className="text-gray-500 mt-1">
            Manage the services you have posted.
          </p>
        </div>
        <div className="badge badge-primary badge-lg p-4 font-bold mt-4 md:mt-0">
          Total Services: {services.length}
        </div>
      </div>

      {/* Content Section */}
      {services.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center h-64 bg-base-100 rounded-2xl shadow-sm border border-dashed border-gray-300">
          <FaBoxOpen className="text-6xl text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-500">No Services Found</h3>
          <p className="text-gray-400">You haven't added any services yet.</p>
        </div>
      ) : (
        /* Table Layout */
        <div className="overflow-hidden rounded-2xl shadow-xl bg-base-100 border border-base-200">
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* Table Head */}
              <thead className="bg-base-200 text-base-content uppercase text-sm font-bold">
                <tr>
                  <th className="py-4 pl-6">Service Info</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-base-200">
                {services.map((service) => (
                  <tr key={service._id} className="hover:bg-base-200/50 transition-colors">
                    
                    {/* Name & Image */}
                    <td className="pl-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="mask mask-squircle h-16 w-16 shadow-md">
                            <img
                              src={service.image || "https://img.daisyui.com/images/profile/demo/2@94.webp"}
                              alt="Service"
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          {/* Fallback to 'name' if 'plantName' is undefined, based on typical naming conventions */}
                          <div className="font-bold text-lg">
                            {service.name || service.plantName || "Unnamed Service"}
                          </div>
                          <div className="badge badge-ghost badge-sm mt-1">
                            {service.category || "General"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="max-w-xs">
                      <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>
                    </td>

                    {/* Price */}
                    <td className="font-bold text-primary text-lg">
                      ${service.price}
                    </td>

                    {/* Actions */}
                    <td className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        
                        {/* Edit Button */}
                        <Link to={`/update-service/${service?._id}`}>
                          <div className="tooltip" data-tip="Edit Service">
                            <button className="btn btn-circle btn-sm btn-ghost hover:bg-blue-100 hover:text-blue-600 transition-all border border-gray-200">
                              <CiEdit className="text-xl" />
                            </button>
                          </div>
                        </Link>

                        {/* Delete Button */}
                        <div className="tooltip" data-tip="Delete Service">
                          <button
                            onClick={() => handleDelete(service?._id)}
                            className="btn btn-circle btn-sm btn-ghost hover:bg-red-100 hover:text-red-600 transition-all border border-gray-200"
                          >
                            <MdDeleteForever className="text-xl" />
                          </button>
                        </div>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyServices;