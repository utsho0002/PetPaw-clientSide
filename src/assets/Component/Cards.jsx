import React from 'react';
import Card from './Card';

const Cards = ({data}) => {
    return (
        <div className='grid lg:grid-cols-3 gap-5'>
            {
                data.map(singleData=> <Card singleData={singleData}></Card> )
            }
        </div>
    );
};

export default Cards;