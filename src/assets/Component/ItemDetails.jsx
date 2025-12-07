import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import { useParams } from "react-router";
import Swal from "sweetalert2";

const ItemDetails = ({ data }) => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const handleOrder = (e) => {
    e.preventDefault();
    const form = e.target;
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
      .catch((err) => {});

    document.getElementById("my_modal_3").close();
  };

  return (
    <div>
      <img
        src={data.image}
        alt=""
        className="h-[400px] w-full lg:h-[600px] lg:w-[500px] object-cover rounded-2xl"
      />
      <h1 className="text-2xl font-bold my-2">{data.name}</h1>
      <h1 className="text-[18px] py-1">
        {" "}
        <b>Category:</b> {data.category}
      </h1>
      <p className="text-[18px] py-1">
        <b>Price:</b> ${data.price}
      </p>
      {/* <p className="text-[18px] py-1"><b>Rating:</b> {plants.rating} / 5</p>
      <p className="text-[18px] py-1"><b>Avialable:</b> {plants.availableStock}</p>
      <p className="text-[18px] py-1"><b>Care Level:</b> {plants.careLevel}</p> */}
      <p className="text-[18px] py-1">
        <b>Description:</b> {data.description}
      </p>
      <p className="text-[18px] py-1">
        <b>Location:</b> {data.location}
      </p>

      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-primary"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Order Now
      </button>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div className="flex items-center justify-center">
            <form
              onSubmit={handleOrder}
              className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
            >
              <legend className="fieldset-legend">Details</legend>

              <label className="label">Product Name</label>
              <input
                readOnly
                defaultValue={data?.name}
                type="text"
                className="input"
                placeholder="Product Name"
                name="productName"
              />

              <label className="label">Buyer Name</label>
              <input
                defaultValue={user?.displayName}
                type="text"
                className="input"
                placeholder="Name"
                name="buyerName"
              />

              <label className="label">Buyer Email</label>
              <input
                readOnly
                defaultValue={user?.email}
                type="email"
                className="input"
                placeholder="Email"
                name="email"
              />

              <label className="label">Quantity</label>
              <input
                type="number"
                className="input"
                placeholder="Quantity"
                name="quantity"
                required
              />

              <label className="label">Price</label>
              <input
                readOnly
                defaultValue={data?.price}
                type="number"
                className="input"
                placeholder="Price"
                name="price"
              />

              <label className="label">Adress</label>
              <input
                type="text"
                className="input"
                placeholder="Adress"
                name="adress"
                required
              />

              <label className="label">Phone</label>
              <input
                type="text"
                className="input"
                placeholder="Phone Number"
                name="number"
                required
              />

              <label className="label">Additional Description</label>
              <textarea
                type="text"
                className="input"
                placeholder="Enter Details"
                name="details"
              />

              <button type="submit" className="btn btn-primary">
                Order
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ItemDetails;
