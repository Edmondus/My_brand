import mongoose from "mongoose";

        console.log('hhh', process.env.MONGO_URL);

        mongoose.connect('mongodb://localhost:27017/MybrandDB',{
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("MONGODB Connected successfully");
        }, error => {
            console.log(`Error: ${error.message}`);
        })
export default mongoose.connection
