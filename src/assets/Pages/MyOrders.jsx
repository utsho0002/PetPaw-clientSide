import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // FIX 1: Import directly
import { FaDownload } from "react-icons/fa6";
import { AuthContext } from "../Provider/AuthProvider";

const MyOrders = () => {
  const [myOrders, setMyorders] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
      if (!user?.email) return; // Prevents null email issue
  
      fetch(`https://pawmart-two.vercel.app/orders?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setMyorders(data))
        .catch((err) => console.log(err));
    }, [user?.email]);

  // useEffect(() => {
  //   axios
  //     .get("https://pawmart-two.vercel.app/")
  //     .then((res) => {
  //       setMyorders(res.data);
  //     })
  //     .catch((err) => {});
  // }, []);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.text("My Orders Report", 14, 10);

   
    autoTable(doc, {
      head: [
        [
          "#",
          "Product",
          "Price",
          "Quantity",
          "Address",
          "Buyer Name",
          "Date",
          "Phone",
        ],
      ],
      body: myOrders.map((order, index) => [
        index + 1,
        order.productName,
        order.price * order.quantity,
        order.quantity,
        order.adress,
        order.buyerName,
        new Date(order.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        order.number,
      ]),
      startY: 20,
    });

    doc.save("my_orders.pdf");
  };

  return (
    <div>
      <div className="flex justify-between items-center px-10 my-5">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <button
          onClick={handleDownloadPDF}
          className="btn btn-primary text-white"
        >
            <FaDownload />
          Download PDF
        </button>
      </div>

      <div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Address</th>
                <th>Buyer Name</th>
                <th>Date</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((order, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{order.productName}</td>
                  <td>{order.price * order.quantity}</td>
                  <td>{order.quantity}</td>
                  <td>{order.adress}</td>
                  <td>{order.buyerName}</td>
                  <td>
                    {new Date(order.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td>{order.number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;