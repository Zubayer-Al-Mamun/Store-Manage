import { useReducer, useState } from "react";
import { cartReducer, initialState } from "./Reducer/cartReducer";
import AllProducts from "./components/allProducts";
import AnnouncementBar from "./components/announcementBar";
import CartItem from "./components/CartItem";
import Footer from "./components/footer";
import Header from "./components/header";
import MainContHead from "./components/mainContHead";
import NewsLetterSection from "./components/newsLetterSection";
import OrderSummary from "./components/orderSummary";
import { CartContext, CartDispatchContext } from "./context/CartContext";

function App() {
  const [isAnnouncement, setIsAnnouncement] = useState(true);
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {isAnnouncement && (
          <AnnouncementBar setIsAnnouncement={setIsAnnouncement} />
        )}
        <Header />

        <main className="container mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <MainContHead />

              <div
                className={`w-full h-[100px] bg-red-100 ${
                  state.noFound ? "flex" : "hidden"
                } text-red-900 justify-center items-center text-4xl`}
              >
                Product Not Found ☹️
              </div>

              <AllProducts products={state.products} />
            </div>

            <div className="lg:col-span-1 relative">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h2 className="text-2xl font-bold mb-6">YOUR CART</h2>

                {state.products
                  .filter((item) => item.inCartCount > 0)
                  .map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                <OrderSummary subTotal={state.subTotal} />
              </div>
            </div>
          </div>
        </main>

        <NewsLetterSection />
        <Footer />
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
