import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, process.env.SECRET_KEY , (err) => {
            if(err){
                return res.status(401).json({
                    status: 401,
                    message: 'unauthorized, token is not valid',
                  });
            }else{
                next();
            }
        });
        
    }else {
        return res.status(401).json({
            status: 401,
            message: 'unauthorized',
          });
    }
}

export default verifyToken;