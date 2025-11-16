import { Helmet } from "react-helmet";

// eslint-disable-next-line react/prop-types
const SeoData = ({ title, description, keywords }) => (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
    </Helmet>
);

SeoData.defaultProps = {
    title: "Gowamrit Ghee",
    description: "Gowamrit Ghee - Pure and Organic Cow Ghee for a Healthy Lifestyle.",
    keywords: ["health", "ghee", "organic", "pure ghee", "cow ghee"].join(", "),
};

export default SeoData;
