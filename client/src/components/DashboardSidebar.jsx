import { useDispatch, useSelector } from "react-redux"
import { IoMdLogOut } from "react-icons/io"
import { Link, useLocation ,useNavigate } from "react-router-dom"
import { IoMdPhotos } from "react-icons/io";
import { SiGoogleanalytics } from "react-icons/si";
import { IoIosHome } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { setTab } from "../../src/store/slices/navSlice";
import { logout, login } from "../../src/store/slices/authSlice";
import axios from 'axios'
import toast from 'react-hot-toast';


const DashboardSidebar = () => {
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const sidebar = useSelector((state) => state.nav.sidebar);
    const tab = useSelector((state) => state.nav.tab);
    const author = useSelector((state) => state.auth.author);

    const switchProfile = async () => {
        const res = await axios.get(import.meta.env.VITE_API_URL + "/switch", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        const data = await res.data;
        toast.success(data.message)
        dispatch(login(data))
        navigate(`/${data.role}/profile`)
    }
    return (
        <nav
            className={
                `fixed z-10 ${!sidebar
                    ? "-translate-x-[500px] sm:translate-x-0" :
                    'translate-x-0'
                } ease-in-out
                flex text-lg font-semibold sm:static bg-white shadow-lg flex-col gap-2 w-fit min-h-screen p-3 list-none justify-between items-center`}>
            <div>
                <div className="bg-black my-5 w-fit rounded-full py-4 px-6 text-white">
                    {author.charAt(0).toUpperCase()}
                </div>
                {/* List items */}
                <div className="flex flex-col gap-2">
                    {pathname === '/seller/profile' ? (
                        <li className={`w-full rounded-lg px-2 hover:bg-black hover:text-white  cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${tab === "photos-management" && 'bg-black text-white'}`}
                            onClick={() => dispatch(setTab('photos-management'))}>
                            <IoMdPhotos /> Photo Management</li>
                    ) : (
                        <li className={`w-full rounded-lg px-2 hover:bg-black hover:text-white  cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${tab === "photos-purchased" && 'bg-black text-white'}`} onClick={() => dispatch(setTab('photos-purchased'))}>
                            <IoMdPhotos /> Photos Purchased</li>
                    )}
                    <li className={`w-full rounded-lg px-2 hover:bg-black hover:text-white  cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${tab === "analytics" && 'bg-black text-white'}`} onClick={() => dispatch(setTab('analytics'))} >
                        <SiGoogleanalytics />
                        Analytics
                    </li>
                    <li className={`w-full rounded-lg px-2 hover:bg-black hover:text-white  cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${tab === "orders" && 'bg-black text-white'}`}
                        onClick={() => dispatch(setTab('orders'))} >
                        <FaCartShopping />
                        Orders
                    </li>
                    <li className={`w-full rounded-lg px-2 hover:bg-black hover:text-white  cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${tab === "favourites" && 'bg-black text-white'}`}
                        onClick={() => dispatch(setTab('favourites'))}>
                        <FaHeart />
                        Favourites
                    </li>
                    <Link to='/' className="w-full rounded-lg px-2 hover:bg-black hover:text-white  cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center">
                        <IoIosHome />
                        Home
                    </Link>
                    <button
                        className="w-full px-2 gap-2 border-b-2 border-black text-center uppercase text-sm py-2
                         hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300"
                        onClick={switchProfile}>
                        Switch to {pathname == '/seller/profile' ? "buyer" : "seller"}</button>
                </div>
            </div>
            {/* LogOut Button */}
            <Link to='/login' className="w-full rounded-lg px-2 hover:bg-black hover:text-white  cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center" onClick={() => dispatch(logout())}>
                <IoMdLogOut />
                Logout
            </Link>
        </nav>
    )
}

export default DashboardSidebar