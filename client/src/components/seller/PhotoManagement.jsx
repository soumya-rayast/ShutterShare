import React, { useEffect,useState } from "react";
import DashboardHeader from "../DashboardHeader";
import ImageAdd from "../ImageAdd";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { logout } from "../../../store/slices/authSlice";
import { setMyPosts } from "../../../store/slices/postSlice";
import axios from "axios";
import ImageCard from "../ImageCard";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import EditPost from "../EditPost";

const PhotoManagement = () => {
  const posts = useSelector((state) => state.posts.myPosts);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  const getMyPosts = async () => {
    try {
      if (posts.length > 0) return;
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/post/myPosts",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      const { data } = await res.data;
      dispatch(setMyPosts(data));
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(logout());
    }
  };
  const handleDelete = async (postId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/post/delete/${postId}`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
        }
      );
      toast.success(res.data.message);
      dispatch(setMyPosts(posts.filter((post) => post._id !== postId)));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting post');
    }
  };
  const handleEdit = (post) =>{
    setCurrentPost(post);
    setIsEditing(true);
  }
  const  closeModal = () =>{
    setIsEditing(false);
    setCurrentPost(null)
  }
  useEffect(() => {
    getMyPosts();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row">
      <div>
        {/* Dashboard header will be here */}
        <DashboardHeader />
        {/* Image add component will be here */}
        <ImageAdd />
      </div>

      {/* Section where all the images are displayed */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5  bg-transparent border border-black sm:bg-white p-5 w-[90vw] sm:w-[55vw] sm:h-[90vh] sm:overflow-y-scroll rounded-lg mx-auto sm:mx-2 ">
        {posts.length &&
          posts?.map(({ _id, title, image, author, price }) => {
            return (
              <ImageCard
                key={_id}
                id={_id}
                title={title}
                img={image}
                author={author}
                price={price}
                icon1={
                  <BiSolidMessageSquareEdit
                  onClick={()=>handleEdit({ _id, title, image, author, price })}
                    title="Edit"
                    className="text-3xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                  />
                }
                icon2={
                  <MdDelete onClick={()=>handleDelete(_id)}
                    title="Delete"
                    className="text-3xl text-red-500 cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                  />
                }
              />
            );
          })}
      </div>
      {
        isEditing &  (
          <EditPost post={currentPost} closeModal={closeModal}/>
        )
      }
    </div>
  );
};

export default PhotoManagement;
