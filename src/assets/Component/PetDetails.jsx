import React from 'react';
import { useLoaderData } from 'react-router';
import ItemDetails from './ItemDetails';

const PetDetails = () => {
    const data = useLoaderData();

    return (
        <div>
             <main className='mt-[30px]'>
                <h2 className='font-bold mb-7 text-3xl text-[#016630]'>Item Details</h2>
               
                <ItemDetails data={data}></ItemDetails>
                
            </main>
        </div>
    );
};

export default PetDetails;