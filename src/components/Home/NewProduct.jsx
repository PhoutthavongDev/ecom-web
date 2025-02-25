import React, { useState, useEffect } from "react";
import { listProductBy } from "../../api/Product";
import ProductCard from "../Cart/ProductCard";
import SwiperShow from "../../utiles/SwiperShow";
import { SwiperSlide } from "swiper/react";
export const Newproduct = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listProductBy("createdAt", "desc", 8)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };
  console.log(data);
  return (
    <SwiperShow>
      {data?.map((item, index) => (
        <SwiperSlide>
          <ProductCard item={item} key={index} />
        </SwiperSlide>
      ))}
    </SwiperShow>
  );
};
export default Newproduct;
