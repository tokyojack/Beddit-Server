const mongoose = require("mongoose");
const Post = require("./post");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 15
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
})

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;