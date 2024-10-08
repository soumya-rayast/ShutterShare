const Post = require("../models/Post");
const User = require("../models/User");
// for create Post
const createPost = async (req, res) => {
  const authorId = req.id;
  const authorAccountType = req.accountType;

  if (authorAccountType == "buyer") {
    return res
      .status(403)
      .json({ success: false, message: "Forbidden, only sellers can post" });
  }

  const { title, author, price, image, publicId } = req.body;

  try {
    const post = new Post({ title, author, price, image, publicId, authorId });
    await post.save();

    await User.findByIdAndUpdate(authorId, {
      $push: { uploads: post._id },
    });

    return res
      .status(201)
      .json({ success: true, message: "Post created successfully", post });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
// for getting all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    if (posts.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "No posts found" });

    return res.status(200).json({ success: true, data: posts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
// getting seller post
const getMyPosts = async (req, res) => {
  const authorId = req.id;
  const authorAccountType = req.accountType;
  try {
    if (authorAccountType === "buyer") {
      const { purchased } = await User.findById(authorId).populate("purchased");
      console.log(purchased);
      if (!purchased)
        return res
          .status(404)
          .json({ success: false, message: "No posts found" });

      return res.status(200).json({ success: true, data: purchased });
    } else {
      const { uploads } = await User.findById(authorId).populate("uploads");
      if (!uploads)
        return res
          .status(404)
          .json({ success: false, message: "No posts found" });
      return res.status(200).json({ success: true, data: uploads });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
// for delete Post in buyer section
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found " });

    const { authorId } = post;
    await User.findByIdAndUpdate(authorId, {
      $pull: { uploads: id },
    });
    return res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
// for search post
const searchPosts = async (req, res) => {
  const { search } = req.query;
  try {
    const posts = await Post.find({ title: { $regex: search, $options: "i" } });
    if (posts.length == 0)
      return res.status(404).json({ success: false, message: "No post found" });

    return res.status(200).json({ success: false, data: posts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
// add to Favourites in user Profile
const addToFavourites = async (req, res) => {
  const { postId } = req.params;
  const userId = req.id; 

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if the post is already in favourites
    if (user.favourites.includes(postId)) {
      return res.status(400).json({ success: false, message: "Post already in favourites" });
    }

    // Add the post to the user's favourites
    user.favourites.push(postId);
    await user.save();

    return res.status(200).json({ success: true, message: "Post added to favourites" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// for remove post from favourites section 
const removeFromFavourites = async (req, res) => {
  const userId = req.id; 
  const { postId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { favourites: postId },
      },
      { new: true } 
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, message: "Post removed from favourites" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// For fetching Favourites
const getFavourites = async (req, res) => {
  const userId = req.id; 
  try {
    const user = await User.findById(userId).populate("favourites");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    const { favourites } = user;
    if (!favourites || favourites.length === 0) {
      return res.status(404).json({ success: false, message: "No favourites added" });
    }

    return res.status(200).json({ success: true, data: favourites });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// getting Posts By date Range 
const getPostsByDateRange = async (req, res) => {
  const authorId = req.id;
  const authorAccountType = req.accountType;
  let data;

  try {
    if (authorAccountType == "buyer") {
      const { purchased } = await User.findById(authorId).populate("purchased");
      data = purchased;
    } else {
      const { uploads } = await User.findById(authorId).populate("uploads");
      data = uploads;
    }

    console.log(data)

    if (!data)
      return res
        .status(500)
        .json({ success: false, message: "No posts found" });

    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

    const postsThisYear = data.filter(
      (post) => new Date(post.createdAt) >= startOfYear
    );
    const postsThisMonth = data.filter(
      (post) => new Date(post.createdAt) >= startOfMonth
    );
    const postsThisWeek = data.filter(
      (post) => new Date(post.createdAt) >= startOfWeek
    );

    return res.status(200).json({
      success: true,
      data: {
        tillNow: data,
        thisYear: postsThisYear,
        thisMonth: postsThisMonth,
        thisWeek: postsThisWeek,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
// For update post 
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, price } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { title, price },
      { new: true }
    );
    if (!post) {
      return res.status({ success: false, message: error.message })
    }
    return res.status(200).json({ success: true, message: "Post Updated Successfully", data: post })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}
module.exports = {
  createPost,
  getAllPosts,
  getMyPosts,
  deletePost,
  searchPosts,
  addToFavourites,
  removeFromFavourites,
  getFavourites,
  getPostsByDateRange,
  updatePost
};