/* eslint-disable react/prop-types */
import first from "../../../assets/images/Banners/squarefirst.jpg";
import second from "../../../assets/images/Banners/squaresecond.jpg";
import third from "../../../assets/images/Banners/squarethird.jpg";
import fourth from "../../../assets/images/Banners/squarefourth.jpg";
import fifth from "../../../assets/images/Banners/squarefifth.jpg";
import sixth from "../../../assets/images/Banners/squaresixth.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
    const images = [
        first,
        second,
        third,
        fourth,
        fifth,
        sixth,
    ];

    const products = [
        {
            id: 1,
            name: "Saffron blended A2 gir cow ghee 0.5 KG",
            image: "https://res.cloudinary.com/ddvfaiqrh/image/upload/v1763825642/products/vcupqmbyaqeihqnk6rjp.jpg", // You can replace with actual product images
            link: "https://www.gowamrit.com/product/6921d46880a8df5e196a8420",
            description: "Premium saffron infused A2 ghee with traditional bilona method",
            highlights: [
                "Premium Saffron Infused",
                "Pure Gir Cow A2 Ghee",
                "Small-Batch Preparation",
                "Authentic & Nutritious"
            ],
            price: "₹1,999",
            originalPrice: "₹2,200",
            discount: "9% off"
        },
        {
            id: 2,
            name: "Saffron blended A2 gir cow ghee 1 KG",
            image: "https://res.cloudinary.com/ddvfaiqrh/image/upload/v1763825642/products/vcupqmbyaqeihqnk6rjp.jpg", // You can replace with actual product images
            link: "https://www.gowamrit.com/product/6921d7ef80a8df5e196a8469",
            description: "Premium saffron infused A2 ghee with traditional bilona method",
            highlights: [
                "Premium Saffron Infused",
                "Pure Gir Cow A2 Ghee",
                "Small-Batch Preparation",
                "Authentic & Nutritious"
            ],
            price: "₹3,999",
            originalPrice: "₹4,600",
            discount: "13% off"
        },
        {
            id: 3,
            name: "Classic A2 gir cow ghee 0.5 KG",
            image: "https://res.cloudinary.com/ddvfaiqrh/image/upload/v1763819974/products/awrzd5tfjaewjlikqi1u.jpg",
            link: "https://www.gowamrit.com/product/6921c1cb8c84389603036996",
            description: "Certified organic A2 ghee for health-conscious families",
            highlights: [
                "Certified Organic",
                "No Additives/Preservatives",
                "Rich in CLA & Omega-3",
                "Vedic Preparation"
            ],
            price: "₹1,749",
            originalPrice: "₹1,900",
            discount: "8% off"
        },
        {
            id: 4,
            name: "Classic A2 gir cow ghee 1 KG",
            image: "https://res.cloudinary.com/ddvfaiqrh/image/upload/v1763824164/products/was94q3x3mlypym9jyfo.jpg",
            link: "https://www.gowamrit.com/product/6921d22580a8df5e196a83c0",
            description: "Authentic traditional bilona ghee from Gir cow milk",
            highlights: [
                "100% Pure Gir Cow Milk",
                "Traditional Bilona Method",
                "Chemical Free Process",
                "Rich in A2 Beta-Casein"
            ],
            price: "₹3,499",
            originalPrice: "₹3,850",
            discount: "9% off"
        }
    ];

    return (
        <>
            {/* Main Page Wrapper */}
            <div className="w-full py-10 px-4 sm:px-8 lg:px-16 bg-[#FFFDF7]">

                {/* Heading Section */}
                <div className="text-center max-w-3xl mx-auto animate-fadeInUp">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#5C3D00] mb-4 tracking-wide">
                        Welcome to <span className="text-[#D4A752]">Gowamrit</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                        Pure, Traditionally Crafted, and Chemical-Free
                        <span className="font-semibold text-[#A67623]"> A2 Cow Ghee </span>
                        directly sourced from natural farms.
                        Experience the real taste of purity and health.
                    </p>

                    <div className="flex justify-center items-center">
                        <Link to="/products">
                            <button
                                className="
                                    mt-6 
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
                                    gap-2
                                "
                            >
                                <span className="text-lg font-semibold tracking-wide">
                                    Shop Now
                                </span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                    />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Product Showcase Section */}
                <section className="mt-16 animate-slideIn">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#5C3D00] mb-4">
                            Our Premium Ghee Collection
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Handcrafted with traditional wisdom and modern purity standards
                        </p>
                    </div>

                    {/* Product Cards Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="
                bg-white 
                rounded-2xl 
                shadow-md 
                overflow-hidden 
                border 
                border-gray-200
                transition-all 
                duration-300 
                hover:shadow-xl
            "
                            >
                                <Link to={`${product.link}`}>

                                    {/* Product Image */}
                                    <div className="relative w-full h-40 sm:h-48 bg-[#e7eef7] flex items-center justify-center">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-full object-cover transition-transform duration-300 hover:scale-105"
                                        />

                                        {/* Rating Badge */}
                                        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full shadow flex items-center gap-1">
                                            <span className="text-yellow-500 text-sm">★</span>
                                            <span className="text-xs font-semibold">{product.rating}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-3">
                                        {/* Name */}
                                        <h3 className="text-[15px] font-semibold text-gray-800">
                                            {product.name}
                                        </h3>

                                        {/* Short Description */}
                                        <p className="text-gray-500 text-xs leading-tight mt-1 mb-1">
                                            {product.description}
                                        </p>

                                        {/* Weight */}
                                        <p className="text-gray-800 text-sm font-semibold mb-2">
                                            {product.weight}
                                        </p>

                                        {/* Price Row */}
                                        <div className="flex items-center justify-between mt-2">
                                            <div>
                                                <span className="text-lg font-bold text-[#5C3D00]">
                                                    {product.price}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-red-600 font-semibold">
                                                        -{product.discount}%
                                                    </span>
                                                    <span className="text-xs text-gray-400 line-through">
                                                        {product.originalPrice}
                                                    </span>
                                                </div>
                                            </div>
                                            {/* Add Button */}
                                            <button className="h-9 w-9 bg-[#8C6239] hover:bg-[#6d4e2b] text-white flex items-center justify-center rounded-xl text-xl font-bold shadow-md">
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>


                    {/* View All Products Button */}
                    <div className="text-center mt-8">
                        <Link to="/products">
                            <button
                                className="
                                    border-2 
                                    border-[#D4A752] 
                                    text-[#5C3D00] 
                                    hover:bg-[#D4A752] 
                                    hover:text-white 
                                    px-8 
                                    py-3 
                                    rounded-full 
                                    font-semibold 
                                    transition-all 
                                    duration-300 
                                    shadow-md 
                                    hover:shadow-lg
                                "
                            >
                                View All Products
                            </button>
                        </Link>
                    </div>
                </section>

                {/* Images Grid Section */}
                <section className="w-full rounded-sm shadow p-0 overflow-hidden mt-16 sm:mt-20">
                    <div
                        className="
                            grid
                            grid-cols-3
                            gap-4
                            p-2
                            animate-fadeIn
                        "
                    >
                        {images.map((img, i) => (
                            <div
                                key={i}
                                className="
                                    aspect-square 
                                    overflow-hidden 
                                    rounded-sm 
                                    transform 
                                    hover:scale-105 
                                    transition-all 
                                    duration-500
                                "
                            >
                                <img
                                    src={img}
                                    draggable="false"
                                    alt="square-img"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* About Product Section */}
                <div className="mt-16 max-w-4xl mx-auto text-center bg-white p-6 sm:p-10 rounded-xl shadow animate-slideIn">
                    <h2 className="text-3xl font-bold text-[#5C3D00] mb-4">
                        Why Choose Gowamrit Ghee?
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        Our A2 cow ghee is prepared using the traditional Bilona method
                        ensuring the richest nutrients, authentic aroma, and unmatched purity.
                        Each drop is packed with natural goodness, making it perfect for cooking,
                        immunity, digestion, and overall well-being.
                    </p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="text-center p-4">
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-2xl">🌿</span>
                            </div>
                            <h3 className="font-semibold text-[#5C3D00] mb-2">100% Natural</h3>
                            <p className="text-sm text-gray-600">No chemicals, additives or preservatives</p>
                        </div>
                        <div className="text-center p-4">
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-2xl">🏺</span>
                            </div>
                            <h3 className="font-semibold text-[#5C3D00] mb-2">Traditional Method</h3>
                            <p className="text-sm text-gray-600">Authentic bilona hand-churned process</p>
                        </div>
                        <div className="text-center p-4">
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-2xl">🐄</span>
                            </div>
                            <h3 className="font-semibold text-[#5C3D00] mb-2">Gir Cow A2 Milk</h3>
                            <p className="text-sm text-gray-600">Pure A2 milk from native Indian cows</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Tailwind Custom Animations */}
            <style>
                {`
                @keyframes fadeInUp {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeInUp {
                    animation: fadeInUp 1s ease-out;
                }

                @keyframes zoomIn {
                    0% { transform: scale(0.8); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-zoomIn {
                    animation: zoomIn 0.8s ease-out;
                }

                @keyframes fadeIn {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 1.3s ease-in-out;
                }

                @keyframes slideIn {
                    0% { opacity: 0; transform: translateY(30px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-slideIn {
                    animation: slideIn 1s ease-out;
                }

                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                `}
            </style>
        </>
    );
};

export default Banner;