
import post from "../models/post.model.js";
const createPost = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            message: "All fields required"
        });
    }

    try {
        const userId = req.user.id;

        const newPost = await post.create({
            title,
            content,
            author: userId
        });

        return res.status(201).json({
            message: "Post created",
            newPost
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error creating post",
            error: error.message
        });
    }
};
const getAllPosts = async (req, res) => {
    try {
        const Posts= await post.find().populate("author", userName);

        return res.status(200).json({"All posts" :Posts });
    } catch (error) {
        return res.status(500).json({
            message:"Error found",
            error: error.message
        });
    }

};
export {createPost, getAllPosts}