const express = require("express");
const router = express.Router({
    mergeParams: true
});
const {
    createPost,
    changePostPoints,
    getPost
} = require("../handlers/post");
const {
    loginRequired
} = require("../middleware/auth")


//  -/api/post/
router.route("/")
    .post(createPost);


//  -/api/post/:id
router.route("/:id")
    .get(getPost)
    .post(loginRequired, changePostPoints);

    
module.exports = router;