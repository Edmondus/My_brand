import express from "express";
import { loginUser, signUp } from "../controllers/user";

const router = express.Router();

router
    .post('/signup',signUp)
    .post('/loginuser',loginUser);
    

export default router;    
