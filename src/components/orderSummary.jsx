import PromoCode from "./promoCode";

export default function OrderSummary({subTotal}) {
    let total = (Math.floor(subTotal - ((subTotal/100)*20))) + 15;
    return (
        <div className="mt-6 ">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>

            <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subTotal}</span>
                </div>
                <div className="flex justify-between text-red-500">
                    <span>Discount (-20%)</span>
                    <span>-${Math.floor((subTotal/100)*20)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">$15</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>${(total > 15 ? total : 0)}</span>
                </div>
            </div>


            <PromoCode />

            <a
                href="#"
                className="block bg-black text-white text-center py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
                Go to Checkout
                <span className="inline-block ml-2">→</span>
            </a>
        </div>
    );
}
