import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import axios from "axios";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (!user?.email) return; // Prevents null email issue

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
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  })
  .then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`https://pawmart-two.vercel.app/delete/${id}`)
        .then((res) => {
          // Update the UI after successful deletion
          const filteredData = services.filter(
            (service) => service._id !== id
          );
          setServices(filteredData);

          // Show success alert only after deletion succeeds
          Swal.fire({
            title: "Deleted!",
            text: "Your item has been deleted.",
            icon: "success",
          });
        })
        .catch((err) => {
          // Show error if deletion fails
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
    <div>
      <div className="overflow-x-auto ">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Details</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <tr key={service._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={
                            service.image ||
                            "https://img.daisyui.com/images/profile/demo/2@94.webp"
                          }
                          alt="Service"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{service.plantName}</div>
                      <div className="text-sm opacity-50">
                        {service.category}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="">{service.description}</td>
                <td>{service.price}</td>

                <td >
                  <button
                    onClick={() => handleDelete(service?._id)}
                    className="btn btn-error btn-xs mr-2"
                  >
                    <MdDeleteForever className="text-[18px]"/>
                  </button>
                  <Link to={`/update-service/${service?._id}`}>
                    <button className="btn btn-primary btn-xs"> <CiEdit className="text-[18px]"/> </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyServices;
