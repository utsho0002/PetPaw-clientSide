import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';

const EditPets = () => {
    const {user} = useContext(AuthContext);
    const navigation = useNavigate();

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
          title: "Edited",
          text: "Your action was completed successfully!",
        });

        navigation("/my-services");
      })

      .catch((err) => {
        
      });
  };

  const [service, setService] = useState();

  const { id } = useParams();
  useEffect(() => {
    axios.get(`https://pawmart-two.vercel.app/services/${id}`).then((res) => {
      setService(res.data);
    });
  }, [id]);
    return (   
       <div className="flex items-center justify-center flex-col my-8">
      <h2 className="text-2xl font-bold text-center mb-4">Add New Service</h2>
      <form
       onSubmit={handleUpdate}
        className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-md border p-6 space-y-4"
      >
        <label className="label">Name</label>
        <input type="text" className="input input-bordered w-full" placeholder="Name" name="name" required defaultValue={service?.name} />

        <label className="label">Category</label>
        <input type="text" className="input input-bordered w-full" placeholder="Category" name="category" required defaultValue={service?.category}/>

        <label className="label">Price</label>
        <input type="number" className="input input-bordered w-full" placeholder="Price" name="price" required  defaultValue={service?.price}/>

        <label className="label">Location</label>
        <input type="text" className="input input-bordered w-full" placeholder="Location" name="location" required defaultValue={service?.location}/>

        <label className="label">Description</label>
        <textarea className="textarea textarea-bordered w-full" placeholder="Description" name="description" rows="4" required  defaultValue={service?.description}></textarea>

        <label className="label">Image URL</label>
        <input type="text" className="input input-bordered w-full" placeholder="Image URL" name="image" required defaultValue={service?.image}/>

        <label className="label">Email</label>
        <input type="email" className="input input-bordered w-full" name="email" value={user?.email} readOnly />

        <label className="label">Date</label>
        <input type="date" className="input input-bordered w-full" name="date" required defaultValue={service?.date}/>

        <button className="btn btn-primary w-full mt-4" type="submit">Update</button>
      </form>
    </div>
    );
};

export default EditPets;