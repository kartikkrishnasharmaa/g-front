/* src/pages/cart/Cart.jsx */
import { useEffect } from "react";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useCart } from "../../../context/cart";
import SaveForLater from "./SaveForLater";
import ScrollToTopOnRouteChange from "./../../../utils/ScrollToTopOnRouteChange";
import SeoData from "../../../SEO/SeoData";
import PriceCard from "./PriceCard";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import { loadRazorpay } from "../../../utils/loadRazorpay";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [cartItems, setCartItems, , , saveLaterItems] = useCart();

  // Helper to get shipping info stored earlier (if any)
  const getShippingInfo = () => {
    try {
      const info = localStorage.getItem("shippingInfo");
      return info ? JSON.parse(info) : null;
    } catch (err) {
      return null;
    }
  };

  // -------------------------------
  // 🔥 Razorpay Checkout Payment
  // -------------------------------
  const handlePayment = async () => {
    try {
      if (!auth?.token) {
        // redirect to login or show message
        return navigate("/login");
      }

      const loaded = await loadRazorpay();
      if (!loaded) {
        console.error("Razorpay SDK failed to load");
        return alert("Unable to load payment gateway. Try again later.");
      }

      // Ensure shipping info exists
      const shippingInfo = getShippingInfo();
      if (!shippingInfo) {
        alert("Please enter shipping details before placing the order.");
        return navigate("/shipping");
      }

      // 1) Create order on backend
      const createOrderRes = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/paymentt/create-order`,
        { products: cartItems },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      if (!createOrderRes?.data?.order) {
        console.error("Order creation failed: ", createOrderRes);
        return alert("Unable to create order. Try again.");
      }

      const { order, key, amount } = createOrderRes.data;

      // 2) Open Razorpay checkout
      const options = {
        key, // returned from backend (RAZORPAY_KEY_ID)
        // amount: order.amount, // in paise
        currency: "INR",
        name: "Gowamrit",
        description: "Purchase from Gowamrit",
        order_id: order.id,
        prefill: {
          name: auth?.user?.name || "",
          email: auth?.user?.email || "",
          contact: shippingInfo?.phoneNo || "",
        },
        notes: {
          // any extra info you want to pass
          buyerId: auth?.user?._id || "",
        },
        theme: {
          color: "#3399cc",
        },
        handler: async function (response) {
          try {
            // 3) Verify payment on backend and create order in DB
            const verifyRes = await axios.post(
              `${import.meta.env.VITE_SERVER_URL}/api/v1/paymentt/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderItems: cartItems,
                shippingInfo: shippingInfo,
                amount: amount, // rupees (backend expects amount)
              },
              {
                headers: { Authorization: auth?.token },
              }
            );

            if (verifyRes?.data?.success) {
              // Clear cart frontend + localstorage
              localStorage.removeItem("cart");
              setCartItems([]);
              // Optionally remove shippingInfo or keep it
              // localStorage.removeItem("shippingInfo");

              // navigate to orders page (or success page)
              navigate("/user/orders");
            } else {
              console.error("Payment verification failed", verifyRes);
              alert("Payment verification failed. Contact support.");
            }
          } catch (err) {
            console.error("Error verifying payment", err);
            alert("Error processing payment. Contact support.");
          }
        },
        modal: {
          ondismiss: function () {
            // optionally handle when user closes checkout
            console.log("Checkout closed by user");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment Error. Try again later.");
    }
  };

  const placeOrderHandler = () => {
    if (cartItems.length < 1) return;
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
                {/* Show instructions to fill shipping info */}
                <div
                  className={`text-xs p-2 ${
                    cartItems.length < 1 ? "hidden" : "inline-block"
                  } w-full`}
                >
                  <p>
                    Make sure you have completed shipping details (Go to
                    Shipping). Payment will be processed securely.
                  </p>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={placeOrderHandler}
                  disabled={cartItems.length < 1}
                  className={`${
                    cartItems.length < 1
                      ? "hidden"
                      : "bg-blue-600 hover:bg-blue-700"
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
