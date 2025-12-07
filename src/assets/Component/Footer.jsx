import React from "react";
import { FaSquareFacebook, FaSquareInstagram, FaSquarePinterest } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="mt-4 bg-black">
      <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
        <nav>
          <h6 className="footer-title text-4xl">#PawMart</h6>
          <a className="link link-hover">PawMart connects local pet owners and buyers for adoption and pet care products</a>
          
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="flex gap-5">
            <a className="link link-hover text-2xl"><FaSquareFacebook/></a>
          <a className="link link-hover text-2xl"><FaSquareInstagram/></a>
          <a className="link link-hover text-2xl"><FaSquarePinterest/></a>
          </div>
        </nav>
       
      </footer>
       <small className="block text-white text-center py-4">© 2025 PawMart All rights reserved.</small>
    </div>
  );
};

export default Footer;
