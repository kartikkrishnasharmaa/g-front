/* src/pages/order/OrderSuccess.jsx */
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SeoData from "../../../SEO/SeoData";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <>
      <SeoData title={`Transaction Successful`} />
      <main className="w-full p-8 relative min-h-[60vh]">
        <div className="flex flex-col gap-2 items-center justify-center sm:w-4/6 m-auto bg-white shadow rounded p-6 min-h-[60vh]">
          <div className="flex gap-4 items-center">
            <h1 className="text-2xl font-semibold">Transaction Successful</h1>
            <CheckCircleOutlineIcon className="text-primaryBlue" />
          </div>
          <p className="mt-4 text-lg text-gray-800">
            Your payment was successful and your order is being processed.
          </p>
          <Link
            to="/user/orders"
            className="bg-primaryBlue mt-2 py-2.5 px-6 text-white uppercase shadow hover:shadow-lg rounded-sm"
          >
            go to orders
          </Link>
        </div>
      </main>
    </>
  );
};

export default OrderSuccess;
