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
            id: 2,
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="
                                    bg-white 
                                    rounded-xl 
                                    shadow-lg 
                                    overflow-hidden 
                                    hover:shadow-xl 
                                    transition-all 
                                    duration-300 
                                    hover:transform 
                                    hover:-translate-y-2
                                    border 
                                    border-gray-100
                                    animate-fadeIn
                                "
                            >
                                {/* Product Image */}
                                <div className="relative overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-64 object-contain bg-white p-2 transition-transform duration-500 hover:scale-105"
                                    />

                                    <div className="absolute top-3 right-3">
                                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                            {product.discount}
                                        </span>
                                    </div>
                                </div>

                                {/* Product Content */}
                                <div className="p-5 sm:p-6">
                                    {/* Product Name */}
                                    <h3 className="text-xl font-bold text-[#5C3D00] mb-2 line-clamp-2">
                                        {product.name}
                                    </h3>

                                    {/* Product Description */}
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {product.description}
                                    </p>

                                    {/* Product Highlights */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-[#A67623] mb-2">
                                            Key Features:
                                        </h4>
                                        <ul className="space-y-1">
                                            {product.highlights.slice(0, 3).map((highlight, index) => (
                                                <li key={index} className="flex items-start gap-2 text-xs text-gray-700">
                                                    <span className="w-1.5 h-1.5 bg-[#D4A752] rounded-full mt-1.5 flex-shrink-0"></span>
                                                    <span>{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Price and CTA */}
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-bold text-[#5C3D00]">
                                                {product.price}
                                            </span>
                                            <span className="text-sm text-gray-500 line-through">
                                                {product.originalPrice}
                                            </span>
                                        </div>
                                        <Link to={`${product.link}`}>
                                            <button
                                                className="
                                                    bg-[#D4A752] 
                                                    hover:bg-[#b78b3c] 
                                                    text-white 
                                                    px-4 
                                                    py-2 
                                                    rounded-lg 
                                                    text-sm 
                                                    font-semibold 
                                                    transition-colors 
                                                    duration-200 
                                                    shadow-md 
                                                    hover:shadow-lg
                                                    flex 
                                                    items-center 
                                                    gap-1
                                                "
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={2}
                                                    stroke="currentColor"
                                                    className="w-4 h-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                                    />
                                                </svg>
                                                Buy Now
                                            </button>
                                        </Link>
                                    </div>
                                </div>
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