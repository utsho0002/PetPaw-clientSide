import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { FaMapMarkerAlt, FaTag, FaBoxOpen, FaDollarSign, FaUser, FaEnvelope, FaPhone, FaTruck } from "react-icons/fa";

const ItemDetails = ({ data }) => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const handleOrder = (e) => {
    e.preventDefault();
    const form = e.target;
    // ... (Your existing logic)
    const productName = form.productName.value;
    const buyerName = form.buyerName.value;
    const email = form.email.value;
    const quantity = parseInt(form.quantity.value);
    const price = parseInt(form.price.value);
    const adress = form.adress.value;
    const number = form.number.value;
    const details = form.details.value;

    const forData = {
      productId: id,
      productName,
      buyerName,
      email,
      quantity,
      price,
      adress,
      number,
      details,
      date: new Date(),
    };

    axios
      .post("https://pawmart-two.vercel.app/orders", forData)
      .then((res) => {
        Swal.fire({
          title: "Order Completed!",
          text: "Your order has been Confirmed.",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((err) => {
        console.error(err);
      });

    document.getElementById("my_modal_3").close();
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      
      {/* --- Main Product Card --- */}
      <div className="card lg:card-side bg-base-100 shadow-xl border border-base-200 overflow-hidden">
        
        {/* Left: Image Section */}
        <figure className="lg:w-1/2 h-[400px] lg:h-[600px] relative">
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-4 left-4">
             <span className="badge badge-secondary badge-lg shadow-md capitalize font-bold px-4 py-3">
                {data.category}
             </span>
          </div>
        </figure>

        {/* Right: Content Section */}
        <div className="card-body lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white">
          
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800 tracking-tight leading-tight">
              {data.name}
            </h1>
            
            <div className="flex flex-wrap gap-3 text-gray-600 font-medium">
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm">
                    <FaTag className="text-primary"/> {data.category}
                </div>
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm">
                    <FaMapMarkerAlt className="text-red-500"/> {data.location}
                </div>
            </div>
          </div>

          <div className="divider my-6"></div>

          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-extrabold text-green-600 flex items-center">
               <FaDollarSign className="text-3xl"/>{data.price}
            </h2>
            <span className="text-gray-400 font-medium">/ per unit</span>
          </div>

          <div className="py-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-gray-700">
                <FaBoxOpen /> Description
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {data.description}
            </p>
          </div>

          <div className="card-actions mt-auto pt-4">
            <button
              className="btn btn-primary btn-lg w-full rounded-full shadow-lg hover:shadow-primary/40 transition-all text-white font-bold text-lg border-none "
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* --- MODAL SECTION (Fixed) --- */}
      <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
        
        {/* Modal Box: Added max-h and overflow-y-auto to fix button clipping */}
        <div className="modal-box w-11/12 max-w-4xl p-0 bg-white rounded-2xl max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
          
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
             <h3 className="font-extrabold text-2xl text-gray-800">Checkout</h3>
             <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost text-gray-500 hover:bg-gray-100 text-lg">✕</button>
             </form>
          </div>

          {/* Form Content */}
          <div className="p-6 lg:p-8">
            <form onSubmit={handleOrder} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* -- Left: Product Info (Read Only) -- */}
              <div className="space-y-5">
                  <h4 className="font-bold text-lg text-primary flex items-center gap-2">
                    <FaBoxOpen /> Order Summary
                  </h4>
                  
                  <div className="bg-gray-50 p-4 rounded-xl space-y-4 border border-gray-100">
                      <div className="form-control">
                        <label className="label text-xs font-bold uppercase text-gray-400">Product</label>
                        <input readOnly defaultValue={data?.name} type="text" name="productName" className="input input-ghost w-full font-bold text-gray-700 focus:outline-none p-0 h-auto" />
                      </div>

                      <div className="form-control">
                        <label className="label text-xs font-bold uppercase text-gray-400">Unit Price</label>
                        <div className="flex items-center text-green-600 font-bold text-lg">
                           $<input readOnly defaultValue={data?.price} type="number" name="price" className="bg-transparent focus:outline-none w-full" />
                        </div>
                      </div>
                  </div>

                  <h4 className="font-bold text-lg text-primary flex items-center gap-2 mt-6">
                    <FaUser /> Buyer Info
                  </h4>
                  <div className="space-y-3">
                      <div className="form-control w-full">
                        <div className="label"><span className="label-text font-semibold">Your Name</span></div>
                        <input defaultValue={user?.displayName} type="text" name="buyerName" className="input input-bordered w-full" />
                      </div>
                      <div className="form-control w-full">
                        <div className="label"><span className="label-text font-semibold">Email</span></div>
                        <div className="flex items-center input input-bordered bg-gray-100 text-gray-500 px-3">
                           <FaEnvelope className="mr-2 text-gray-400"/>
                           <input readOnly defaultValue={user?.email} type="email" name="email" className="bg-transparent w-full focus:outline-none cursor-not-allowed" />
                        </div>
                      </div>
                  </div>
              </div>

              {/* -- Right: Shipping Details (Editable) -- */}
              <div className="space-y-5">
                  <h4 className="font-bold text-lg text-primary flex items-center gap-2">
                    <FaTruck /> Shipping Details
                  </h4>

                  <div className="form-control w-full">
                    <label className="label"><span className="label-text font-semibold">Quantity</span></label>
                    <input type="number" name="quantity" className="input input-bordered focus:border-primary w-full" placeholder="1" min="1" required />
                  </div>

                  <div className="form-control w-full">
                    <label className="label"><span className="label-text font-semibold">Phone Number</span></label>
                    <div className="flex items-center input input-bordered focus-within:border-primary px-3">
                        <FaPhone className="mr-2 text-gray-400"/>
                        <input type="text" name="number" className="w-full focus:outline-none" placeholder="+880..." required />
                    </div>
                  </div>

                  <div className="form-control w-full">
                    <label className="label"><span className="label-text font-semibold">Delivery Address</span></label>
                    <input type="text" name="adress" className="input input-bordered focus:border-primary w-full" placeholder="Street, City, Zip" required />
                  </div>

                  <div className="form-control w-full">
                    <label className="label"><span className="label-text font-semibold">Special Instructions</span></label>
                    <textarea name="details" className="textarea textarea-bordered h-24 focus:border-primary w-full" placeholder="Gate code, drop-off location..."></textarea>
                  </div>
              </div>

              {/* -- Submit Button Area (Full Width) -- */}
              <div className="col-span-1 md:col-span-2 pt-4 border-t border-gray-100">
                 <button type="submit" className="btn btn-primary w-full text-lg shadow-md rounded-xl h-12">
                    Confirm Purchase
                 </button>
              </div>

            </form>
          </div>
        </div>

        {/* Backdrop click to close */}
        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ItemDetails;