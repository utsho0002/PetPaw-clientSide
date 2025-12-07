import React from 'react';
import error from '../images/Blue and White Illustrative 404 Page Desktop Prototype.png'
const Error = () => {
    return (
        <div>
            <img src={error} alt="" className='h-screen w-screen object-cover'
            />
        </div>
    );
};

export default Error;