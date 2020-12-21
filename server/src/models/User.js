import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        required: [true, 'Please add a first name']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Please add a valid email']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Please add a valid password']
    }
});
export default mongoose.model('User', UserSchema);