<img src="/pngwing.com.png" alt="logo" className="w-[50px] p-2" />
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { login, logout } from '../../store/slices/authSlice';
import { useEffect } from "react";
import toast from 'react-hot-toast';
import logo from '../assets/shutter-camera.png'
const Navbar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);

  const refreshToken = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/refresh`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("refreshToken")}`
        }
      });
      const data = res.data;
      dispatch(login(data));
    } catch (error) {
      dispatch(logout());
      toast.error("Session expired. Please log in again.");
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshToken();
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [dispatch]);

  return (
    <nav className={`flex flex-col sm:flex-row justify-between items-start z-30 sm:items-center
      ${pathname === '/seller/profile' || pathname === '/buyer/profile' ? "hidden" : "fixed"}
      px-5 py-5 top-0 left-0 right-0 shadow-md gap-1 sm:gap-0 bg-white`}>
      {/* Logo and site name */}
      <div className="flex items-center">
        <img src={logo} alt="" className="w-[50px] h-[50px]" />
        <Link to='/' className="font-bold text-2xl">ShutterShare</Link>
      </div>
      {/* List of other tabs */}
      <ul className="flex gap-5 text-lg font-semibold text-gray-400 ml-5 sm:ml-0">
        <Link to='/about' aria-label="About" className="hover:text-black cursor-pointer sm:p-2">About</Link>
        <Link to='/contact' aria-label="Contact" className="hover:text-black cursor-pointer sm:p-2">Contact</Link>
        {
          !isAuthenticated ? (
            <>
              <Link to='/login' aria-label="Login" className="hover:text-black cursor-pointer sm:p-2">Login</Link>
              <Link to='/signup' aria-label="Signup" className="hover:text-black cursor-pointer sm:p-2">Signup</Link>
            </>
          ) : (
            <Link to={`/${role}/profile`} aria-label="Profile" className="hover:text-black cursor-pointer sm:p-2">Profile</Link>
          )
        }
      </ul>
    </nav>
  );
};

export default Navbar;
