const express = require("express");
const router = express.Router({
    mergeParams: true
});
const {
    createCategory,
    getCategories,
    getPostsInCategory
} = require("../handlers/category");


//  -/api/category
router.route("/")
    .get(getCategories)
    .post(createCategory);

//  -/api/category/:name
router.route("/:name")
    .get(getPostsInCategory);
    

module.exports = router;