import React from "react";
import {
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquarePinterest,
} from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="pt-10">
      {/* Decorative Wave Top */}
      <div className="w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-[40px] md:h-[50px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-base-200"
          ></path>
        </svg>
      </div>

      <footer className="footer footer-center bg-base-200 text-base-content p-6 md:p-10 rounded-b-lg">
        {/* Navigation Links - Changed to Flex Wrap for Mobile Responsiveness */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-base font-medium">
          <Link
            to={"/about"}
            className="link link-hover hover:text-primary transition-colors"
          >
            About us
          </Link>
          <Link
            to={"/blog"}
            className="link link-hover hover:text-primary transition-colors"
          >
            Blog
          </Link>
          <Link
            to={"/contact"}
            className="link link-hover hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Social Icons */}
        <nav>
          <div className="flex justify-center gap-6 text-3xl">
            {/* Facebook */}
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors cursor-pointer"
            >
              <FaSquareFacebook />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors cursor-pointer"
            >
              <FaSquareInstagram />
            </a>

            {/* Pinterest */}
            <a
              href="https://www.pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors cursor-pointer"
            >
              <FaSquarePinterest />
            </a>
          </div>
        </nav>

        {/* Branding */}
        <aside className="mt-2">
          <h1 className="text-3xl font-bold mb-2 opacity-80">#PawMart</h1>
          <p className="font-bold text-center px-4">
            Connecting Pets with Loving Homes.
          </p>
          <p className="text-sm opacity-60 mt-4">
            © {new Date().getFullYear()} PawMart Inc. All rights reserved.
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
