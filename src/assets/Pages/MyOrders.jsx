import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaDownload, FaShoppingBag, FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaUser, FaBoxOpen, FaDollarSign } from "react-icons/fa"; // Added icons
import { AuthContext } from "../Provider/AuthProvider";

const MyOrders = () => {
  const [myOrders, setMyorders] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://pawmart-two.vercel.app/orders?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setMyorders(data))
      .catch((err) => console.log(err));
  }, [user?.email]);

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
    <div className="min-h-screen bg-base-200 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-base-content flex items-center gap-3">
              <FaShoppingBag className="text-primary" /> My Orders
            </h1>
            <p className="text-base-content/60 mt-1">
              View and manage your purchase history.
            </p>
          </div>

          {/* Conditional rendering for button: Only show if there are orders */}
          {myOrders.length > 0 && (
            <button
              onClick={handleDownloadPDF}
              className="btn btn-primary btn-md shadow-lg shadow-primary/30 text-white rounded-full px-6 flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <FaDownload /> Download Invoice
            </button>
          )}
        </div>

        {/* --- Content Section --- */}
        <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-200">
          
          {myOrders.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 text-center">
               <div className="bg-base-200 p-6 rounded-full mb-4">
                  <FaBoxOpen className="text-4xl text-base-content/30" />
               </div>
               <h3 className="text-xl font-bold text-base-content/70">No Orders Yet</h3>
               <p className="text-base-content/50 max-w-xs mx-auto mt-2">
                 It looks like you haven't placed any orders yet. Start shopping to fill this list!
               </p>
            </div>
          ) : (
            /* Table Layout */
            <div className="overflow-x-auto w-full">
              <table className="table table-zebra w-full">
                
                {/* Table Header */}
                <thead className="bg-base-200 text-base-content/70 text-sm uppercase font-bold sticky top-0 z-10">
                  <tr>
                    <th className="py-4 pl-6 text-center">#</th>
                    <th className="py-4"><div className="flex items-center gap-2"><FaBoxOpen/> Product</div></th>
                    <th className="py-4"><div className="flex items-center gap-2"><FaDollarSign/> Total Price</div></th>
                    <th className="py-4 text-center">Qty</th>
                    <th className="py-4"><div className="flex items-center gap-2"><FaMapMarkerAlt/> Address</div></th>
                    <th className="py-4"><div className="flex items-center gap-2"><FaUser/> Buyer</div></th>
                    <th className="py-4"><div className="flex items-center gap-2"><FaCalendarAlt/> Date</div></th>
                    <th className="py-4"><div className="flex items-center gap-2"><FaPhone/> Phone</div></th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="text-sm">
                  {myOrders.map((order, index) => (
                    <tr key={index} className="hover:bg-base-200/50 transition-colors border-b border-base-200/50 last:border-none">
                      
                      {/* Index */}
                      <td className="text-center font-bold text-base-content/50 pl-6">
                        {index + 1}
                      </td>

                      {/* Product Name */}
                      <td className="font-bold text-base-content text-lg">
                        {order.productName}
                      </td>

                      {/* Price Calculation */}
                      <td className="font-bold text-green-600 text-base">
                        ${(order.price * order.quantity).toLocaleString()}
                      </td>

                      {/* Quantity */}
                      <td className="text-center">
                        <span className="badge badge-ghost font-semibold">
                           x{order.quantity}
                        </span>
                      </td>

                      {/* Address */}
                      <td className="max-w-[200px] truncate text-base-content/70" title={order.adress}>
                        {order.adress}
                      </td>

                      {/* Buyer */}
                      <td className="text-base-content/80 font-medium">
                        {order.buyerName}
                      </td>

                      {/* Date */}
                      <td className="text-base-content/60">
                        {new Date(order.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* Phone */}
                      <td className="text-base-content/60 font-mono">
                        {order.number}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Summary (Optional) */}
        {myOrders.length > 0 && (
           <div className="mt-4 text-right text-sm text-base-content/50 px-2">
              Showing {myOrders.length} records
           </div>
        )}

      </div>
    </div>
  );
};

export default MyOrders;