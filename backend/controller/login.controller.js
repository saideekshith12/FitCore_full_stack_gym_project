import mongoose from "mongoose";
import bcrypt from "bcrypt"
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

const login = async (req, res)=>{
    const { email , password}= req.body
    if(!email || !password){
        return res.status(400).json({
            message:"All fields are required"
        })
    }
    try {
        const user= await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"Check your email"
            })
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({
            message: "Invalid email or password",
          });
        } 
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        res.cookie("token", token, {
  httpOnly: true,
  secure: false, // Set true only in production with HTTPS // 1 hour
});


        
        return res.status(200).json({
          message: "Login successful",
          token, // Return JWT if needed
          user: {
            id: user._id,
            email: user.email,  
            name: user.name,
            role: user.role,
          },
        });
    } catch (error) {
         return res.status(500).json({
      message: "Something went wrong",
    });
    }

}

export default login;