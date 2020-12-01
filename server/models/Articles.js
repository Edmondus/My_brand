import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'please add the title']
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'please add the description']
    },
    picURL: {
        type: String,
        trim: true,
        required: [true, 'please add the pic URL']
    },
    content: {
        type: String,
        trim: true,
        required: [true, 'please add the content']
    },
    date: {
        type: String,
    }
});

export default mongoose.model('Article', ArticleSchema);
