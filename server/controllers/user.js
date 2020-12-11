import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

// export const login = (req, res) => {
// const user= {
//     username: 'Edmond',
//     email: 'ndedmondus97@gmail.com'
//     }

//     jwt.sign(user, 'secretKey', (err, token) => {
//         res.json({
//             token: token
//         })
//     });
// }

export const signUp = async (req, res, next) => {
    try {
      const checkUser = await User.findOne({userName: req.body.userName});
      if (checkUser) {
        return res.status(409).json({
            success: false,
            status: 409,
            message: 'User already registered'
          });
      }
      
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        const { _id, userName, email } = await User.create(req.body);

        return res.status(201).json({
            success: true,
            status: 201,
            message: 'User created successfully',
            data: { _id, userName, email }
        });
    } catch (err) {
        if(err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}

export const loginUser = async (req, res) => {
    try {
      const user = await User.findOne({userName: req.body.userName });
      if (!user) {
        return res.status(409).json({
            success: false,
            status: 400,
            message: 'invalid email or password'
          });
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      
      if (!validPassword){
        return res.status(409).json({
            success: false,
            status: 401,
            message: 'invalid email or password'
          });
      }
      const { _id, name, email } = user;
      const token = jwt.sign({ _id, name, email }, process.env.SECRET_KEY);
      return res.status(409).json({
        success: true,
        status: 200,
        message: 'successfully logged in',
        token: token
      });
      
    } catch (error) {
        return res.status(500).json({
            success: false,
            status: 500,
            message: 'something went wrong'
          });
    }
  }