import express from "express";
import db from "../db.js";

const router = express.Router();

// FOLLOW USER
router.post("/follow", async (req, res) => {
    try {
        const { follower_id, following_id } = req.body;

        if (!follower_id || !following_id) {
            return res.status(400).json({
                message: "follower_id and following_id are required"
            });
        }

        await db.query(
            "INSERT INTO followers(follower_id, following_id) VALUES (?, ?)",
            [follower_id, following_id]
        );

        res.status(201).json({
            message: "User followed successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
});

// UNFOLLOW USER
router.delete("/unfollow", async (req, res) => {
    try {
        const { follower_id, following_id } = req.body;

        await db.query(
            "DELETE FROM followers WHERE follower_id = ? AND following_id = ?",
            [follower_id, following_id]
        );

        res.json({
            message: "User unfollowed successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
});

export default router;