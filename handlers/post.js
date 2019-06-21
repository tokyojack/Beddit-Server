const db = require("../models");
exports.createPost = async function (req, res, next) {
    try {
        // Gets id
        let category = await db.Category.findOne({
            name: req.body.category_name
        });

        let post = await db.Post.create({
            title: req.body.title,
            content: req.body.content,
            user: req.body.user_id,
            category: category._id
        });

        // Adds the post to the user
        let currentUser = await db.User.findById(req.body.user_id);
        currentUser.posts.push(post._id);
        await currentUser.save();

        // Adds the post to the category
        let currentCategory = await db.Category.findById(category._id);
        currentCategory.posts.push(post._id);
        await currentCategory.save();

        // Populates post's info
        let createdPost = await db.Post.findById(post._id)
            .populate("user", {
                username: true,
                profileImageUrl: true
            })
            .populate("category", {
                name: true
            });


        return res.status(200).json(createdPost);
    } catch (err) {
        next(err);
    }
}

exports.getPost = async function (req, res, next) {
    try {
        let post = await db.Post.findById(req.params.id)
            // Removes upvoted/downvoted users as they're not needed
            .select({
                upvotedUsers: false,
                downvotedUsers: false
            })
            .populate("user", {
                username: true,
                profileImageUrl: true
            })
            .populate("category", {
                name: true
            });

        return res.status(200).json(post);
    } catch (err) {
        next(err);
    }
}

exports.changePostPoints = async function (req, res, next) {
    try {
        const {
            amount,
            user_id
        } = req.body;
        let post = await db.Post.findById(req.params.id);

        // If increase amount is 1
        if (amount == 1) {
            // Checks if the person has already upvoted
            if (post.upvotedUsers.includes(user_id))
                return next({
                    status: 400,
                    message: "That user has already upvoted"
                });

            // Checks if the user has downvoted before upvoting
            // If so, removes the downvote
            if (post.downvotedUsers.includes(user_id)) {
                var index = post.downvotedUsers.indexOf(user_id);
                if (index > -1) {
                    post.downvotedUsers.splice(index, 1);
                }
            }

            post.upvotedUsers.push(user_id);
        } else if (amount == -1) {
            // Checks if the person has already downvoted
            if (post.downvotedUsers.includes(user_id))
                return next({
                    status: 400,
                    message: "That user has already downvoted"
                });

            // Checks if the user has upvoted before downvoting
            // If so, removes the upvote
            if (post.upvotedUsers.includes(user_id)) {
                var index = post.upvotedUsers.indexOf(user_id);
                if (index > -1) {
                    post.upvotedUsers.splice(index, 1);
                }
            }
            post.downvotedUsers.push(user_id);
        }
        await post.save();

        return res.status(200).json(post);
    } catch (err) {
        next(err);
    }
}