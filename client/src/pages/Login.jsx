import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { login } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import heroSection from '../assets/mheroSections.jpg';

const Login = () => {
  const dispatch = useDispatch(); // Fixed typo here
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + "/login", {
        email,
        password,
      });
      const data = res.data;
      toast.success(data.message);
      // Dispatch the login action with the received data
      dispatch(login(data)); // Fixed typo here
      navigate(`/${data.role}/profile`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="mt-20 sm:mt-3 min-h-screen flex items-center justify-center w-full relative">
      <img
        src={heroSection}
        alt="Hero Section"
        className="opacity-80 w-full h-full object-cover absolute top-0 left-0"
      />
      <div className="bg-white shadow-md rounded-3xl px-5 py-6 mx-2 w-full sm:w-[35vw] relative z-10">
        <h1 className="text-2xl font-bold text-center mb-4">Let's Connect!</h1>
        <form onSubmit={handleLogin}>
          {/* For email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email" 
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>

          {/* For password */}
          <div className="mb-4">
            <label
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>

          {/* Forgot password link */}
          <a href="#" className="text-xs flex items-center text-black justify-end">
            Forgot Password?
          </a>

          {/* Signup link */}
          <div className="flex items-center justify-end mb-4">
            <Link className="text-xs text-black" to="/signup">
              Don't have an account? <span className="underline">Signup here</span>
            </Link>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md shadow-md text-sm font-medium text-white bg-black"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
