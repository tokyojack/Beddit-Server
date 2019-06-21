const db = require("../models");

exports.createCategory = async function (req, res, next) {
    try {
        let category = await db.Category.create({
            name: req.body.name
        });

        return res.status(200).json(category);
    } catch (err) {
        next(err);
    }
}

exports.getCategories = async function (req, res, next) {
    try {
        let categories = await db.Category.find().select("name");
        
        res.status(200).json(categories)
    } catch (err) {
        next(err);
    }
}

exports.getPostsInCategory = async function (req, res, next) {
    try {
        let posts = await db.Category.findOne({
                name: req.params.name
            }).select("posts")
            // Deep populates the posts users aswell
            .populate({
                path: "posts",
                populate: {
                    path: "user",
                    select: {
                        username: true,
                        profileImageUrl: true
                    }
                }
            });

        // Calculates the new post point value and adds it on to the object
        for (var i = 0; i < posts.posts.length; i++) {
            let post =  posts.posts[i];
            let newValue = {
                ...post._doc, // Can't deconstruct the original object, has mongoose functions added to it. ._doc is needed
                points: (post.upvotedUsers.length - post.downvotedUsers.length)
            };
            posts.posts[i] = newValue;
        }

        res.status(200).json(posts.posts)
    } catch (err) {
        next(err);
    }
}