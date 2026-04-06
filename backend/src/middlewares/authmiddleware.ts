import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request,Response,NextFunction } from "express";

dotenv.config();

interface JwtPayload {
  id: string;
}
export interface Authrequest extends Request {
  user?: any;
  cookies:any;
}
const protect = (req:Authrequest, res:Response, next:NextFunction) => {
 const token=req.cookies.token;
 
 if(!token) return res.status(401).json({ msg: "No token provided" });
    try {
     const decoded = jwt.verify(token, process.env.SECRETKEY!) as JwtPayload;
req.user = decoded;
   
      next();
    } 
    catch (err) {
      return res.status(401).json({ msg: "Invalid token" });
    }
};

export default protect;