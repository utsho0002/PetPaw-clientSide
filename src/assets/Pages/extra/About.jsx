import React from "react";
import { FaPaw, FaHeart, FaAward } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-base-100">
      
      {/* 1. Hero Section */}
      <div className="hero h-64 bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">About PawMart</h1>
            <p className="py-6">We are passionate about pets and dedicated to providing the best services for your furry friends.</p>
          </div>
        </div>
      </div>

      {/* 2. Our Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Image Side */}
            <div>
                <img 
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop" 
                    alt="Happy Dogs" 
                    className="rounded-lg shadow-2xl"
                />
            </div>
            {/* Text Side */}
            <div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg opacity-70 mb-4">
                    Started in 2024, PawMart was built on a simple premise: pets are family. 
                    We strive to create a world where every pet is happy, healthy, and loved.
                </p>
                <p className="text-lg opacity-70">
                    Whether you need grooming, training, or just some high-quality treats, 
                    our team of experts is here to help you every step of the way.
                </p>
            </div>
        </div>
      </div>

      {/* 3. Why Choose Us (Stats) */}
      <div className="bg-primary text-white py-12">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              
              <div className="flex flex-col items-center">
                  <FaPaw className="text-5xl mb-2" />
                  <h3 className="text-2xl font-bold">5,000+</h3>
                  <p>Happy Pets</p>
              </div>

              <div className="flex flex-col items-center">
                  <FaHeart className="text-5xl mb-2" />
                  <h3 className="text-2xl font-bold">100%</h3>
                  <p>Love & Care</p>
              </div>

              <div className="flex flex-col items-center">
                  <FaAward className="text-5xl mb-2" />
                  <h3 className="text-2xl font-bold">Top Rated</h3>
                  <p>Services</p>
              </div>

          </div>
      </div>

    </div>
  );
};

export default About;