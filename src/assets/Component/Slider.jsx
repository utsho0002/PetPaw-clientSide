import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const Slider = () => {
  return (
    <div className="h-[400px] w-full relative">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        className="h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative h-full w-full">
            <img
              src="https://wallpapershome.com/images/pages/pic_h/721.jpg"
              alt="Slide 1"
              className="w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Tagline */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
              <h2 className="text-4xl font-bold mb-2">
                Find Your Furry Friend Today
              </h2>
             
            </div>
          </div>
        </SwiperSlide>


        <SwiperSlide>
          <div className="relative h-full w-full">
            <img
              src="https://wallpapercave.com/wp/wp9015357.jpg"
              alt="Slide 1"
              className="w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Tagline */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
              <h2 className="text-4xl font-bold mb-2">
                Adopt, Don’t Shop — Give a Pet a Home
              </h2>
             
            </div>
          </div>
        </SwiperSlide>


        <SwiperSlide>
          <div className="relative h-full w-full">
            <img
              src="https://png.pngtree.com/background/20250110/original/pngtree-new-cat-4k-wallpaper-hd-one-animal-themes-picture-image_15594758.jpg"
              alt="Slide 1"
              className="w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Tagline */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
              <h2 className="text-4xl font-bold mb-2">
                Because Every Pet Deserves Love and Care.
              </h2>
            </div>
          </div>
        </SwiperSlide>

        
      </Swiper>
    </div>
  );
};

export default Slider;
