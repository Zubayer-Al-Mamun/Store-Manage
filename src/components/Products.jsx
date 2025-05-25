import { useContext } from "react";
import { CartDispatchContext } from "../context/CartContext";

export default function Product({ productData }) {
  const dispatch = useContext(CartDispatchContext);

  const star = [];
  for (let i = 0; i < productData.rating; i++) {
    star.push(<span key={i}>★</span>);
  }
  while (star.length < 5) {
    star.push(
      <span key={star.length} className="text-gray-300">
        ★
      </span>
    );
  }

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <img
          src={productData.image}
          alt={productData.title}
          className="h-full w-auto object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium">{productData.title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center my-1">
            <div className="flex text-yellow-400">{star}</div>
            <span className="text-xs text-gray-500 ml-1">
              {productData.rating}/5
            </span>
          </div>
          <span className="text-xs text-gray-700">
            ({productData.stock} pcs left)
          </span>
        </div>
        <div className="flex items-center">
          <p className="font-bold">$ {productData.price}</p>
          <p className="text-gray-400 line-through ml-2">
            ${productData.oldPrice}
          </p>
        </div>
        <button
          onClick={() =>
            dispatch({ type: "toggleCart", value: productData })
          }
          className={
            productData.inCartCount === 0
              ? "disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed w-full mt-2 bg-gray-800 py-1 text-gray-100 rounded flex items-center justify-center active:translate-y-1 transition-all active:bg-gray-900"
              : "w-full mt-2 bg-red-800 py-1 text-gray-100 rounded flex items-center justify-center"
          }
        >
          {productData.inCartCount !== 0 ? "Remove from Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
