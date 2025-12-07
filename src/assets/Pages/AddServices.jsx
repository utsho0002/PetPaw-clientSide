import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

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
    <div className="flex items-center justify-center flex-col my-8">
      <h2 className="text-2xl font-bold text-center mb-4">Add New Service</h2>
      <form
        onSubmit={handleSubmit}
        className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-md border p-6 space-y-4"
      >
        <label className="label">Name</label>
        <input type="text" className="input input-bordered w-full" placeholder="Name" name="name" required />

        <label className="label">Category</label>
         <select defaultValue="Pick a browser" className="select" name="category" >
          <option disabled={true}>Categories</option>
          <option>Pets</option>
          <option>Pet Food</option>
          <option>Accessories</option>
          <option>Pet Care Products</option>
        </select>

        <label className="label">Price</label>
        <input type="number" className="input input-bordered w-full" placeholder="Price" name="price" required />

        <label className="label">Location</label>
        <input type="text" className="input input-bordered w-full" placeholder="Location" name="location" required />

        <label className="label">Description</label>
        <textarea className="textarea textarea-bordered w-full" placeholder="Description" name="description" rows="4" required></textarea>

        <label className="label">Image URL</label>
        <input type="text" className="input input-bordered w-full" placeholder="Image URL" name="image" required />

        <label className="label">Email</label>
        <input type="email" className="input input-bordered w-full" name="email" value={user?.email} readOnly />

        <label className="label">Date</label>
        <input type="date" className="input input-bordered w-full" name="date" required />

        <button className="btn btn-primary w-full mt-4" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddServices;
