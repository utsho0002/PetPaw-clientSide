import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const Slider = () => {
  // Slide Data Configuration
  const slides = [
    {
      image: "https://wallpapershome.com/images/pages/pic_h/721.jpg",
      title: "Find Your Furry Friend Today",
      subtitle: "Discover the perfect companion to share your life with.",
    },
    {
      image: "https://wallpapercave.com/wp/wp9015357.jpg",
      title: "Adopt, Don’t Shop",
      subtitle: "Give a rescue pet a second chance at a forever home.",
    },
    {
      image: "https://png.pngtree.com/background/20250110/original/pngtree-new-cat-4k-wallpaper-hd-one-animal-themes-picture-image_15594758.jpg",
      title: "Every Pet Deserves Love",
      subtitle: "Providing quality care and supplies for your beloved animals.",
    },
  ];

  return (
    <div className="w-full relative group">
      <Swiper
        modules={[Pagination, Autoplay, Navigation, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        speed={1000}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true 
        }}
        navigation={true}
        className="h-[500px] lg:h-[600px] w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full overflow-hidden">
              
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* Modern Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-12 max-w-5xl mx-auto">
                
                {/* Title */}
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white drop-shadow-lg tracking-tight mb-4">
                  {slide.title}
                </h2>

                {/* Subtitle */}
                <p className="text-gray-200 text-lg md:text-2xl font-medium max-w-3xl drop-shadow-md">
                  {slide.subtitle}
                </p>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom CSS for navigation visibility */}
      <style jsx>{`
        .swiper-button-next, .swiper-button-prev {
          color: white;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .group:hover .swiper-button-next, 
        .group:hover .swiper-button-prev {
          opacity: 0.7;
        }
        .swiper-pagination-bullet-active {
          background-color: #f97316 !important;
        }
      `}</style>
    </div>
  );
};

export default Slider;