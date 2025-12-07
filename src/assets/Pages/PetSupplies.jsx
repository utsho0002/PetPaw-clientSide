import React, { useEffect, useState } from 'react';

import Cards from '../Component/Cards';

const PetSupplies = () => {
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
            <h1 className="text-3xl font-bold text-center mt-10">Pet & Supplies</h1>
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
        </div>
    );
};

export default PetSupplies;