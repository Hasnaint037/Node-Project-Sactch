const express = require("express");
const {
    registerUser,
    loginUser,
    logoutUser,
} = require("../controllers/user.controller");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const router = express.Router();

router.route("/register").post(registerUser);
router.get("/register", (req, res) => {
    res.render("signupLogin", { message: "" });
});
router.route("/login").post(loginUser);
router.get("/login", (req, res) => {
    res.render("signupLogin", { message: "" });
});
router.route("/logout").get(isLoggedIn, logoutUser);

module.exports = router;
