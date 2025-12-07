import React, { useEffect, useState } from "react";
import Slider from "../Component/Slider";
import { useLoaderData } from "react-router";
import Cards from "../Component/Cards";

const Home = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetch(`https://pawmart-two.vercel.app/services?category=${category}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, [category]);

  return (
    <div>
      <div className="">
        {" "}
        <Slider></Slider>{" "}
      </div>
      <h1 className="text-3xl font-bold text-center mt-10">Our Products</h1>
      <fieldset className="fieldset my-4">
        <legend className="fieldset-legend">Select a Category</legend>

        <select
          defaultValue=""
          className="select"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>
            Categories
          </option>
          <option value="Pets">Pets</option>
          <option value="Pet Food">Pet Food</option>
          <option value="Accessories">Accessories</option>
          <option value="Pet Care Products">Pet Care Products</option>
        </select>
      </fieldset>

      <Cards data={data}></Cards>
      <div className="mt-20">
        <div className="card lg:card-side bg-base-100 shadow-sm">
          <figure>
            <img
              src="https://img.freepik.com/free-vector/pet-veterinary_24908-57973.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Album"
              className="h-100 w-300"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-3xl">🐾 Why Adopt from PawMart?</h2>
            <p>
              At PawMart, we believe every pet deserves a loving home. Our
              platform connects responsible pet owners, shelters, and adopters
              in one safe and transparent place. Each listing is verified,
              making it easier for you to find healthy, well-cared-for pets and
              essential pet products
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20 mb-20 bg-[#313131] p-10">
        <h1 className="text-3xl font-bold my-3 text-white  mb-10 text-center">
          Meet Our Pet Heroes
        </h1>
        <div className="grid lg:grid-cols-3 gap-3 ">
          <div className="card bg-base-100 shadow-sm flex items-center p-7">
            <div className="">
              <img
                src="https://cdn.shopify.com/s/files/1/0621/8157/2697/files/zsqa7tbyscbtzpcatvnx_14e089d0-cf68-45dc-96cd-b0f9dcfbe3ef_1000x1000_crop_center.jpg.webp?v=1738163040"
                alt="Expert"
                className="h-[250px] w-[250px] rounded-full object-cove"
              />
            </div>
            <h1 className="text-xl font-bold text-green-500">Sarah Jenkins</h1>
            <h1 className="text-xl ">Nutrition Expert</h1>
          </div>
          <div className="card bg-base-100 shadow-sm flex items-center p-7">
            <div>
              <img
                src="https://images.squarespace-cdn.com/content/v1/61ff4e0128d1696c47ddf15a/005c487b-2fb0-4003-8fc8-69997ac3cb74/Plant+Specialist"
                alt="Expert"
                className="h-[250px] w-[250px] rounded-full object-cove"
              />
            </div>
            <h1 className="text-xl font-bold text-green-500">Tom Green</h1>
            <h1 className="text-xl ">Health Care Expert</h1>
          </div>
          <div className="card bg-base-100 shadow-sm flex items-center p-7">
            <div>
              <img
                src="https://img.freepik.com/free-photo/young-beautiful-woman-gardener-apron-hat-holding-potted-plant-smiling-cheerfully_141793-37615.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Expert"
                className="h-[250px] w-[250px] rounded-full object-cove"
              />
            </div>
            <h1 className="text-xl font-bold text-green-500">Lina Verma</h1>
            <h1 className="text-xl ">Veterinary</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
