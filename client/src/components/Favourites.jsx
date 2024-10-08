import React, { useEffect, useState } from 'react';
import DashboardHeader from './DashboardHeader';
import axios from 'axios';
import toast from 'react-hot-toast';
import ImageCard from './ImageCard';
import { IoRemoveCircle } from "react-icons/io5";
const Favourites = () => {

  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts/favourites`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        });
        setFavourites(response.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching favourites");
      }
    };

    fetchFavourites();
  }, []);

  const removeFavourite = async (postId) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/post/removeFromFavourites/${postId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      toast.success(response.data.message);
      setFavourites((prevFavourites) => prevFavourites.filter(fav => fav._id !== postId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error removing favourite");
    }
  };

  return (
    <div>
      <DashboardHeader />
      <h1 className='text-2xl font-semibold mb-5 mr-8 ml-8'>Your Favourites</h1>
      <div className="ml-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mr-8">
        {favourites.length === 0 ? (
          <p>No favourites added yet.</p>
        ) : (
          favourites.map(({ _id, title, image, author, price }) => (
            <ImageCard
              key={_id}
              id={_id}
              img={image}
              title={title}
              price={price}
              author={author}
              icon1={<button onClick={() => removeFavourite(_id)} className="text-red-500 hover:text-red-700"><IoRemoveCircle className='text-2xl' />
              </button>}
              icon2={null}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Favourites;
