import { User } from "../model/user";
import {Request,Response} from 'express'
 import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Authrequest } from "../middlewares/authmiddleware";
    dotenv.config();
export const handlelogin=async(req:Request,res:Response)=>{
      const {email,password}=req.body;
     
    if(!email||!password){
       return res.status(400).json({msg:"Enter all fields with valid credentials"});
    }
    
    

    const user= await User.findOne({email});
   
    if(!user){
        return res.status(400).json({msg:"User not found"});
    }
  
  

    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if(!isMatch) {
        return res.status(400).json({msg:"Invalid Password"});
    }
    
    const token:string = jwt.sign({id:user._id},process.env.SECRETKEY as string,{expiresIn:"24h"});
    const {password:pw,...userWithoutPassword} = user.toObject();
   
    res.status(200).cookie("token", token, {
      httpOnly: true,   
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax" ,
      maxAge: 24 * 60 * 60 * 1000, 
    }).json({user:userWithoutPassword, msg: "Login successful" });
}
export const handlesignup=async(req:Request,res:Response)=>{

     const {name,email,password}=req.body;
    if(!name||!email||!password){   
       return res.status(400).json({msg:"Enter all fields with valid credentials"});
    }
   
     if (password.length < 6){
      
    return res.status(400).json({ msg: "Password must be at least 6 characters long" });
  }

     const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ msg: "User already exists" });
  }

  const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newuser=new User({
        name:name,
        email:email,
        password:hashedPassword,
    })
    await newuser.save();
    const {password:pw,...userWithoutPassword} = newuser.toObject();    
    res.status(201).json({user:userWithoutPassword, msg: "User created successfully" });

}
export const handlelogout=async(req:Request,res:Response)=>{
   try {res.clearCookie("token",{
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",   
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax" 
  });
    return res.status(200).json({msg:"User logged out successfully"});
}catch(err){
  
    return res.status(500).json({ msg: "Logout failed", error: err });
}
}

export const getuserprofile=async(req:Authrequest,res:Response)=>{
  if(!req.user){
    return res.status(401).json({msg:"User not authenticated"});
  }
  try{
    const user= await User.findById(req.user.id).select("-password");
    if(!user){
      return res.status(404).json({msg:"User not found"});
    } 
    return res.status(200).json({user});
  }catch(err){
    return res.status(500).json({msg:"Internal server error",error:err});
  } 
}