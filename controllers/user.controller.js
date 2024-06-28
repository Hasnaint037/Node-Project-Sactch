const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");

exports.registerUser = async (req, res, next) => {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
        return next({ status: 400, message: "incomplete details" });
    }
    try {
        const user = await userModel.exists({ email });
        if (user) {
            res.render("signupLogin", {
                message: "user exists with this email",
            });
        } else {
            const hashedPassword = await bcrypt.hash(password, 12);
            const createdUser = await userModel.create({
                email,
                fullname,
                password: hashedPassword,
            });
            const token = generateToken({
                email: createdUser.email,
                _id: createdUser._id,
            });
            res.cookie("accessToken", token);
            res.redirect("/product/shop");
        }
    } catch (error) {
        if (error.name == "ValidationError") {
            res.render("signupLogin", { message: error.message.split(":")[2] });
        }
        return next({ status: error.status, message: error.message });
    }
};

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next({ status: 400, message: "incomplete details" });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            res.render("signupLogin", { message: "invaid email" });
        } else {
            const data = await bcrypt.compare(password, user.password);
            if (data) {
                const token = generateToken({
                    email: user.email,
                    _id: user._id,
                });
                res.cookie("accessToken", token);
                if (user.isAdmin) {
                    res.redirect("/product/admin");
                }
                res.redirect("/product/shop");
            } else {
                res.render("signupLogin", { message: "invalid password" });
            }
        }
    } catch (error) {
        if (error.name == "ValidationError") {
            res.render("signupLogin", { message: error.message.split(":")[2] });
        }
        return next({ status: error.status, message: error.message });
    }
};

exports.logoutUser = async (req, res, next) => {
    res.clearCookie("accessToken");
    req.user = "";
    res.status(200).json({ message: "user logged out" });
};
