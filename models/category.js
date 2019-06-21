const mongoose = require("mongoose");

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