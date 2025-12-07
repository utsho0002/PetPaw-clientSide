import React from 'react';
import Navbar from './assets/Component/Navbar';
import Footer from './assets/Component/Footer';
import Slider from './assets/Component/Slider';
import Home from './assets/Pages/Home';
import { Outlet } from 'react-router';

const MainElement = () => {
    return (
        <div>
            <nav><Navbar></Navbar></nav>
           
            <div className='max-w-11/12 mx-auto'>
                <Outlet></Outlet>
            </div>
            <footer> <Footer></Footer> </footer>
        </div>
    );
};

export default MainElement;