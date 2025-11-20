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

                {/* Images Grid Section */}
                <section className="w-full rounded-sm shadow p-0 overflow-hidden mt-10 sm:mt-12">

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
                `}
            </style>
        </>
    );
};

export default Banner;
