import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
        mongoose.connect(process.env.NODE_ENV === 'test' ? process.env.MONGOTEST_URL : process.env.MONGO_URL,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("MONGODB Connected successfully");
        }, error => {
            console.log(`Error: ${error.message}`);
        })
export default mongoose.connection
