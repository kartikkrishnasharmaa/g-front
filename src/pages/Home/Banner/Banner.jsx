/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import first from "../../../assets/images/Banners/first.jpg";
import second from "../../../assets/images/Banners/second.jpg";
import third from "../../../assets/images/Banners/third.jpg";
import fourth from "../../../assets/images/Banners/fourth.jpg";



export const PreviousBtn = ({ className, onClick }) => {
    return (
        <div className={className} onClick={onClick}>
            <ArrowBackIosIcon />
        </div>
    );
};

export const NextBtn = ({ className, onClick }) => {
    return (
        <div className={className} onClick={onClick}>
            <ArrowForwardIosIcon />
        </div>
    );
};

const Banner = () => {
    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
    };

    const banners = [
        first,
        second,
        third,
        fourth,
    ];

    return (
        <>
            <section className="w-full rounded-sm shadow p-0 overflow-hidden mt-3 sm:m-2">
                <Slider {...settings}>
                    {banners.map((el, i) => (
                        <img
                            draggable="false"
                            className="h-[500px]  w-full object-cover "
                            src={el}
                            alt="banner"
                            key={i}
                        />
                    ))}
                </Slider>
            </section>
        </>
    );
};

export default Banner;
