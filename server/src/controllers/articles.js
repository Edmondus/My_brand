import Article from "../models/Articles";
export const getAllArticles = async (req, res, next) => {
    try {
        const articles = await Article.find();

        return res.status(200).json({
            success: true,
            status: 200,
            count: articles.length,
            data: articles
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            status: 500,
            error: 'Server error'
        });
    }
}

export const createArticle = async (req, res, next) => {
        const newArticle = new Article (
            {
                title: req.body.title,
                description: req.body.description,
                picURL: req.body.picURL,
                content: req.body.content,
                date: ""
            }
        )
        newArticle.save(function(err, prod){
            if(!err){
                return res.status(201).json({
                    success: true,
                    status: 201,
                    message: 'Article created successfully',
                    data: prod
                });
            } else{
                return res.status(500).json({
                    success: false,
                    status: 500,
                    error: 'Server error',
                    data: err
                });
            }
        });
        
}

export const getOneArticle = async (req, res, next) => {
    try {
        const article = await Article.findById(req.params._id);

        if(!article) {
            return res.status(404).json({
                success: false,
                error: 'Article not found'
            });
        }

        return res.status(200).json({
            success: true,
            status: 200,
            data: article
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            status: 500,
            error: 'Server error'
        });
    }
}

export const deletArticle = async (req, res, next) => {
   
        const article = await Article.findById(req.params._id);

        if(!article) {
            return res.status(404).json({
                success: false,
                error: 'Article not found'
            });
        }

        await Article.deleteOne({_id:req.params._id},(err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: 'Server Error'
                });
            } else 
            
            return res.status(200).json({
                success: true,
                message: 'Article deleted successfully',
                data: article
            });
        });
}

export const updateArticle = async (req,res,next) => {

const updatedArticle = await Article.findById(req.params._id);
if (!updatedArticle) {
    return res.status(404).json(
        {success: false,
        error:'Article not found'
    }
    );
} else {
    await Article.update(
        {_id: req.params._id},
        {
            title: req.body.title,
            description: req.body.description,
            picURL: req.body.picURL,
            content: req.body.content,
            date: ""
        }); 
        return res.status(200).json({
            success: true,
            message: 'Article updated successfully',
        });
}


}
