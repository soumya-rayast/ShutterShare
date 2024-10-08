import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { login, logout } from '../../store/slices/authSlice';
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import logo from '../assets/shutter-camera.png';
import { IoIosSearch } from "react-icons/io";
import { setAllPosts } from '../../store/slices/postSlice';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Navbar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const role = useSelector((state) => state.auth.role);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

  const handleSearch = async (e) => {
    try {
      const search = e.target.value;
      const res = await axios.get(import.meta.env.VITE_API_URL + `/post/search?search=${search}`);
      const { data } = await res.data;
      dispatch(setAllPosts(data));
    } catch (error) {
      console.log(error);
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
    <>
      <nav className={`flex flex-col sm:flex-row justify-between items-start z-30 sm:items-center 
      ${pathname === '/seller/profile' || pathname === '/buyer/profile' ? "hidden" : "fixed"}
      px-5 py-5 top-0 left-0 right-0 text-white shadow-md gap-1 sm:gap-0 bg-[#012641]`}>
        
        {/* Logo and site name */}
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-[40px] h-[40px]" />
            <Link to='/' className="font-bold text-2xl">ShutterShare</Link>
          </div>
          
          {/* Search bar - Hidden on mobile */}
          <form className="flex hidden justify-center items-center ">
            <input
              type="search"
              id="search"
              name="search"
              className="py-2 px-3 w-[60vw] sm:w-[30vw] text-xl sm:text-2xl mx-auto outline-none border-b-2 "
              placeholder="Search your asset..."
              onChange={(e) => handleSearch(e)}
            />
            <IoIosSearch className="text-3xl sm:text-5xl text-gray-400 -ml-10" />
          </form>

          {/* Desktop menu links */}
          <ul className="md:flex gap-5 text-lg font-semibold text-white ml-5 sm:ml-0 hidden">
            <Link to='/about' aria-label="About" className=" cursor-pointer sm:p-2">About</Link>
            <Link to='/contact' aria-label="Contact" className=" cursor-pointer sm:p-2">Contact</Link>
            {!isAuthenticated ? (
              <>
                <Link to='/login' aria-label="Login" className=" cursor-pointer sm:p-2">Login</Link>
                <Link to='/signup' aria-label="Signup" className=" cursor-pointer sm:p-2">Signup</Link>
              </>
            ) : (
              <Link to={`/${role}/profile`} aria-label="Profile" className=" cursor-pointer sm:p-2">Profile</Link>
            )}
          </ul>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-3xl">
              {isMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
            </button>
          </div>
        </div>

        {/* Mobile menu - visible when the menu button is clicked */}
        {isMenuOpen && (
          <ul className="flex flex-col gap-5 text-lg font-semibold text-white bg-[#012641] w-full mt-3 p-5 absolute top-16 left-0 shadow-lg">
            <Link to='/about' aria-label="About" className="hover:text-black cursor-pointer sm:p-2" onClick={toggleMenu}>About</Link>
            <Link to='/contact' aria-label="Contact" className="hover:text-black cursor-pointer sm:p-2" onClick={toggleMenu}>Contact</Link>
            {!isAuthenticated ? (
              <>
                <Link to='/login' aria-label="Login" className="hover:text-black cursor-pointer sm:p-2" onClick={toggleMenu}>Login</Link>
                <Link to='/signup' aria-label="Signup" className="hover:text-black cursor-pointer sm:p-2" onClick={toggleMenu}>Signup</Link>
              </>
            ) : (
              <Link to={`/${role}/profile`} aria-label="Profile" className="hover:text-black cursor-pointer sm:p-2" onClick={toggleMenu}>Profile</Link>
            )}
          </ul>
        )}
      </nav>
    </>
  );
};

export default Navbar;
