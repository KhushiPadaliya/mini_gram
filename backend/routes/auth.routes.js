import express from "express";
import db from "../db.js";

const router = express.Router();
router.post("/register", async(req,res)=>{
    const{username,email,password} = req.body;
    await db.query(
        "INSERT INTO users(username,email,password) VALUES(?,?,?)",
        [username,email,password]
    );
    res.json({
        message:"user registered successfully"

    });
});
router.post("/login", async(req,res)=>{
    const{email,password} = req.body;
    const[user] = await db.query("SELECT*FROM users WHERE email=? AND password=?" , [email,password]);
    if(user.length == 0){
        return res.status(401).json({
            message : "invalid email or password"
        });
    }
    res.json({
        message:"login successful",
    });
});
export default router;