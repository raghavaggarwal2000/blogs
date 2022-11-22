const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = Schema({
    userName : {
        type: String,
        required : true
    },
    blogName: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}/*, { timestamps : true }*/ );

const Blog = mongoose.model('blogs', blogSchema);

module.exports = Blog;