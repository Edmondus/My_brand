import express from "express";
import  {getAllArticles,createArticle,getOneArticle, deletArticle, updateArticle}  from "../controllers/articles";

const router = express.Router();

router
    .get('/', getAllArticles)
    .get('/:_id',getOneArticle)
    .post('/saveArticle', createArticle)
    .put('/updateArticle/:_id', updateArticle)
    .delete('/deleteArticle/:_id', deletArticle);
    

export default router;    
