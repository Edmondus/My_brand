import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    senderName: {
        type: String,
        trim: true,
        required: [true, 'please type your name']
    },
    senderEmail: {
        type: String,
        trim: true,
        required: [true, 'please type your Email']
    },
    messageBody: {
        type: String,
        trim: true,
        required: [true, 'please type your message']
    },
    date: {
        type: String
    }
});

export default mongoose.model('Message', MessageSchema);
