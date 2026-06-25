// import express from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import db from "../db.js";

// const router = express.Router();

// router.post("/register", async(req,res)=>{
//     try{
//     const{username,email,password} = req.body;

//     if(!username || !email || !password){
//         return res.status(400).json({
//             message:"all fields are required"
//         })
//     }
      
//     const hashedPassword = await bcrypt.hash(password,10);
//     await db.query(
//         "INSERT INTO users(username,email,password) VALUES(?,?,?)",
//         [username,email,hashedPassword]
//     );
//    res.status(201).json({
//     message:"user register successfully"
//    });

// } catch(error){
//     res.status(500).json({
//         message:"something went wrong",
//         error:error.message
//     })
// }
// })
// router.post("/login", async(req,res)=>{
//     const{email,password} = req.body;
//     if(!email || !password){
//         return res.status(400).json({
//             message:"email and password are required"
//         })
//     }
//     const[users] = await db.query("SELECT*FROM users WHERE email=?", [email]);
//     if(user.length == 0){
//         return res.status(401).json({
//             message : "invalid email or password"
//         });
//     }
//     const user = users[0]
//     const ispasswordCorrect = await bcrypt.compare(
//         password,
//         user.password_hash
//     )
//     if(!ispasswordCorrect){
//         return res.status(401).json({
//             message:"invalid email or password"
//         })
//     }
//     const token = jwt.sign({ id:user.id , email:user.email},process.env.JWT_SECRET, {expiresIn : "1d"})
//     res.json({
//         message:"login successful",
//         token : token,
//         user:{
//             id: user.id,
//             username : user.username,
//             email: user.email   
//         }
//     });
// });

// export default router;





import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            "INSERT INTO users(username, email, password_hash) VALUES (?, ?, ?)",
            [username, email, hashedPassword]
        );

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const [users] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = users[0];
        console.log(user);

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
});

export default router;