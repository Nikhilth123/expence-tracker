import express, { Application,urlencoded } from 'express'
import connectDB from './config/db';

import cors from 'cors'
const app:Application=express();
app.use(express.json());
app.use(cors({
     origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
connectDB()
.then(()=>{
  console.log("Database connected successfully");
})
.catch((error)=>{
  console.error("Database connection failed:",error);
});
app.use(urlencoded({extended:true}));
app.listen(3000,()=>{
    console.log('server is running on port 3000');
})
