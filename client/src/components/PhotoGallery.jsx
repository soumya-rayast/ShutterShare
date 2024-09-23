import { FaHeart, FaShoppingCart } from "react-icons/fa"
import ImageCard from "./ImageCard"

const PhotoGallery = () => {
  return (
    <div className="my-20 bg-white flex flex-col justify-center items-center">
      <h3 className="text-3xl font-semibold my-14">Photos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-20">
        {/* Image Card */}
        <ImageCard 
        title="the Mountain"
        author="soumya"
        img='https://images.pexels.com/photos/28120193/pexels-photo-28120193/free-photo-of-the-golden-raspberries-in-sunrise.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        price={1}
        icon1={<FaShoppingCart className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />}
        icon2={<FaHeart className="text-2xl text-red-600 cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />}
        />
        <ImageCard 
        title="the Mountain"
        author="soumya"
        img='https://images.pexels.com/photos/28120118/pexels-photo-28120118/free-photo-of-o-quy-h-pass-in-sapa-vietnam.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        price={1}
        icon1={<FaShoppingCart className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />}
        icon2={<FaHeart className="text-2xl text-red-600 cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />}
        />
        <ImageCard 
        title="the Mountain"
        author="soumya"
        img='https://images.pexels.com/photos/28120118/pexels-photo-28120118/free-photo-of-o-quy-h-pass-in-sapa-vietnam.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        price={1}
        icon1={<FaShoppingCart className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />}
        icon2={<FaHeart className="text-2xl text-red-600 cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />}
        />
        <ImageCard 
        title="the Mountain"
        author="soumya"
        img='https://images.pexels.com/photos/28120118/pexels-photo-28120118/free-photo-of-o-quy-h-pass-in-sapa-vietnam.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        price={1}
        icon1={<FaShoppingCart className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />}
        icon2={<FaHeart className="text-2xl text-red-600 cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />}
        />
        <ImageCard 
        title="the Mountain"
        author="soumya"
        img='https://images.pexels.com/photos/28120118/pexels-photo-28120118/free-photo-of-o-quy-h-pass-in-sapa-vietnam.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        price={1}
        icon1={<FaShoppingCart className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />}
        icon2={<FaHeart className="text-2xl text-red-600 cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />}
        />
        <ImageCard 
        title="the Mountain"
        author="soumya"
        img='https://images.pexels.com/photos/28120118/pexels-photo-28120118/free-photo-of-o-quy-h-pass-in-sapa-vietnam.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        price={1}
        icon1={<FaShoppingCart className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />}
        icon2={<FaHeart className="text-2xl text-red-600 cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />}
        />
      </div>
    </div>
  )
}

export default PhotoGallery
