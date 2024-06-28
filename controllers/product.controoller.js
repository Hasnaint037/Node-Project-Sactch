const productModel = require("../models/product.model");
const fs = require("fs");
const userModel = require("../models/user.model");
const { default: mongoose } = require("mongoose");

exports.createProduct = async (req, res, next) => {
    const { name, price, discount, stock, panelcolor, textcolor, bgcolor } =
        req.body;
    const image = req.file.filename;
    try {
        const product = await productModel.create({
            name,
            price,
            discount,
            panelcolor,
            textcolor,
            bgcolor,
            stock,
            image,
        });
        res.redirect("/product/admin");
        res.status(201).json({ message: "product created successfully" });
    } catch (error) {
        if (error.name == "ValidationError") {
            return next({ status: 400, message: error.message.split(":")[2] });
        }
        return next({ status: error.status, message: error.message });
    }
};

exports.updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const { name, price, discount, stock, panelcolor, textcolor, bgcolor } =
        req.body;
    console.log(name, price);
    try {
        const product = await productModel.findById(id);
        if (!product) {
            return next({ status: 404, message: "product not found" });
        }
        const updatedProduct = await productModel.updateOne(
            { _id: id },
            { name, price, discount, panelcolor, bgcolor, textcolor, stock },
            { new: true }
        );
        console.log(updatedProduct);
        res.redirect("/product/admin");
    } catch (error) {
        if (error.name == "ValidationError") {
            return next({ status: 400, message: error.message.split(":")[2] });
        }
        return next({ status: error.status, message: error.message });
    }
};

exports.deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await productModel.findById(id);
        if (!product) {
            return next({ status: 404, message: "product not found" });
        }
        const deleteProduct = await productModel.deleteOne({ _id: id });
        if (deleteProduct) {
            fs.unlinkSync(`public\\images\\${product.image}`);
        }
        res.redirect("/product/admin");
        res.status(200).json({ message: "product deleted successfully" });
    } catch (error) {
        return next({ status: error.status, message: error.message });
    }
};

exports.getSingle = async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await productModel.findById(id);
        if (!product) {
            return next({ status: 404, message: "product not found" });
        }
        res.status(200).json({ product });
    } catch (error) {
        return next({ status: error.status, message: error.message });
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const products = await productModel.find();
        res.render("home", { products });
    } catch (error) {
        return next({ status: error.status, message: error.message });
    }
};

exports.addToCart = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await userModel.findById(req.user._id);
        user.cart.push(id);
        await user.save({ validateBeforeSave: false });
        res.redirect("/product/shop");
    } catch (error) {
        return next({ status: error.status, message: error.message });
    }
};

exports.placeOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(req.user._id);
        user.orders.push(id);
        // let cart = user.cart.filter((product) => {
        //     product != new mongoose.Types.ObjectId(id);
        // });
        user.cart.pull(id);
        // console.log(cart);
        // user.cart = cart;
        const product = await productModel.findById(id);
        product.stock = product.stock - 1;
        await product.save({ validateBeforeSave: false });
        await user.save({ validateBeforeSave: false });
        res.redirect("/product/cart");
    } catch (error) {
        return next({ status: error.status, message: error.message });
    }
};

exports.removeFromCart = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await userModel.findById(req.user._id);
        user.cart = user.cart.filter((product) => product != id);
        await user.save({ validateBeforeSave: false });
        res.status(200).json({ message: "product removed from cart" });
    } catch (error) {
        return next({ status: error.status, message: error.message });
    }
};

exports.cartData = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id).populate("cart");
        res.render("cart", { cart: user.cart });
    } catch (error) {}
};

exports.adminProducts = async (req, res, next) => {
    try {
        const products = await productModel.find({});
        res.render("admin", { products });
    } catch (error) {}
};
