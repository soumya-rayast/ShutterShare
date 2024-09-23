const Post = require('../models/Post');
const User = require('../models/User');

const createPost = async (req, res) => {
    const authorId = req.id;
    const authorAccountType = req.authorAccountType;

    if (authorAccountType === "buyer") {
        return res.status(403).json({
            success: false, 
            message: "Forbidden: only sellers can post"
        });
    }

    const { title, author, price, image, publicId } = req.body;
    try {
        const post = new Post({ title, author, price, image, publicId, authorId });
        await post.save();
        await User.findByIdAndUpdate(authorId, {
            $push: { uploads: post._id },
        });

        return res.status(201).json({
            success: true, 
            message: "Post created successfully", 
            post
        });
    } catch (error) {
        console.error("Error creating post:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        if (posts.length === 0) {
            return res.status(404).json({ success: false, message: "No posts found" });
        }
        return res.status(200).json({ success: true, data: posts });
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const getMyPosts = async (req, res) => {
    const authorId = req.id;
    const authorAccountType = req.accountType;

    try {
        if (authorAccountType === "buyer") {
            const user = await User.findById(authorId).populate("purchased");
            const purchased = user.purchased;
            if (!purchased.length) {
                return res.status(404).json({ success: false, message: "No posts found" });
            }
            return res.status(200).json({ success: true, data: purchased });
        } else {
            const user = await User.findById(authorId).populate("uploads");
            const uploads = user.uploads;
            if (!uploads.length) {
                return res.status(404).json({ success: false, message: "No posts found" });
            }
            return res.status(200).json({ success: true, data: uploads });
        }
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        const { authorId } = post;
        await User.findByIdAndUpdate(authorId, {
            $pull: { uploads: id },
        });

        // Optionally, you could uncomment this line if you want to delete the post
        // await Post.findByIdAndDelete(id);

        return res.status(200).json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const searchPosts = async (req, res) => {
    const { search } = req.query;
    try {
        const posts = await Post.find({ title: { $regex: search, $options: 'i' } });
        if (posts.length === 0) {
            return res.status(404).json({ success: false, message: "No posts found" });
        }
        return res.status(200).json({ success: true, data: posts });
    } catch (error) {
        console.error("Error searching posts:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const addToFavourites = async (req, res) => {
    const { authorId } = req.body;
    const { postId } = req.params;
    try {
        const user = await User.findByIdAndUpdate(authorId, {
            $push: { favourites: postId },
        });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        return res.status(200).json({ success: true, message: "Post added to favourites" });
    } catch (error) {
        console.error("Error adding to favourites:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const removeFromFavourites = async (req, res) => {
    const { authorId } = req.body;
    const { postId } = req.params;
    try {
        const user = await User.findByIdAndUpdate(authorId, {
            $pull: { favourites: postId },
        });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        return res.status(200).json({ success: true, message: "Post removed from favourites" });
    } catch (error) {
        console.error("Error removing from favourites:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const getFavourites = async (req, res) => {
    const authorId = req.id;
    try {
        const user = await User.findById(authorId).populate("favourites");
        const favourites = user.favourites;
        if (!favourites.length) {
            return res.status(404).json({ success: false, message: "No favourites added" });
        }
        return res.status(200).json({ success: true, data: favourites });
    } catch (error) {
        console.error("Error fetching favourites:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { createPost, getAllPosts, getMyPosts, deletePost, searchPosts, addToFavourites, removeFromFavourites, getFavourites };
