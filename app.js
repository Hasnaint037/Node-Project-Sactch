const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.Routes");
const productRoutes = require("./routes/product.Routes");
const errorHandler = require("./middlewares/errorHandler");
const { isLoggedIn } = require("./middlewares/isLoggedIn");
const productModel = require("./models/product.model");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public/images"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.render("signupLogin", { message: "" });
});
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use(errorHandler);

module.exports = app;
