import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import followRoutes from "./routes/follow.routes.js";

import postRoutes from "./routes/post.routes.js";

 dotenv.config();

 const app = express();

 app.use(cors())
 app.use(express.json());

 app.get("/",(req,res)=>{
        res.send("mini-gram backend is running");

 })
 app.use("/api/auth",authRoutes); 
 app.use("/api/posts", postRoutes);
 app.use("/api/users", followRoutes);

//  const PORT = process.env.PORT||3000;
//     app.listen(PORT, ()=>{
//         console.log(`server is running on port ${PORT}`);
//     });

export default app;

// greet() 
// function greet(){
//     console.log("helloe");
// }

 