import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
const Content = () => {
  const [dataApi, setDataApi] = useState([]);

  const hdlGetImage = () => {
    axios
      .get("https://picsum.photos/v2/list?page=1&limit=15")
      .then((res) => {
        console.log(res);
        setDataApi(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    hdlGetImage();
  }, []);


  return (
    <div>
      <Swiper
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper h-80 rounded-md object-cover mb-4"
      >
        {dataApi?.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.download_url} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={true}
        modules={[Pagination, Autoplay,Navigation]}
        className="mySwiper  object-cover rounded-md"
        navigation={true}
      >
        {dataApi?.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.download_url} className="rounded-md"/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Content;
