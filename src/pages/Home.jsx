import React from "react";
import Content from "../components/Home/Content";
import { BestSeller } from "../components/Home/BestSeller";
import Newproduct from "../components/Home/NewProduct";

const Home = () => {
  return (
    <div>
      <Content />

      <p className="text-2xl font-bold my-4 text-center">Hot Sale</p>
      <BestSeller />
      <p className="text-2xl font-bold my-4 text-center">NewProduct</p>
      <Newproduct />
    </div>
  );
};

export default Home;
