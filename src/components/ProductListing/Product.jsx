import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { getDiscount } from "../../utils/functions";
import ScrollToTopOnRouteChange from "../../utils/ScrollToTopOnRouteChange";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Product = ({
    _id,
    images,
    name,
    ratings,
    numOfReviews,
    price,
    discountPrice,
    wishlistItems,
    setWishlistItems,
}) => {
    const { auth, isAdmin } = useAuth();

    const itemInWishlist = wishlistItems?.some((itemId) => itemId === _id);

    const updateWishlistUI = (add) => {
        setWishlistItems((prev) => (add ? [...prev, _id] : prev.filter((item) => item !== _id)));
    };

    const addToWishlistHandler = async () => {
        const type = itemInWishlist ? "remove" : "add";
        try {
            updateWishlistUI(type === "add");
            await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/user/update-wishlist`,
                { productId: _id, type },
                { headers: { Authorization: auth.token } }
            );
        } catch (error) {
            console.error(error);
            if (error.message.includes("403")) {
                toast.error("Admins are not allowed to add items to the wishlist", { toastId: "error" });
            } else {
                toast.error("Something went wrong! Please try again later.");
            }
            updateWishlistUI(type !== "add");
        }
    };

    return (
        <>
            <ScrollToTopOnRouteChange />

            <div className="relative w-full animate-fadeInUp duration-500">
                {/* Wishlist Icon */}
                <span
                    onClick={addToWishlistHandler}
                    className={`${itemInWishlist ? "text-red-500" : "hover:text-red-500 text-gray-300"} ${
                        isAdmin ? "hidden" : ""
                    } absolute z-10 top-2 right-3 cursor-pointer transition-all duration-300`}
                >
                    <FavoriteIcon sx={{ fontSize: "20px" }} />
                </span>

                {/* Product Card */}
                <div className="flex flex-col items-center gap-2 w-full p-4 bg-white shadow-md rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

                    {/* Image + Title Both Clickable */}
                    <Link to={`/product/${_id}`} className="w-full text-center group block">
                        <div className="w-40 h-48 overflow-hidden flex items-center justify-center mx-auto">
                            <img
                                draggable="false"
                                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                                src={images && images[0]?.url}
                                alt={name}
                            />
                        </div>
                        <h2 className="text-sm font-semibold mt-3 group-hover:text-blue-600 transition-colors duration-300">
                            {name.length > 25 ? `${name.substring(0, 25)}...` : name}
                        </h2>
                    </Link>

                    {/* Ratings + Price */}
                    <div className="flex flex-col gap-2 items-start w-full">
                        <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
                            <span className="text-xs px-2 py-0.5 bg-green-600 rounded text-white flex items-center gap-1">
                                {ratings.toFixed(1)}
                                <StarIcon sx={{ fontSize: "14px" }} />
                            </span>
                            <span>({numOfReviews})</span>
                        </span>

                        <div className="flex items-center gap-2 text-md font-medium">
                            <span>₹{discountPrice.toLocaleString()}</span>
                            <span className="text-gray-400 line-through text-xs">₹{price.toLocaleString()}</span>
                            <span className="text-xs text-green-600">{getDiscount(price, discountPrice)}% off</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;
