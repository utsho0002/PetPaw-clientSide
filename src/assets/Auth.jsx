import React from 'react';

import { Outlet } from 'react-router';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';


const Auth = () => {
    return (
        <div className=''>
             
            <nav><Navbar></Navbar> </nav>
            <div className='max-w-11/12 mx-auto'>
                <main><Outlet></Outlet></main>
            </div>
            <footer><Footer></Footer> </footer>
        </div>
    );
};

export default Auth;