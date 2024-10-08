import { FaHeart, FaShoppingCart } from "react-icons/fa";
import ImageCard from "./ImageCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAllPosts } from "../../store/slices/postSlice";
import { useEffect } from "react";
import toast from "react-hot-toast"

const PhotoGallery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.posts.allPosts);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const getAllImages = async () => {
    if (posts.length > 0) return;
    const res = await axios.get(import.meta.env.VITE_API_URL + '/post/getAll');
    const { data } = await res.data;
    dispatch(setAllPosts(data));
  };

  const purchaseImage = async (price, id, postUrl, author, title) => {
    if (!isAuthenticated) {
      toast.error("Please login to purchase asset")
      navigate('/login');
      return;
    }
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + "/payment/generate",
        {
          price,
        }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        withCredentials: true,
      }
      );
      const { data } = await res.data;
      handlePaymentVerify(data, id, postUrl, author, title, price)
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const handlePaymentVerify = async (data, id, postUrl, author, title, price) => {
    const options = {
      key: import.meta.env.RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Soumya Rayast",
      order_id: data.id,
      theme: {
        color: "#5f63b8"
      },
      handler: async (response) => {
        try {
          const res = await axios.post(import.meta.env.VITE_API_URL + "/payment/verify",
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              postId: id,
              postUrl,
              author,
              title,
              price
            },
            {
              headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            }
          )
          const data = res.data;
          toast.success(data.message)
        } catch (error) {
          toast.error(error.response.data.message)
        }
      }
    }
    const razorpayWindow = new window.Razorpay(options)
    razorpayWindow.open()
  }


  const AddToFavourites = async (postId) => {
    if (!isAuthenticated) {
      toast.error("Please login to add to favourites");
      navigate('/login');
      return;
    }
    try {
      const res = await axios.put(import.meta.env.VITE_API_URL + `/post/addToFavourites/${postId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }, 
      });
      const data = res.data;
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding to favourites');
    }
  };
  useEffect(() => {
    getAllImages();
  }, []);

  return (
    <div className=" bg-[#F4FBFD] flex flex-col justify-center items-center">
      <h3 className="text-3xl font-semibold my-14 text-[#012641]">Photos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-20 mx-1">
        {posts?.map(({ _id, title, image, price, author }) => (
          <ImageCard
            key={_id}
            title={title}
            author={author || "Unknown"}
            img={image || title}
            price={price || 0}
            icon2={<FaHeart onClick={()=>AddToFavourites(_id)} className="text-2xl text-red-600 cursor-pointer hover:scale-110 transition-all ease-linear duration-300 " />}
            icon1={<FaShoppingCart title="Cart" onClick={() => purchaseImage(price, _id, image, author, title)} className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300 " />}
          />
        ))}
      </div>
    </div>
  );
};
export default PhotoGallery; 