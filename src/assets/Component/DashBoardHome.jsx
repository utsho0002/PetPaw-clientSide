import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

// Icons
import { FaWallet, FaShoppingCart, FaBoxOpen, FaUsers } from "react-icons/fa";
// Chart Components
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AuthContext } from "../Provider/AuthProvider";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);

  // --- 1. STATE VARIABLES ---
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalServices, setTotalServices] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  
  const [chartData, setChartData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 2. FETCH DATA ---
  useEffect(() => {
    // We use an async function inside useEffect to fetch data
    const getAllData = async () => {
      try {
        // Step A: Get all data from backend
        const serviceResponse = await axios.get("https://pawmart-two.vercel.app/services");
        const orderResponse = await axios.get("https://pawmart-two.vercel.app/orders");

        const allServices = serviceResponse.data;
        const allOrders = orderResponse.data;

        // Step B: Calculate Total Revenue (Using a simple Loop)
        let money = 0;
        for (let i = 0; i < allOrders.length; i++) {
            const order = allOrders[i];
            // If price is "$20", this removes the "$" and makes it a number 20
            const priceNumber = parseFloat(order.price); 
            if (!isNaN(priceNumber)) {
                money = money + priceNumber;
            }
        }

        // Step C: Prepare Chart Data (Counting categories)
        // We want to know: How many orders for "Grooming"? How many for "Food"?
        const counts = {}; 
        
        for (let i = 0; i < allOrders.length; i++) {
            const order = allOrders[i];
            // If no category name, call it "Other"
            const categoryName = order.serviceName || "Other"; 
            
            // Check if we saw this category before
            if (counts[categoryName]) {
                counts[categoryName] = counts[categoryName] + 1; // Add 1
            } else {
                counts[categoryName] = 1; // Start at 1
            }
        }

        // Convert our counts into a list for the Chart
        const finalChartData = [];
        for (const key in counts) {
            finalChartData.push({
                name: key,
                orders: counts[key]
            });
        }

        // Step D: Count Unique Users
        const userEmails = [];
        for (let i = 0; i < allOrders.length; i++) {
            if (!userEmails.includes(allOrders[i].email)) {
                userEmails.push(allOrders[i].email);
            }
        }

        // --- 3. SAVE DATA TO STATE ---
        setTotalServices(allServices.length);
        setTotalOrders(allOrders.length);
        setTotalRevenue(money);
        setTotalUsers(userEmails.length);
        
        setChartData(finalChartData);
        setRecentOrders(allOrders.slice(0, 5)); // Only keep first 5 orders
        setLoading(false); // Stop loading

      } catch (error) {
        console.log("Error:", error);
        setLoading(false);
      }
    };

    getAllData();
  }, []);

  // Show a spinner while loading
  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div>
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      
      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Card 1: Revenue */}
        <div className="stats shadow bg-base-100 border">
            <div className="stat">
              <div className="stat-figure text-primary text-3xl"><FaWallet /></div>
              <div className="stat-title">Revenue</div>
              <div className="stat-value text-primary">${totalRevenue}</div>
            </div>
        </div>

        {/* Card 2: Orders */}
        <div className="stats shadow bg-base-100 border">
            <div className="stat">
              <div className="stat-figure text-secondary text-3xl"><FaShoppingCart /></div>
              <div className="stat-title">Orders</div>
              <div className="stat-value text-secondary">{totalOrders}</div>
            </div>
        </div>

        {/* Card 3: Services */}
        <div className="stats shadow bg-base-100 border">
            <div className="stat">
              <div className="stat-figure text-accent text-3xl"><FaBoxOpen /></div>
              <div className="stat-title">Services</div>
              <div className="stat-value text-accent">{totalServices}</div>
            </div>
        </div>

        {/* Card 4: Users */}
        <div className="stats shadow bg-base-100 border">
            <div className="stat">
              <div className="stat-figure text-info text-3xl"><FaUsers /></div>
              <div className="stat-title">Customers</div>
              <div className="stat-value text-info">{totalUsers}</div>
            </div>
        </div>
      </div>

      {/* CHART & TABLE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* CHART SECTION */}
          <div className="card bg-base-100 shadow-xl border p-4">
             <h3 className="text-xl font-bold mb-4">Popular Services</h3>
             <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="orders" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* TABLE SECTION */}
          <div className="card bg-base-100 shadow-xl border p-4">
              <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{order.productName || "Item"}</td>
                            <td>${order.price}</td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          </div>

      </div>
    </div>
  );
};

export default DashboardHome;