import express, { Application,urlencoded } from 'express'
import connectDB from './config/db';
import auth from './router/auth'
import transaction from './router/transaction'
import cors from 'cors'
import cookieParser from 'cookie-parser'
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
app.use(cookieParser());
app.use(urlencoded({extended:true}));
app.use('/api/user',auth);
app.use('/api/transation',transaction);
app.listen(3000,()=>{
    console.log('server is running on port 3000');
})
