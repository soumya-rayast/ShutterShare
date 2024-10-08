import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import heroSection from '../assets/mheroSections.jpg';

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("buyer");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + "/signup", {
        username,
        email,
        password,
        accountType,
      });
      const data = await res.data;
      if (data.success) {
        setUsername("");
        setEmail("");
        setPassword("");
        setAccountType("");
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="mt-20 sm:mt-10 min-h-screen flex items-center justify-center w-full relative ">
      <img
        src={heroSection}
        alt="Hero Section"
        className="opacity-80 w-full h-full object-cover absolute top-0 left-0"
      />
      <div className="bg-white shadow-md rounded-3xl px-5 py-6 mx-2 w-full sm:w-[35vw] relative z-10">
        <h1 className="text-2xl font-bold text-center mb-4">Let's Connect!</h1>
        <form onSubmit={handleSignup}>
          {/* For username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>

          {/* For email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="xyz@gmail.com"
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

          {/* For account selection */}
          <div className="mb-4">
            <label
              htmlFor="accountType"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Your Accont Type
            </label>
            <select
              onChange={(e) => setAccountType(e.target.value)}
              className="shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          {/* Login with account */}
          <div className="flex items-center justify-end mb-4">
            <Link className="text-xs text-black " to="/login">
              Already have account? <span className="underline">Login here</span>
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md shadow-md text-sm font-medium text-white bg-black "
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
