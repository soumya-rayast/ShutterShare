import { Route, Routes, useLocation } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import SellerDashboard from "../pages/SellerDashboard"
import BuyerDashboard from "../pages/BuyerDashboard"
import gsap from 'gsap'
import { useEffect, useRef } from "react"
import { Toaster } from 'react-hot-toast'
import ProtectedRoutes from "./ProtectedRoutes"

const GSAPTransition = () => {
    const nodeRef = useRef(null);
    const location = useLocation();
    useEffect(() => {
        if (nodeRef.current) {
            gsap.fromTo(nodeRef.current, { opacity: 0 }, { opacity: 1, duration: 1 })
        }
    }, [location])
    return (
        <div ref={nodeRef}>
            <Toaster />
            <Routes location={location}>
                <Route path='/' element={<Home />} />
                <Route path='/login'
                    element={<ProtectedRoutes children={<Login />} requiresAuth={false} />} />
                <Route path='/signup' element={<ProtectedRoutes children={<Signup />} requiresAuth={false} />} /> 
                <Route path='/seller/profile' element={<ProtectedRoutes children={<SellerDashboard />}  />} />
                <Route path='/buyer/profile' element={<ProtectedRoutes children={<BuyerDashboard />} />} />
            </Routes>
        </div>
    )
}

export default GSAPTransition
