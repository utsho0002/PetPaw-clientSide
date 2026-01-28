import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { FaHeading, FaList, FaDollarSign, FaMapMarkerAlt, FaImage, FaCalendarAlt, FaEnvelope, FaPen } from "react-icons/fa";

const AddServices = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = {
      name: form.name.value,
      category: form.category.value,
      price: parseInt(form.price.value),
      location: form.location.value,
      description: form.description.value,
      image: form.image.value,
      email: form.email.value,
      date: form.date.value,
    };

    axios
      .post("https://pawmart-two.vercel.app/services", formData) // your backend URL
      .then((res) => {
        form.reset();
        Swal.fire({
          icon: "success",
          title: "Service added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="card bg-base-100 w-full max-w-4xl shadow-2xl overflow-hidden rounded-2xl">
        
        {/* Header Section */}
        <div className="bg-primary px-8 py-6 text-white">
          <h2 className="text-3xl font-extrabold text-center">Add New Service</h2>
          <p className="text-center text-primary-content/80 mt-2">
            Fill in the details below to add a service to the catalog.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="card-body p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Service Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaHeading className="text-gray-500" /> Service Name
                </span>
              </label>
              <input 
                type="text" 
                className="input input-bordered focus:border-primary focus:ring-2 focus:ring-primary/20 w-full" 
                placeholder="e.g. Premium Dog Grooming" 
                name="name" 
                required 
              />
            </div>

            {/* Image URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaImage className="text-gray-500" /> Image URL
                </span>
              </label>
              <input 
                type="text" 
                className="input input-bordered focus:border-primary focus:ring-2 focus:ring-primary/20 w-full" 
                placeholder="https://..." 
                name="image" 
                required 
              />
            </div>

            {/* Category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaList className="text-gray-500" /> Category
                </span>
              </label>
              <select defaultValue="Categories" className="select select-bordered w-full focus:border-primary" name="category">
                <option disabled>Categories</option>
                <option>Pets</option>
                <option>Pet Food</option>
                <option>Accessories</option>
                <option>Pet Care Products</option>
              </select>
            </div>

            {/* Price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaDollarSign className="text-gray-500" /> Price
                </span>
              </label>
              <input 
                type="number" 
                className="input input-bordered focus:border-primary focus:ring-2 focus:ring-primary/20 w-full" 
                placeholder="0.00" 
                name="price" 
                required 
              />
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-500" /> Location
                </span>
              </label>
              <input 
                type="text" 
                className="input input-bordered focus:border-primary focus:ring-2 focus:ring-primary/20 w-full" 
                placeholder="City, Country" 
                name="location" 
                required 
              />
            </div>

            {/* Date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-500" /> Date
                </span>
              </label>
              <input 
                type="date" 
                className="input input-bordered focus:border-primary focus:ring-2 focus:ring-primary/20 w-full" 
                name="date" 
                required 
              />
            </div>

            {/* Email (Read Only) */}
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaEnvelope className="text-gray-500" /> Contact Email
                </span>
              </label>
              <input 
                type="email" 
                className="input input-bordered bg-gray-100 text-gray-500 cursor-not-allowed w-full" 
                name="email" 
                value={user?.email || ""} 
                readOnly 
              />
            </div>

            {/* Description (Full Width) */}
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaPen className="text-gray-500" /> Description
                </span>
              </label>
              <textarea 
                className="textarea textarea-bordered focus:border-primary focus:ring-2 focus:ring-primary/20 w-full h-32" 
                placeholder="Write a detailed description of the service..." 
                name="description" 
                required
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-8">
            <button className="btn btn-primary w-full text-lg shadow-lg hover:shadow-primary/50 transition-all duration-300" type="submit">
              Add Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServices;