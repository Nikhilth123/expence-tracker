import express from 'express'
import {handlelogin,handlesignup,handlelogout} from '../controller/auth'
const router=express.Router();
router.post('/login',handlelogin);
router.post('/signup',handlesignup);
router.get('/logout',handlelogout);