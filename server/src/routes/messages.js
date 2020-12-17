import express from "express";
import { saveMessage,getAllMessages } from "../controllers/messages";
import { checkEmail, checkPassword } from "../helper/validation";
import verifyToken from "../middlewares/auth";

const router = express.Router();

router
    .post('/saveMessage', checkEmail, saveMessage )
    .get('/', verifyToken, getAllMessages);

export default router;    
 