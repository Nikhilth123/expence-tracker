import express, { Application, urlencoded } from 'express'
import connectDB from './config/db';
import auth from './router/auth'
import transaction from './router/transaction'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
dotenv.config();
const app: Application = express();
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
connectDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use('/api/user', auth);
app.use('/api/transaction', transaction);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('server is running on port ' + PORT);
})
