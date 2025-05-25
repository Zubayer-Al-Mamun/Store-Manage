import { useContext } from "react";
import { CartDispatchContext } from "../context/CartContext";

export default function CartItem({ item }) {
  const dispatch = useContext(CartDispatchContext);
  return (
    <div className="flex items-start space-x-4 pb-4 border-b border-gray-200 mb-4">
      <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-auto object-cover"
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between">
          <h3 className="font-medium">{item.title}</h3>
          <span
            onClick={() => dispatch({ type: "remove", value: item })}
            className="text-red-500 px-[6px] text-sm cursor-pointer"
          >
            ×
          </span>
        </div>
        <p className="text-sm text-gray-500">Size: Large</p>
        <p className="text-sm text-gray-500">Color: White</p>
        <div className="flex justify-between items-center mt-2">
          <p className="font-bold">${item.price}</p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => dispatch({ type: "decrease", value: item })}
              className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center"
            >
              −
            </button>
            <span className="text-sm">{item.inCartCount}</span>
            <button
              onClick={() => dispatch({ type: "increase", value: item })}
              disabled={item.stock === 0}
              className={`w-6 h-6 rounded flex items-center justify-center ${
                item.stock === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100"
              }`}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
