import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const SwiperShow = ({ children }) => {
  return (
    <div>
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={true}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper  object-cover rounded-md"
        navigation={true}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 50,
          },
        }}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default SwiperShow;
