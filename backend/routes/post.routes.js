
import express from "express";
import db from "../db.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// CREATE POST
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { user_id, caption } = req.body;

        if (!user_id || !caption) {
            return res.status(400).json({
                message: "user_id and caption are required"
            });
        }

        await db.query(
            "INSERT INTO posts(user_id, caption) VALUES (?, ?)",
            [user_id, caption]
        );

        res.status(201).json({
            message: "Post created successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
    try {
        const [posts] = await db.query(
            `SELECT posts.id, posts.caption, posts.created_at, users.username
             FROM posts
             JOIN users ON posts.user_id = users.id
             ORDER BY posts.id DESC`
        );

        res.json({
            message: "Posts fetched successfully",
            posts: posts
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
});

    // DELETE POST
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(
            "DELETE FROM posts WHERE id = ?",
            [id]
        );

        res.json({
            message: "Post deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
});

router.post("/:id/like", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({
                message: "user_id is required"
            });
        }

        await db.query(
            "INSERT INTO likes(user_id, post_id) VALUES (?, ?)",
            [user_id, id]
        );

        res.status(201).json({
            message: "Post liked successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
});

router.delete("/:id/like",authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({
                message: "user_id is required"
            });
        }

        await db.query(
            "DELETE FROM likes WHERE user_id = ? AND post_id = ?",
            [user_id, id]
        );

        res.json({
            message: "Post unliked successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
});

router.post("/:id/comments", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, comment } = req.body;

        if (!user_id || !comment) {
            return res.status(400).json({
                message: "user_id and comment are required"
            });
        }

        await db.query(
            "INSERT INTO comments(user_id, post_id, comment) VALUES (?, ?, ?)",
            [user_id, id, comment]
        );

        res.status(201).json({
            message: "Comment added successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
});


export default router;