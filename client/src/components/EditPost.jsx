import React, { useState } from 'react'
import axios from "axios"
import toast from "react-hot-toast"
const EditPost = ({ post, closeModal }) => {
    const [title, setTitle] = useState(post.title);
    const [price, setPrice] = useState(post.price);
  
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (title.trim() === "") {
          toast.error("Title cannot be empty");
          return;
        }
        if (price <= 0) {
          toast.error("Price must be greater than 0");
          return;
        }

        try {
          const res = await axios.put(
            `${import.meta.env.VITE_API_URL}/post/${post._id}`,
            { title, price },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
              },
            }
          );
          toast.success(res.data.message);
          closeModal();
        } catch (error) {
          toast.error(error.response?.data?.message || "Error updating post");
        }
      };
      
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-5">
          <h2 className="text-xl mb-4">Edit Image</h2>
          <form onSubmit={handleEditSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="mr-2 bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

export default EditPost
