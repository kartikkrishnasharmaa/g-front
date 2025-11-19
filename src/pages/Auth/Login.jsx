import { useEffect, useState } from "react";
import authImg from "../../assets/images/auth.png";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/auth";
import Spinner from "../../components/Spinner";
import Cookies from "js-cookie";
import SeoData from "../../SEO/SeoData";

const Login = () => {
    //hooks->
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { auth, setAuth, isAdmin } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const location = useLocation();

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();
    useEffect(() => {
        if (auth.token) {
            isAdmin
                ? navigate("/admin/dashboard")
                : navigate("/user/dashboard");
        }
    }, [navigate, auth, isAdmin]);
    // axios.defaults.headers.common["Authorization"] = auth.token;

    //form submission handler
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            toast(
                "The backend is starting up, please wait for a minute if the loader is visible."
            );

            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/login`,
                {
                    email,
                    password,
                }
            );
            // console.log(response);

            if (response.status === 200) {
                toast.success("Logged in Successfully!");
                setAuth({
                    ...auth,
                    user: response.data.user,
                    token: response.data.token,
                });

                Cookies.set("auth", JSON.stringify(response.data), {
                    expires: 7,
                });
                navigate(location.state || "/");
            }
        } catch (error) {
            console.error("Error:", error);
            // invalid password
            error.response?.status === 401 &&
                error.response.data?.errorType === "invalidPassword" &&
                toast.error("Wrong password!");
            //user not registered
            error.response?.status === 401 &&
                error.response.data?.errorType === "invalidUser" &&
                toast.error("User not Registered!");
            //server error
            error.response?.status === 500 &&
                toast.error(
                    "Something went wrong! Please try after sometime."
                ) &&
                navigate("/login");
        } finally {
            setIsSubmitting(false);
        }
    };

    // display content
    return (
        <>
            <SeoData
                title="Log in - Existing User"
                description="Log in with user details"
            />
            {isSubmitting ? (
                <Spinner />
            ) : (
            <div className="w-full min-h-screen bg-primary Bg flex items-center justify-center py-10 px-4">
  <div className="flex flex-col lg:flex-row bg-white shadow-lg w-full max-w-5xl rounded-lg overflow-hidden">

    {/* LEFT IMAGE SECTION */}
    <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 sm:p-10">
      <img
        src={authImg}
        alt="auth"
        className="w-full max-w-xs sm:max-w-sm md:max-w-md object-contain"
      />
    </div>

    {/* RIGHT FORM SECTION */}
    <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
      <form
        action="/login"
        method="post"
        className="w-full"
        onSubmit={handleFormSubmit}
      >
        <div className="text-base space-y-6 text-gray-700">

          {/* EMAIL */}
          <div className="relative">
            <input
              autoComplete="on"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer placeholder-transparent border-b-2 w-full h-10 text-sm focus:outline-none focus:border-blue-500"
              placeholder="Email"
              required
            />
            <label
              htmlFor="email"
              className="absolute left-0 -top-3 text-gray-600 text-xs transition-all
              peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
              peer-focus:-top-3 peer-focus:text-xs peer-focus:text-gray-600"
            >
              Email Address
            </label>
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <input
              autoComplete="off"
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer placeholder-transparent border-b-2 w-full h-10 text-sm focus:outline-none focus:border-blue-500"
              placeholder="Password"
              required
              minLength="5"
            />
            <label
              htmlFor="password"
              className="absolute left-0 -top-3 text-gray-600 text-xs transition-all
              peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
              peer-focus:-top-3 peer-focus:text-xs peer-focus:text-gray-600"
            >
              Password
            </label>

            <span
              className="absolute right-3 bottom-2 text-gray-700 cursor-pointer"
              onClick={handlePasswordToggle}
            >
              {!showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </div>

          {/* TEXT */}
          <p className="text-[10px] text-slate-500">
            By continuing, you agree to our Terms of Use & Privacy Policy.
          </p>

          {/* LOGIN BUTTON */}
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
            Log In
          </button>
        </div>
      </form>

      {/* SIGNUP BUTTON */}
      <div className="mt-6 text-center">
        <Link
          to="/register"
          className="
            block w-full
            bg-red-900 
            text-white font-semibold text-sm uppercase
            py-2 rounded-md
            shadow-md hover:shadow-lg 
            transition-all duration-300
          "
        >
          New to Gowamrit ? Create an account
        </Link>
      </div>
    </div>
  </div>
</div>

            )}
        </>
    );
};

export default Login;
