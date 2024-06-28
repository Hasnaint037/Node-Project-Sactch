const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLength: [6, "fullname should be of minimum of 8 characters"],
        required: [true, "fullname is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: true,
    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    orders: [
        {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
        },
    ],
    isAdmin: {
        type: Boolean,
        default: "false",
    },
});

module.exports = mongoose.model("User", userSchema, "users");
