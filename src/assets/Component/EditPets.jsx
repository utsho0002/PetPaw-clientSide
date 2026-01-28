import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';
import { FaEdit, FaTag, FaDollarSign, FaMapMarkerAlt, FaImage, FaCalendarAlt, FaEnvelope, FaPen, FaHeading } from "react-icons/fa";

const EditPets = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigate();
  const [service, setService] = useState(null); 
  const { id } = useParams();

  // Fetch Data
  useEffect(() => {
    axios.get(`https://pawmart-two.vercel.app/services/${id}`).then((res) => {
      setService(res.data);
    });
  }, [id]);

  const handleUpdate = (e) => {
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
      .put(`https://pawmart-two.vercel.app/update/${id}`, formData)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Service updated successfully.",
        });
        navigation("/my-services");
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update service.",
        });
      });
  };

  // 1. Loading State (Crucial for Edit pages)
  if (!service) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 flex items-center justify-center">
      
      <div className="card bg-base-100 w-full max-w-5xl shadow-2xl rounded-2xl overflow-hidden border border-base-300">
        
        {/* 2. Header */}
        <div className="bg-primary p-6 text-primary-content text-center">
          <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
            <FaEdit /> Update Service
          </h2>
          <p className="opacity-80 mt-1">Update the details of your service below</p>
        </div>

        {/* 3. Form */}
        <form onSubmit={handleUpdate} className="card-body p-8 lg:p-12">
          
          {/* Grid Layout: 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

            {/* Row 1: Name & Price */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                    <FaHeading className="text-gray-400"/> Service Name
                </span>
              </label>
              <input type="text" name="name" defaultValue={service?.name} placeholder="Service Name" className="input input-bordered w-full focus:input-primary" required />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                    <FaDollarSign className="text-gray-400"/> Price
                </span>
              </label>
              <input type="number" name="price" defaultValue={service?.price} placeholder="0.00" className="input input-bordered w-full focus:input-primary" required />
            </div>

            {/* Row 2: Category & Date */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                    <FaTag className="text-gray-400"/> Category
                </span>
              </label>
              <input type="text" name="category" defaultValue={service?.category} placeholder="Category" className="input input-bordered w-full focus:input-primary" required />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-400"/> Date
                </span>
              </label>
              <input type="date" name="date" defaultValue={service?.date} className="input input-bordered w-full focus:input-primary" required />
            </div>

            {/* Row 3: Location & Image */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-400"/> Location
                </span>
              </label>
              <input type="text" name="location" defaultValue={service?.location} placeholder="City, Country" className="input input-bordered w-full focus:input-primary" required />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                    <FaImage className="text-gray-400"/> Image URL
                </span>
              </label>
              <input type="text" name="image" defaultValue={service?.image} placeholder="https://..." className="input input-bordered w-full focus:input-primary" required />
            </div>

            {/* Row 4: Email (Full Width) */}
            <div className="form-control w-full md:col-span-2">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                    <FaEnvelope className="text-gray-400"/> Contact Email (Read Only)
                </span>
              </label>
              <input type="email" name="email" value={user?.email || ""} readOnly className="input input-bordered w-full bg-base-200 text-gray-500 cursor-not-allowed" />
            </div>

            {/* Row 5: Description (Full Width) */}
            <div className="form-control w-full md:col-span-2">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                    <FaPen className="text-gray-400"/> Description
                </span>
              </label>
              <textarea name="description" defaultValue={service?.description} className="textarea textarea-bordered h-32 focus:textarea-primary w-full text-base leading-relaxed" placeholder="Detailed description..." required></textarea>
            </div>

          </div>

          {/* Submit Button */}
          <div className="form-control mt-8">
            <button className="btn btn-primary w-full text-lg font-bold shadow-lg" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPets;