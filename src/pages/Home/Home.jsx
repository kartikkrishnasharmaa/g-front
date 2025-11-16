import { useAuth } from "../../context/auth";
import ScrollToTopOnRouteChange from "../../utils/ScrollToTopOnRouteChange";
import Categories from "../../components/header/Categories";
import Banner from "./Banner/Banner";
import DealSlider from "./DealSlider/DealSlider";
import ProductSlider from "./ProductsListing/ProductSlider";
import { electronicProducts } from "../../utils/electronics";
import { accessories } from "../../utils/accessories";
import electronics from "../../assets/images/electronics-card.jpg";
import SeoData from "../../SEO/SeoData";

const Home = () => {
    return (
        <>
            <SeoData title="Gowamrit Ghee" />
            <ScrollToTopOnRouteChange />
            {/* <Categories /> */}
            <main className="flex flex-col items-center gap-3 px-2 pb-5 sm:mt-2">
                {/* <pre className="min-h-[60vh]">
                    {JSON.stringify(auth, null, 3)}
                </pre> */}
                <Banner />
                <DealSlider title={"Discounts for You"} />
                <ProductSlider
                    title={"Best of Electronics"}
                    products={electronicProducts}
                    logo={electronics}
                />
          
                {/* <Suggestion
                    title={"Suggested for You"}
                    tagline={"Based on Your Activity"}
                />

                <ProductSlider
                    title={"Fashion Top Deals"}
                    products={fashionProducts}
                    logo={fashionCard}
                />
                <ProductSlider
                    title={"TVs & Appliances"}
                    products={applianceProducts}
                    logo={applianceCard}
                />
                <ProductSlider
                    title={"Furniture & More"}
                    products={furnitureProducts}
                    logo={furnitureCard}
                /> */}
            </main>
        </>
    );
};

export default Home;
