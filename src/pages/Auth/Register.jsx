import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import auth from "../../assets/images/auth.png";
import { Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Spinner";
import Checkbox from "@mui/material/Checkbox";
import SeoData from "../../SEO/SeoData";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [isSeller, setIsSeller] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const handleCheckbox = () => {
        setIsSeller(!isSeller);
    };

    const navigate = useNavigate();

    //form submission handler
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (password !== confirmPassword) {
                toast.error("Password does not match!");
                return;
            }
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/register`,
                {
                    name,
                    email,
                    phone,
                    password,
                    address,
                    isSeller,
                }
            );
            console.log(response);

            // Registration successful
            response.status === 201 &&
                toast.success(
                    "User Registered Successfully! Please Login..."
                ) &&
                navigate("/login");

            // Email already registered
            response.status === 200 &&
                toast.error("Email is already registered! Please Login...") &&
                navigate("/login");
        } catch (error) {
            console.error("Error:", error);

            //server error
            error.response.status === 500 &&
                toast.error(
                    "Something went wrong! Please try after sometime."
                ) &&
                navigate("/register");
        } finally {
            setIsSubmitting(false);
        }
    };

    //display content
    return (
        //SEO
        <>
            <SeoData
                title="Sign up - New User"
                description="Register new user with details"
            />
            {isSubmitting ? (
                <Spinner />
            ) : (
             <div className="w-full min-h-screen bg-primaryBg flex items-center justify-center py-10 px-4">
  <div className="flex flex-col lg:flex-row bg-white shadow-lg w-full max-w-5xl rounded-lg overflow-hidden">

    {/* LEFT IMAGE + TEXT */}
    <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center p-6 sm:p-10 text-center lg:text-left">
      <h2 className="text-[22px] font-semibold text-black leading-8">
        Looks like you're new here!
      </h2>
      <img
        src={auth}
        alt="auth"
        className="w-full max-w-xs sm:max-w-sm md:max-w-md object-contain mt-10"
      />
    </div>

    {/* RIGHT FORM SECTION */}
    <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
      <form
        action="/register"
        method="post"
        className="w-full"
        onSubmit={handleFormSubmit}
      >
        <div className="text-base space-y-6 text-gray-700">

          {/* FULL NAME */}
          <div className="relative">
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="peer placeholder-transparent border-b-2 w-full h-10 text-sm focus:outline-none focus:border-blue-500"
              placeholder="Full Name"
              required
            />
            <label className="absolute left-0 -top-3 text-gray-600 text-xs transition-all
              peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
              peer-focus:-top-3 peer-focus:text-xs peer-focus:text-gray-600">
              Full Name
            </label>
          </div>

          {/* EMAIL */}
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer placeholder-transparent border-b-2 w-full h-10 text-sm focus:outline-none focus:border-blue-500"
              placeholder="Email"
              required
            />
            <label className="absolute left-0 -top-3 text-gray-600 text-xs transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-xs">
              Email Address
            </label>
          </div>

          {/* PHONE */}
          <div className="relative">
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="peer placeholder-transparent border-b-2 w-full h-10 text-sm focus:outline-none focus:border-blue-500"
              placeholder="Mobile Number"
              required
              maxLength="10"
            />
            <label className="absolute left-0 -top-3 text-gray-600 text-xs transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-xs">
              Mobile Number
            </label>
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer placeholder-transparent border-b-2 w-full h-10 text-sm focus:outline-none focus:border-blue-500"
              placeholder="Password"
              required
            />
            <label className="absolute left-0 -top-3 text-gray-600 text-xs transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-xs">
              Password
            </label>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <input
              id="confirm_password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="peer placeholder-transparent border-b-2 w-full h-10 text-sm focus:outline-none focus:border-blue-500"
              placeholder="Confirm Password"
              required
            />
            <label className="absolute left-0 -top-3 text-gray-600 text-xs transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-xs">
              Confirm Password
            </label>

            <span
              className="absolute right-3 bottom-2 text-gray-700 cursor-pointer"
              onClick={handlePasswordToggle}
            >
              {!showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </div>

          {/* ADDRESS */}
          <div className="relative">
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="peer placeholder-transparent border-b-2 w-full h-10 text-sm focus:outline-none focus:border-blue-500"
              placeholder="Address"
              required
            />
            <label className="absolute left-0 -top-3 text-gray-600 text-xs transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-xs">
              Address
            </label>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            className="
              w-full 
              bg-red-600 
              text-white font-semibold text-sm uppercase
              py-2 rounded-md 
              shadow-md hover:shadow-lg 
              transition-all duration-300
            "
          >
            Continue
          </button>
        </div>
      </form>

      {/* LOGIN BUTTON */}
      <div className="mt-6">
        <Link to="/login">
          <button
            className="
              w-full 
              bg-red-900 
              text-white font-semibold text-sm uppercase
              py-2 rounded-md
              shadow-md hover:shadow-lg
              transition-all duration-300
            "
          >
            Existing User? Log In
          </button>
        </Link>
      </div>
    </div>
  </div>
</div>

            )}
        </>
    );
};

export default Register;
