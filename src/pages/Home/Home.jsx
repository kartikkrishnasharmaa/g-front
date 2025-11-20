import ScrollToTopOnRouteChange from "../../utils/ScrollToTopOnRouteChange";
import Banner from "./Banner/Banner";
import Box from "./Banner/Box";
import SeoData from "../../SEO/SeoData";

const Home = () => {
    return (
        <>
            <SeoData title="Gowamrit Ghee" />
            <ScrollToTopOnRouteChange />
            <main className="flex flex-col items-center gap-3 px-2 pb-5 sm:mt-2">
           
                <Banner />
                <Box />

            </main>
        </>
    );
};

export default Home;
