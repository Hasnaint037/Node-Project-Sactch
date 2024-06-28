const userModel = require("../models/user.model");
const { verifyToken } = require("../utils/jwt");

const isLoggedIn = async (req, res, next) => {
    const { accessToken } = req.cookies;
    if (!accessToken) {
        res.render("signupLogin", { message: "" });
    } else {
        const data = verifyToken(accessToken);
        if (data) {
            const user = await userModel.findOne({ email: data.email });
            if (!user) {
                res.render("signupLogin", { message: "" });
            } else {
                req.user = user;
                return next();
            }
        } else {
            res.render("signupLogin", { message: "" });
        }
    }
};

exports.isLoggedIn = isLoggedIn;
