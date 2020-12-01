import express from "express";
import { saveMessage,getAllMessages } from "../controllers/messages";

const router = express.Router();

router
    .post('/saveMessage', saveMessage )
    .get('/',getAllMessages);

export default router;    
