import express from "express";
import { loginUser, signUp } from "../controllers/user";
import { checkEmail, checkName, checkPassword } from "../helper/validation";

const router = express.Router();

router
    .post('/signup', checkName,checkEmail, checkPassword, signUp)
    .post('/loginuser',loginUser);
    

export default router;    
