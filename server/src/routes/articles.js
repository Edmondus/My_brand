import express from "express";
import  {getAllArticles,createArticle,getOneArticle, deletArticle, updateArticle}  from "../controllers/articles";
import verifyToken from "../middlewares/auth";

const router = express.Router();

router
    .get('/', getAllArticles)
    .get('/:_id',getOneArticle)
    .post('/saveArticle',verifyToken, createArticle)
    .put('/updateArticle/:_id',verifyToken, updateArticle)
    .delete('/deleteArticle/:_id',verifyToken, deletArticle);
    

export default router;    
