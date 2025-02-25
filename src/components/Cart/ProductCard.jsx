import React from "react";
import { ShoppingCart } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utiles/Number";
import { motion } from "motion/react";

const ProductCard = ({ item }) => {
  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="border rounded-md shadow-md p-2 w-48">
        <div>
          {item.images && item.images.length > 0 ? (
            <img
              src={item.images[0].url}
              className="w-full h-24 rounded-md shadow-md object-cover hover:scale-110 hover:duration-200"
            />
          ) : (
            <div className="w-full h-24 bg-gray-200 rounded-md text-center flex items-center justify-center shadow">
              No Image
            </div>
          )}
        </div>

        <div className="py-2">
          <p className="text-xl font-bold truncate">{item.title}</p>
          <p className="text-sm text-gray-500 truncate">{item.description}</p>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-m font-bold">{numberFormat(item.price)}</span>
          <button
            className="bg-blue-500 rounded-md p-2 hover:bg-blue-700 shadow-md px"
            onClick={() => actionAddtoCart(item)}
          >
            <ShoppingCart />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
