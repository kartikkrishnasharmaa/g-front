/* eslint-disable no-unused-vars */
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useCart } from "../../../context/cart";
import SaveForLater from "./SaveForLater";
import ScrollToTopOnRouteChange from "./../../../utils/ScrollToTopOnRouteChange";
import SeoData from "../../../SEO/SeoData";
import PriceCard from "./PriceCard";
import { useAuth } from "../../../context/auth";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const Cart = () => {
    const { auth } = useAuth();

    // Stripe Publishable Key (Only frontend key allowed)
    const publishKey = import.meta.env.VITE_STRIPE_PUBLISH_KEY;

    let frontendURL = window.location.origin;

    const [cartItems, setCartItems, , , saveLaterItems] = useCart();

    // -------------------------------
    // 🔥 Stripe Checkout Payment
    // -------------------------------
    const handlePayment = async () => {
        try {
            const stripe = await loadStripe(publishKey);

            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/user/create-checkout-session`,
                {
                    products: cartItems,
                    frontendURL: frontendURL,
                    customerEmail: auth?.user?.email,
                },
                {
                    headers: {
                        Authorization: auth?.token,
                    },
                }
            );

            const session = response.data.session;

            // Save Stripe session ID for later use
            localStorage.setItem("sessionId", session.id);

            // ⭐ FIXED: MUST ADD AWAIT √
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result?.error) {
                console.log("Stripe Error:", result.error.message);
            }
        } catch (error) {
            console.log("Payment Error:", error);
        }
    };

    const placeOrderHandler = () => {
        handlePayment();
    };

    return (
        <>
            <ScrollToTopOnRouteChange />
            <SeoData title="Shopping Cart | Gowamrit.com" />

            <main className="w-full pt-5">
                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto ">
                    
                    {/* CART SECTION */}
                    <div className="flex-1">
                        <div className="flex flex-col shadow bg-white">
                            <span className="font-medium text-lg px-2 sm:px-8 py-4 border-b">
                                My Cart ({cartItems?.length})
                            </span>

                            {cartItems?.length === 0 ? (
                                <EmptyCart />
                            ) : (
                                cartItems?.map((item, i) => (
                                    <CartItem product={item} inCart={true} key={i} />
                                ))
                            )}

                            {/* Place Order Button Bar */}
                            <div className="flex justify-between items-center sticky bottom-0 left-0 bg-white">
                                
                                {/* Test Card Info */}
                                <div
                                    className={`text-xs p-2 ${
                                        cartItems.length < 1 ? "hidden" : "inline-block"
                                    } w-full`}
                                >
                                    <p>Use Stripe test card to make payment:</p>
                                    <ul>
                                        <li><strong>Card:</strong> 4242 4242 4242 4242</li>
                                        <li><strong>Expiry:</strong> Any future date</li>
                                        <li><strong>CVV:</strong> Any 3 digits</li>
                                    </ul>
                                </div>

                                {/* Checkout Button */}
                                <button
                                    onClick={placeOrderHandler}
                                    disabled={cartItems.length < 1}
                                    className={`${
                                        cartItems.length < 1 ? "hidden" : "bg-blue-600 hover:bg-blue-700"
                                    } w-full sm:w-1/3 mx-2 sm:mx-6 my-4 py-4 font-medium text-white shadow hover:shadow-lg rounded-sm`}
                                >
                                    PLACE ORDER
                                </button>
                            </div>
                        </div>

                        {/* Saved For Later */}
                        <div className="flex flex-col mt-5 shadow bg-white mb-8">
                            <span className="font-medium text-lg px-2 sm:px-8 py-4 border-b">
                                Saved For Later ({saveLaterItems?.length})
                            </span>
                            {saveLaterItems?.map((item, i) => (
                                <SaveForLater product={item} key={i} />
                            ))}
                        </div>
                    </div>

                    {/* PRICE CARD */}
                    <PriceCard cartItems={cartItems} />
                </div>
            </main>
        </>
    );
};

export default Cart;

