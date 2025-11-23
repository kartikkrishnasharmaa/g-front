/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { NextBtn, PreviousBtn } from "../../pages/Home/Banner/Banner.jsx";
import ProductSlider from "../../pages/Home/ProductsListing/ProductSlider.jsx";
import Spinner from "../../components/Spinner";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import StarIcon from "@mui/icons-material/Star";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CachedIcon from "@mui/icons-material/Cached";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { getDeliveryDate, getDiscount } from "../../utils/functions";
import MinCategory from "../../components/MinCategory";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { fashionProducts } from "../../utils/fashion";
import { electronicProducts } from "../../utils/electronics";
import ScrollToTopOnRouteChange from "../../utils/ScrollToTopOnRouteChange";
import { useCart } from "../../context/cart";
import SeoData from "../../SEO/SeoData";

const ProductDetails = () => {
    const navigate = useNavigate();
    const { auth, setAuth, LogOut, isAdmin, isContextLoading } = useAuth();
    const [cartItems, setCartItems, addItems] = useCart();

    // reviews toggle
    const [open, setOpen] = useState(false);
    const [viewAll, setViewAll] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});

    // slider refs / sync
    const mainSliderRef = useRef(null);
    const thumbSliderRef = useRef(null);
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { productId } = useParams();

    // SLICK SETTINGS
    const mainSettings = {
        autoplay: true,
        autoplaySpeed: 3000,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
        asNavFor: nav2,
        adaptiveHeight: true,
        beforeChange: (oldIndex, newIndex) => setActiveIndex(newIndex),
    };

    // thumbnails: vertical on desktop (show 4), horizontal on mobile
    const thumbSettings = {
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: nav1,
        focusOnSelect: true,
        arrows: false,
        vertical: true,
        centerMode: false,
        infinite: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    vertical: false,
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    vertical: false,
                    slidesToShow: 4,
                },
            },
        ],
    };

    useEffect(() => {
        setNav1(mainSliderRef.current);
        setNav2(thumbSliderRef.current);
    }, []);

    // reviews submit handler
    const reviewSubmitHandler = () => {
        if (rating === 0 || !comment.trim()) {
            toast.error("Empty Review", {
                style: {
                    top: "40px",
                },
            });
            return;
        }
        const formData = new FormData();
        formData.set("rating", rating);
        formData.set("comment", comment);
        formData.set("productId", productId);

        // send to server (you had not included axios call earlier, add if needed)
        setOpen(false);
    };

    const addToCartHandler = () => {
        const item = {
            productId: product._id,
            name: product.name,
            stock: product.stock,
            image: product.images?.[0]?.url,
            brandName: product.brand?.name,
            price: product.price,
            discountPrice: product.discountPrice,
            seller: product.seller,
        };
        addItems(item, 1);
        toast.success("Added to cart!", {
            style: {
                top: "40px",
            },
        });
    };

    const handleDialogClose = () => {
        setOpen(!open);
    };

    const itemInCart = cartItems.some((item) => item.productId === productId);

    const goToCart = () => {
        navigate("/cart");
    };

    const buyNow = () => {
        addToCartHandler();
        navigate("/cart");
    };

    //fetch wishlist items
    useEffect(() => {
        const fetchWishlistItems = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/user/wishlist`,
                    {
                        headers: {
                            Authorization: auth.token,
                        },
                    }
                );
                setWishlistItems(res.data.wishlistItems || []);
            } catch (error) {
                console.error("Error fetching wishlist items:", error);
            }
        };
        auth.token && !isAdmin && fetchWishlistItems();
    }, [isContextLoading, auth.token, auth, isAdmin]);

    //fetch product details
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/product/${productId}`
                );
                if (res.status === 200 || res.status === 201) {
                    setProduct(res.data.product);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error:", error);
                setLoading(false);
                if (error.response?.status === 404) {
                    toast.error("Product Not Found!", {
                        style: {
                            top: "40px",
                        },
                    });
                }
                if (error.response?.status === 500) {
                    toast.error("Something went wrong! Please try after sometime.", {
                        style: {
                            top: "40px",
                        },
                    });
                }
            }
        };
        fetchProduct();
    }, [productId]);

    // wishlist logic
    let itemInWishlist = wishlistItems?.find((id) => id === productId);
    const updateWishlistUI = (add) => {
        setWishlistItems((prev) =>
            add ? [...prev, product._id] : prev.filter((item) => item !== product._id)
        );
    };

    const addToWishlistHandler = async () => {
        let type = itemInWishlist ? "remove" : "add";
        try {
            updateWishlistUI(type === "add");
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/user/update-wishlist`,
                {
                    productId: productId,
                    type,
                },
                {
                    headers: {
                        Authorization: auth.token,
                    },
                }
            );
            res.status === 201 &&
                toast.success(
                    type === "add" ? "Product Added To Wishlist" : "Product Removed From Wishlist",
                    { style: { top: "40px" } }
                );
        } catch (error) {
            console.log(error);
            updateWishlistUI(type !== "add");
            toast.error("Something went wrong!", {
                style: { top: "40px" },
            });
        }
    };

    // helper: click a thumbnail to change main slider
    const handleThumbnailClick = (index) => {
        if (mainSliderRef.current) {
            mainSliderRef.current.slickGoTo(index);
        }
    };

    // safe fallback images array
    const images = product?.images && product.images.length ? product.images : [{ url: "/placeholder.png" }];

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <SeoData title={product?.name} />
                    <ScrollToTopOnRouteChange />
                    {/* Main Container - Improved mobile spacing */}
                    <main className="mt-4 sm:mt-5 container mx-auto px-3 sm:px-4 max-w-full overflow-x-hidden">
                        {/* product image & description container */}
                        <div className="w-full flex flex-col lg:flex-row bg-white sm:p-4 rounded-lg shadow-sm border gap-4 sm:gap-8">
                            {/* Left Column - Images */}
                            <div className="w-full lg:w-2/5 flex flex-col lg:flex-row lg:items-start">
                                {/* Thumbnails for Desktop */}
                                <div className="hidden lg:flex flex-col gap-3 mr-4">
                                    <div className="w-20">
                                        <Slider
                                            {...thumbSettings}
                                            ref={thumbSliderRef}
                                            asNavFor={nav1}
                                        >
                                            {images.map((img, idx) => (
                                                <div key={idx} className="px-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleThumbnailClick(idx)}
                                                        className={`w-full h-20 p-1 border-2 rounded-lg bg-white overflow-hidden transition-all duration-200 ${idx === activeIndex
                                                                ? "border-blue-500 shadow-md"
                                                                : "border-gray-200 hover:border-gray-300"
                                                            }`}
                                                    >
                                                        <img
                                                            draggable="false"
                                                            className="w-full h-full object-contain"
                                                            src={img.url}
                                                            alt={`${product?.name}-thumb-${idx}`}
                                                        />
                                                    </button>
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                </div>

                                {/* Main Image Area */}
                                <div className="flex-1 w-full">
                                    <div className="border border-gray-200 rounded-xl p-2 sm:p-4 bg-white relative">
                                        <Slider
                                            {...mainSettings}
                                            ref={mainSliderRef}
                                            asNavFor={nav2}
                                        >
                                            {images.map((img, idx) => (
                                                <div key={idx} className="flex items-center justify-center p-1 sm:p-2">
                                                    <img
                                                        draggable="false"
                                                        className="w-full max-h-[300px] sm:max-h-[400px] lg:max-h-[480px] object-contain"
                                                        src={img.url}
                                                        alt={`${product?.name}-${idx}`}
                                                    />
                                                </div>
                                            ))}
                                        </Slider>

                                        {/* Wishlist Button */}
                                        <div className={`absolute top-2 right-2 sm:top-4 sm:right-4 z-20 ${isAdmin ? "hidden" : ""}`}>
                                            <button
                                                onClick={addToWishlistHandler}
                                                className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full shadow-lg transition-all duration-200 ${itemInWishlist
                                                        ? "bg-red-50 text-red-500 border border-red-200"
                                                        : "bg-white text-gray-400 hover:text-red-500 border border-gray-200"
                                                    }`}
                                                aria-label="wishlist"
                                            >
                                                <FavoriteIcon sx={{ fontSize: "18px" }} />
                                            </button>
                                        </div>

                                        {/* Mobile Thumbnails */}
                                        <div className="mt-3 lg:hidden">
                                            <div className="flex gap-1 sm:gap-2 justify-center overflow-x-auto pb-2">
                                                {images.map((img, idx) => (
                                                    <button
                                                        key={idx}
                                                        type="button"
                                                        onClick={() => handleThumbnailClick(idx)}
                                                        className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 p-1 border-2 rounded-lg bg-white overflow-hidden transition-all duration-200 ${idx === activeIndex
                                                                ? "border-blue-500 shadow-md"
                                                                : "border-gray-200 hover:border-gray-300"
                                                            }`}
                                                    >
                                                        <img
                                                            draggable="false"
                                                            className="w-full h-full object-contain"
                                                            src={img.url}
                                                            alt={`${product?.name}-thumb-${idx}`}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Product Details - Fixed mobile margins */}
                            <div className="w-full lg:w-3/5 py-2 lg:ml-14 px-2 sm:px-4">
                                {/* Product Header */}
                                <div className="border-b border-gray-200 pb-3 sm:pb-4 mb-3 sm:mb-4">
                                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight break-words">
                                        {product?.name}
                                    </h1>

                                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                                        <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium">
                                            <span>{product?.ratings?.toFixed(1)}</span>
                                            <StarIcon sx={{ fontSize: "14px" }} />
                                        </div>
                                        <span className="text-gray-600 text-xs sm:text-sm">
                                            {product?.numOfReviews} Reviews
                                        </span>
                                        <span className="text-gray-600 text-xs sm:text-sm hidden sm:inline">•</span>
                                        <span className="text-green-600 text-xs sm:text-sm font-medium">
                                            {product?.stock > 0 ? "In Stock" : "Out of Stock"}
                                        </span>
                                    </div>
                                </div>

                                {/* Pricing Section */}
                                <div className="bg-gray-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                                    <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-1 sm:mb-2">
                                        <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                                            ₹{product?.discountPrice?.toLocaleString()}
                                        </span>
                                        <span className="text-base sm:text-lg text-gray-500 line-through">
                                            ₹{product?.price?.toLocaleString()}
                                        </span>
                                        <span className="text-xs sm:text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                                            {getDiscount(product?.price, product?.discountPrice)}% OFF
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Inclusive of all taxes
                                    </p>
                                </div>

                                {/* Action Buttons - Stack on mobile */}
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-6 sm:mb-8">
                                    {product.stock > 0 ? (
                                        <>
                                            <button
                                                onClick={itemInCart ? goToCart : addToCartHandler}
                                                disabled={isAdmin}
                                                className="mt-6 
                                    px-8 
                                    py-3 
                                    bg-[#D4A752] 
                                    text-white 
                                    rounded-full 
                                    shadow-md 
                                    hover:shadow-lg 
                                    transition-all 
                                    duration-300 
                                    hover:bg-[#b78b3c] 
                                    animate-zoomIn
                                    flex 
                                    items-center 
                                    justify-center 
                                    gap-2"
                                            >
                                                <ShoppingCartIcon sx={{ fontSize: "20px" }} />
                                                {itemInCart ? "GO TO CART" : "ADD TO CART"}
                                            </button>
                                            <button
                                                onClick={buyNow}
                                                disabled={isAdmin}
                                                className="mt-6 
                                    px-8 
                                    py-3 
                                    bg-[#D4A752] 
                                    text-white 
                                    rounded-full 
                                    shadow-md 
                                    hover:shadow-lg 
                                    transition-all 
                                    duration-300 
                                    hover:bg-[#b78b3c] 
                                    animate-zoomIn
                                    flex 
                                    items-center 
                                    justify-center 
                                    gap-2"
                                            >
                                                <FlashOnIcon sx={{ fontSize: "20px" }} />
                                                BUY NOW
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            disabled
                                            className="w-full bg-red-100 text-red-600 py-3 px-6 rounded-xl font-semibold cursor-not-allowed text-sm sm:text-base"
                                        >
                                            OUT OF STOCK
                                        </button>
                                    )}
                                </div>

                                {/* Stock Alert */}
                                {product?.stock <= 10 && product?.stock > 0 && (
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 sm:mb-6">
                                        <p className="text-yellow-800 text-xs sm:text-sm font-medium flex items-center gap-2">
                                            <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                                            Hurry! Only {product.stock} left in stock
                                        </p>
                                    </div>
                                )}

                                {/* Product Highlights */}
                                <div className="mb-4 sm:mb-6">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Product Highlights</h3>
                                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                                        <ul className="space-y-1 sm:space-y-2">
                                            {product?.highlights?.length ? (
                                                product.highlights.map((highlight, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                                                        <span className="break-words">{highlight}</span>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="text-xs sm:text-sm text-gray-500">No highlights available</li>
                                            )}
                                        </ul>
                                    </div>
                                </div>

                                {/* Seller Information */}
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4 sm:mb-6">
                                    <span className="text-gray-600 font-medium text-sm sm:text-base">Seller</span>
                                    <div className="flex items-center gap-2">
                                        <VerifiedUserIcon sx={{ fontSize: "16px", color: "#10B981" }} />
                                        <span className="font-semibold text-gray-900 text-sm sm:text-base">{product?.brand?.name}</span>
                                    </div>
                                </div>

                                {/* Delivery Info */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                                    <h4 className="font-semibold text-blue-900 text-sm sm:text-base mb-1 sm:mb-2">Delivery Options</h4>
                                    <p className="text-xs sm:text-sm text-blue-800">
                                        Free delivery by {getDeliveryDate()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Additional Product Information */}
                        <div className="mt-6 sm:mt-8 bg-white rounded-lg shadow-sm border p-4 sm:p-6">
                            {/* Description */}
                            <div className="mb-6 sm:mb-8">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 pb-2 border-b">Description</h3>
                                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                    {product?.description || "No description available."}
                                </p>
                            </div>

                            {/* Specifications */}
                            <div className="mb-6 sm:mb-8">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 pb-2 border-b">Specifications</h3>
                                <div className="grid gap-3 sm:gap-4">
                                    {product?.specifications?.length ? (
                                        product.specifications.map((spec, i) => (
                                            <div key={i} className="flex flex-col sm:flex-row border-b border-gray-100 pb-2 sm:pb-3">
                                                <div className="w-full sm:w-1/3 font-medium text-gray-600 text-sm sm:text-base mb-1 sm:mb-0">{spec.title}</div>
                                                <div className="w-full sm:w-2/3 text-gray-800 text-sm sm:text-base break-words">{spec.description}</div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm sm:text-base">No specifications available</p>
                                    )}
                                </div>
                            </div>

                            {/* Reviews Section */}
                            <div>
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Ratings & Reviews</h3>
                                    <button
                                        onClick={handleDialogClose}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base w-full sm:w-auto"
                                    >
                                        Rate Product
                                    </button>
                                </div>

                                <Dialog aria-labelledby="review-dialog" open={open} onClose={handleDialogClose} fullWidth maxWidth="sm">
                                    <DialogTitle className="border-b font-semibold text-sm sm:text-base">Submit Your Review</DialogTitle>
                                    <DialogContent className="flex flex-col m-3 sm:m-4 gap-3 sm:gap-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-700 text-sm sm:text-base">Rating:</span>
                                            <Rating
                                                onChange={(e) => setRating(Number(e.target.value))}
                                                value={rating}
                                                size="medium"
                                                precision={0.5}
                                            />
                                        </div>
                                        <TextField
                                            label="Your Review"
                                            multiline
                                            rows={4}
                                            sx={{ width: '100%' }}
                                            size="small"
                                            variant="outlined"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                    </DialogContent>
                                    <DialogActions className="p-3 sm:p-4">
                                        <button
                                            onClick={handleDialogClose}
                                            className="py-2 px-4 sm:px-6 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium transition-colors duration-200 text-sm sm:text-base"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={reviewSubmitHandler}
                                            className="py-2 px-4 sm:px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200 text-sm sm:text-base"
                                        >
                                            Submit Review
                                        </button>
                                    </DialogActions>
                                </Dialog>

                                {/* Reviews Summary */}
                                <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="text-3xl sm:text-4xl font-bold text-gray-900">
                                            {product?.ratings?.toFixed(1)}
                                        </div>
                                        <div>
                                            <Rating value={product?.ratings} readOnly precision={0.1} size="medium" />
                                            <p className="text-gray-600 mt-1 text-sm sm:text-base">{product?.numOfReviews} Reviews</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Reviews List */}
                                <div className="space-y-3 sm:space-y-4">
                                    {viewAll
                                        ? product?.reviews?.slice().reverse().map((rev, i) => (
                                            <div key={i} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Rating value={rev.rating} readOnly size="small" />
                                                    <span className="text-xs sm:text-sm text-gray-500">by {rev.name}</span>
                                                </div>
                                                <p className="text-gray-700 text-sm sm:text-base">{rev.comment}</p>
                                            </div>
                                        ))
                                        : product.reviews?.slice(-3).reverse().map((rev, i) => (
                                            <div key={i} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Rating value={rev.rating} readOnly size="small" />
                                                    <span className="text-xs sm:text-sm text-gray-500">by {rev.name}</span>
                                                </div>
                                                <p className="text-gray-700 text-sm sm:text-base">{rev.comment}</p>
                                            </div>
                                        ))}

                                    {product.reviews?.length > 3 && (
                                        <button
                                            onClick={() => setViewAll(!viewAll)}
                                            className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors duration-200 text-sm sm:text-base"
                                        >
                                            {viewAll ? "Show Less Reviews" : `View All ${product.reviews.length} Reviews`}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </main>
                </>
            )}
        </>
    );
};

export default ProductDetails;